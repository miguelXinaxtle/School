import { Service, Inject } from "typedi";
import * as Q from "q";
import * as sql from "mssql";
import { default as confDB } from "./db";
import { ISecurityRepository } from "../interfaces/security.service";
import * as http from "http";
import * as jwt from "jsonwebtoken";
import { default as config } from "../../config";
import { IResult } from "../../models/result";
import { IToken } from "../../models/token";
import { IRegister } from "../../models/register";
import { ILogin } from "../../models/login";

// Implementa la interfaz del repositorio
@Service()
export class SecurityRepository implements ISecurityRepository {
  private conf: any;

  constructor() {
    // Obtener el entorno de ejecución
    const env: string = process.env.NODE_ENV || "development";
    // obtener la configuracion dependiendo del entorno
    this.conf = (config as any)[env];
  }

  private dbConnect(callback: Function): Q.IPromise<any> {
    const env: string = process.env.NODE_ENV || "development";
    const deferred = Q.defer();
    // Conexion a base de datos dependiendo de entorno
    const dbConn = new sql.ConnectionPool((confDB as any)[env]);
    dbConn
      .connect()
      .then(() => callback(dbConn, deferred))
      .catch(deferred.reject);

    return deferred.promise;
  }

  addUser(body: IRegister): PromiseLike<IResult> {
    return this.dbConnect((dbConn: any, deferred: Q.Deferred<{}>) => {
      const request = new sql.Request(dbConn);
      let result: IResult = { error: "", rows: [], item: null };
      request
        .input("correo", sql.VarChar, body.correo)
        .input("contrasenia", sql.VarChar, body.contrasenia)
        .input("nombre", sql.VarChar, body.nombre)
        .input("telefono", sql.VarChar, body.telefono)
        .output("err", sql.VarChar)
        .execute("[Catalogo].[INS_USUARIO_SP]")
        .then((data: sql.IProcedureResult<any>) => {
          // Validación del parametro de salida
          if (data.output.err && data.output.err.length) {
            result.error = data.output.err;
          } else {
            const res = data.recordset;
            // Validacion de la respuesta del procedimiento
            if (res && res.length > 0 && res[0].idUsuario) {
              result.item = res[0];
            }
          }
          dbConn.close();
          // Respuesta de ejecución correcta
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
    return this.dbConnect((dbConn: any, deferred: Q.Deferred<{}>) => {
      const request = new sql.Request(dbConn);
      let result: IResult = { error: "", rows: [], item: {} };
      request
        .input("correo", sql.VarChar, body.correo)
        .input("contrasenia", sql.VarChar, body.contrasenia)
        .output("err", sql.VarChar)
        .execute("[Operacion].[LOGIN_SP]")
        .then((data: sql.IProcedureResult<any>) => {
          // Validación del parametro de salida
          if (data.output.err && data.output.err.length) {
            result.error = data.output.err;
            dbConn.close();
            deferred.resolve(result);
          } else {
            const res = data.recordset;
            dbConn.close();
            // Validacion de la respuesta del procedimiento
            if (res && res.length > 0 && res[0].idUsuario) {
              // Cuando el usuario y contraseña es validado se procede a
              // generar el token
              this.addToken(res[0].idUsuario).then((r: IResult) => {
                // Validación de la respuesta del servicio
                if (r.error && r.error.length) {
                  result.error = r.error;
                } else {
                  if (r.item && r.item.token) {
                    // genera el objeto de respuesta con la información del usuario
                    // y el token generado
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

  // Inserta el token en la base de datos
  private addToken(idUsuario: number): PromiseLike<IResult> {
    // codifica el idUsuario utilizando la privateKey de la configuración
    // para generar el token
    const token = jwt.sign({ idUsuario: idUsuario }, this.conf.privateKey);
    return this.dbConnect((dbConn: any, deferred: Q.Deferred<{}>) => {
      const request = new sql.Request(dbConn);
      let result: IResult = { error: "", rows: [], item: {} };
      request
        .input("idUsuario", sql.Int, idUsuario)
        .input("token", sql.VarChar, token)
        .output("err", sql.VarChar)
        .execute("[Operacion].[INS_TOKEN_SP]")
        .then((data: sql.IProcedureResult<any>) => {
          const res = data.recordset;
          // Validacion de la respuesta del procedimiento
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

  // Función no expuesta
  // Valida la decodificación del token
  checkToken(body: IToken): PromiseLike<IResult> {
    let result: IResult = { error: "", rows: [], item: {} };
    const deferred: Q.Deferred<IResult> = Q.defer();
    try {
      // Decodificación del token utilizando el privateKey de la configuración
      let decoded: any = jwt.verify(body.token, this.conf.privateKey);
      if (decoded && decoded.idUsuario) {
        body.idUsuario = decoded.idUsuario;
        // Valida el idUsuario y el token en la base de datos
        deferred.resolve(this.checkUser(body));
      } else {
        deferred.reject(result);
      }
    } catch (err) {
      result.error = err.message;
      deferred.reject(result);
    }
    return deferred.promise;
  }

  // Valida que el idUsuario y el token existan en la base de datos
  private checkUser(body: IToken): PromiseLike<IResult> {
    return this.dbConnect((dbConn: any, deferred: Q.Deferred<{}>) => {
      const request = new sql.Request(dbConn);
      let result: IResult = { error: "", rows: [], item: {} };
      request
        .input("idUsuario", body.idUsuario)
        .input("token", body.token)
        .output("err", sql.VarChar)
        .execute("[Operacion].[VALIDA_TOKEN_SP]")
        .then((data: sql.IProcedureResult<any>) => {
          // Valida el parametro de salida del procedimiento
          if (data.output.err && data.output.err.length) {
            result.error = data.output.err;
          } else {
            const res = data.recordset;
            // Valida la respuesta del procedimeinto
            if (res && res.length > 0 && res[0].tokenValido) {
              result.item = res[0];
            } else {
              result.error = "Token invalido";
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

  //
  test(query: any): string {
    return "Servicio arriba.";
  }
}
