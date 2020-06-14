import { Service, Inject } from "typedi";
import * as Q from "q";
import * as sql from "mssql";
import { default as confDB } from "./db";
import { ISchoolRepository } from "../interfaces/school.service";
import * as http from "http";
import { default as config } from "../../config";
import { IResult } from "../../models/result";
import { ISchool } from "../../models/school";

// Implementa la interfaz del repositorio
@Service()
export class SchoolRepository implements ISchoolRepository {
  private conf: any;

  constructor() {
    // Obtener el entorno de ejecución
    const env: string = process.env.NODE_ENV || "development";
    // obtener la configuracion dependiendo del entorno
    this.conf = (config as any)[env];
  }

  private dbConnect(callback: Function): Q.IPromise<any> {
    const env: string = process.env.NODE_ENV || "development";
    var deferred = Q.defer();
    // Conexion a base de datos dependiendo de entorno
    var dbConn = new sql.ConnectionPool((confDB as any)[env]);
    dbConn
      .connect()
      .then(() => callback(dbConn, deferred))
      .catch(deferred.reject);

    return deferred.promise;
  }

  addSchool(body: ISchool): PromiseLike<IResult> {
    return this.dbConnect((dbConn: any, deferred: Q.Deferred<{}>) => {
      const request = new sql.Request(dbConn);
      let result: IResult = { error: "", rows: [], item: null };
      request
        .input("nombre", sql.VarChar, body.nombre)
        .input("estado", sql.VarChar, body.estado)
        .input("ciudad", sql.VarChar, body.ciudad)
        .input("municipio", sql.VarChar, body.municipio)
        .execute("[Catalogo].[INS_ESCUELA_SP]")
        .then((data: sql.IProcedureResult<any>) => {
          const res = data.recordset;
          // Validacion de la respuesta del procedimiento
          if (res && res.length > 0 && res[0].idEscuela) {
            result.item = res[0];
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

  modifySchool(body: ISchool): PromiseLike<IResult> {
    return this.dbConnect((dbConn: any, deferred: Q.Deferred<{}>) => {
      const request = new sql.Request(dbConn);
      let result: IResult = { error: "", rows: [], item: null };
      request
        .input("idEscuela", sql.Int, body.idEscuela)
        .input("nombre", sql.VarChar, body.nombre)
        .input("estado", sql.VarChar, body.estado)
        .input("ciudad", sql.VarChar, body.ciudad)
        .input("municipio", sql.VarChar, body.municipio)
        .execute("[Catalogo].[UPD_ESCUELA_SP]")
        .then((data: sql.IProcedureResult<any>) => {
          const res = data.recordset;
          // Validacion de la respuesta del procedimiento
          if (res && res.length > 0 && res[0].modificado) {
            result.item = res[0];
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

  removeSchool(body: ISchool): PromiseLike<IResult> {
    return this.dbConnect((dbConn: any, deferred: Q.Deferred<{}>) => {
      const request = new sql.Request(dbConn);
      let result: IResult = { error: "", rows: [], item: null };
      request
        .input("idEscuela", sql.VarChar, body.idEscuela)
        .execute("[Catalogo].[DEL_ESCUELA_SP]")
        .then((data: sql.IProcedureResult<any>) => {
          const res = data.recordset;
          // Validacion de la respuesta del procedimiento
          if (res && res.length > 0 && res[0].eliminado) {
            result.item = res[0];
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

  getSchool(query: any): PromiseLike<IResult> {
    return this.dbConnect((dbConn: any, deferred: Q.Deferred<{}>) => {
      const request = new sql.Request(dbConn);
      let result: IResult = { error: "", rows: [], item: null };
      // Ejecución de un procedimiento sin parametros
      request
        .execute("[Catalogo].[SEL_ESCUELA_SP]")
        .then((data: sql.IProcedureResult<any>) => {
          const res = data.recordset;
          // Validacion de la respuesta del procedimiento
          if (res && res.length > 0) {
            result.rows = res;
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
