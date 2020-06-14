import { Service, Inject } from "typedi";
import * as Q from "q";
import * as sql from "mssql";
import { default as confDB } from "./db";
import { IAppRepository } from "../interfaces/IApp.Repository";
import * as http from "http";
import { default as config } from "../../config";

@Service()
export class AppRepository implements IAppRepository {
  private conf: any;

  constructor() {
    const env: string = process.env.NODE_ENV || "development";
    this.conf = (config as any)[env];
  }

  private dbConnect(callback: Function): Q.IPromise<any> {
    const env: string = process.env.NODE_ENV || "development";
    var deferred = Q.defer();
    var dbConn = new sql.ConnectionPool((confDB as any)[env]);
    dbConn
      .connect()
      .then(() => callback(dbConn, deferred))
      .catch(deferred.reject);

    return deferred.promise;
  }

  addUbicacion(body: any): PromiseLike<{}> {
    return this.dbConnect((dbConn: any, deferred: Q.Deferred<{}>) => {
      var request = new sql.Request(dbConn);
      request
        .input("idUsuario", body.idUsuario)
        .input("latitud", body.latitud)
        .input("longitud", body.longitud)
        .execute("[Operacion].[Ins_Ubicacion_Sp]")
        .then((recordSet: sql.IProcedureResult<any>) => {
          var respuesta = recordSet.recordset;
          var alta = {};
          if (respuesta.length > 0) {
            alta = respuesta[0];
          }

          dbConn.close();
          deferred.resolve(alta);
        })
        .catch((err) => {
          dbConn.close();
          deferred.reject(err);
        });
    });
  }

  getUbicaciones(query: any): PromiseLike<{}> {
    return this.dbConnect((dbConn: any, deferred: Q.Deferred<{}>) => {
      var request = new sql.Request(dbConn);
      request
        .input("idUsuario", query.idUsuario)
        .input("inicio", query.inicio)
        .input("fin", query.fin)
        .execute("[Operacion].[Sel_Ubicaciones_Periodo_Sp]")
        .then((recordSet: sql.IProcedureResult<any>) => {
          var respuesta = recordSet.recordset;
          dbConn.close();
          deferred.resolve(respuesta);
        })
        .catch((err) => {
          dbConn.close();
          deferred.reject(err);
        });
    });
  }

  getPoligonos(query: any): PromiseLike<{}> {
    return this.dbConnect((dbConn: any, deferred: Q.Deferred<{}>) => {
      var request = new sql.Request(dbConn);
      request
        .input("idUsuario", query.idUsuario)
        .execute("[Operacion].[Sel_Poligonos_Sp]")
        .then((recordSet: sql.IProcedureResult<any>) => {
          var respuesta = recordSet.recordset;
          dbConn.close();
          deferred.resolve(respuesta);
        })
        .catch((err) => {
          dbConn.close();
          deferred.reject(err);
        });
    });
  }
}
