import { Service } from "typedi";
import { IPromise, defer, Deferred } from "q";
import {
  ConnectionPool,
  Request,
  VarChar,
  Int,
  IProcedureResult,
  Xml,
} from "mssql";
import { default as db } from "../db";
import { ISecurity } from "../interfaces/security.service";
import { sign, verify } from "jsonwebtoken";
import { default as config } from "../config";
import { IResult } from "../models/result";
import { ILogin } from "../models/login";
import { IUser } from "../models/user";

@Service()
export class SecurityRepository implements ISecurity {
  private conf: any;

  constructor() {
    this.conf = config as any;
  }

  private dbConnect(callback: Function): IPromise<any> {
    const deferred = defer();
    const dbConn = new ConnectionPool(db as any);
    dbConn
      .connect()
      .then(() => callback(dbConn, deferred))
      .catch(deferred.reject);

    return deferred.promise;
  }

  addUser(body: IUser): PromiseLike<IResult> {
    return this.dbConnect((dbConn: any, deferred: Deferred<{}>) => {
      const request = new Request(dbConn);
      let result: IResult = { error: "", rows: [], item: null };
      request
        .input("correo", VarChar, body.correo)
        .input("contrasenia", VarChar, body.contrasenia)
        .input("nombre", VarChar, body.nombre)
        .input("telefono", VarChar, body.telefono)
        .input("roles", Xml, body.roles)
        .output("err", VarChar)
        .execute("[Catalogo].[INS_USUARIO_SP]")
        .then((data: IProcedureResult<any>) => {
          if (data.output.err && data.output.err.length) {
            result.error = data.output.err;
          } else {
            const res = data.recordset;
            if (res && res.length > 0 && res[0].idUsuario) {
              result.item = res[0];
            }
          }
          dbConn.close();
          deferred.resolve(result);
        })
        .catch((err) => {
          dbConn.close();
          result.error = err.message;
          deferred.reject(result);
        });
    });
  }

  login(body: ILogin): PromiseLike<IResult> {
    return this.dbConnect((dbConn: any, deferred: Deferred<{}>) => {
      const request = new Request(dbConn);
      let result: IResult = { error: "", rows: [], item: {} };
      request
        .input("correo", VarChar, body.correo)
        .input("contrasenia", VarChar, body.contrasenia)
        .output("err", VarChar)
        .execute("[Operacion].[LOGIN_SP]")
        .then((data: IProcedureResult<any>) => {
          if (data.output.err && data.output.err.length) {
            result.error = data.output.err;
            dbConn.close();
            deferred.resolve(result);
          } else {
            const res = data.recordset;
            dbConn.close();
            if (res && res.length > 0 && res[0].idUsuario) {
              // Si el usuario y la contraseña son valido se genera el token
              this.addToken(res[0].idUsuario).then((r: IResult) => {
                if (r.error && r.error.length) {
                  result.error = r.error;
                } else {
                  if (r.item && r.item.token) {
                    // Respuesta con información del usuario y token
                    result.item = {
                      ...res[0],
                      token: r.item.token,
                    };
                  } else {
                    result.error = "Hubo un error al generar el token";
                  }
                }
                deferred.resolve(result);
              });
            } else {
              result.error = "Correo electrónico y/o contraseña incorrecto.";
              deferred.resolve(result);
            }
          }
        })
        .catch((err) => {
          dbConn.close();
          result.error = err.message;
          deferred.reject(result);
        });
    });
  }

  private addToken(idUsuario: number): PromiseLike<IResult> {
    // Codifica el idUsuario para generar el token
    const token = sign({ idUsuario: idUsuario }, this.conf.privateKey);
    return this.dbConnect((dbConn: any, deferred: Deferred<{}>) => {
      const request = new Request(dbConn);
      let result: IResult = { error: "", rows: [], item: {} };
      request
        .input("idUsuario", Int, idUsuario)
        .input("token", VarChar, token)
        .output("err", VarChar)
        .execute("[Operacion].[INS_TOKEN_SP]")
        .then((data: IProcedureResult<any>) => {
          const res = data.recordset;
          if (res && res.length > 0 && res[0].idUsuarioToken) {
            result.item = { token };
          } else {
            result.error = "Hubo un error al generar el token";
          }
          dbConn.close();
          deferred.resolve(result);
        })
        .catch((err) => {
          dbConn.close();
          result.error = err.message;
          deferred.reject(result);
        });
    });
  }

  // Es invocada por el authorizationChecker en cada peticion
  checkToken(token: string): PromiseLike<IResult> {
    let result: IResult = { error: "", rows: [], item: {} };
    const deferred: Deferred<IResult> = defer();
    try {
      // Decodificación del token
      let decoded: any = verify(token, this.conf.privateKey);
      if (decoded && decoded.idUsuario) {
        // Valida la vigencia y existencia del token y idUsuario
        // tambien obtiene la lista de roles
        deferred.resolve(this.checkUser(decoded.idUsuario, token));
      } else {
        deferred.reject(result);
      }
    } catch (err) {
      result.error = err.message;
      deferred.reject(result);
    }
    return deferred.promise;
  }

  private checkUser(idUsuario: number, token: string): PromiseLike<IResult> {
    return this.dbConnect((dbConn: any, deferred: Deferred<{}>) => {
      const request = new Request(dbConn);
      let result: IResult = { error: "", rows: [], item: null };
      request
        .input("idUsuario", idUsuario)
        .input("token", token)
        .output("err", VarChar)
        .execute("[Operacion].[VALIDA_TOKEN_SP]")
        .then((data: IProcedureResult<any>) => {
          if (data.output.err && data.output.err.length) {
            result.error = data.output.err;
          } else {
            const res = data.recordset;
            if (res && res.length)
              result.rows = res.map((item: any) => item.nombre);
          }
          dbConn.close();
          deferred.resolve(result);
        })
        .catch((err) => {
          dbConn.close();
          result.error = err.message;
          deferred.reject(result);
        });
    });
  }
}
