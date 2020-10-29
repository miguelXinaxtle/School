import { Service } from "typedi";
import { IPromise, defer, Deferred } from "q";
import { ConnectionPool, Request, VarChar, Int, IProcedureResult } from "mssql";
import { default as db } from "../db";
import { default as config } from "../config";
import { IResult } from "../models/result";
import { IProduct } from "../interfaces/product.service";

@Service()
export class ProductRepository implements IProduct {
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

  getAll(): PromiseLike<IResult> {
    return this.dbConnect((dbConn: any, deferred: Deferred<{}>) => {
      const request = new Request(dbConn);
      let result: IResult = { error: null, rows: [], item: null };
      request
        .execute("[Catalogo].[SEL_ESCUELA_SP]")
        .then((data: IProcedureResult<any>) => {
          result.rows = data.recordset;
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
