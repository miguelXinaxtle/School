import 'reflect-metadata';
import * as sql from 'mssql';
import { Service, Token } from 'typedi';

const sqlConfig = {
    user: '',
    password: '',
    database: 'Escuela',
    server: '192.168.20.71',
    pool: {
      max: 10,
      min: 0,
      idleTimeoutMillis: 30000
    },
    options: {
      encrypt: true, // for azure
      trustServerCertificate: true // change to true for local dev / self-signed certs
    }
  }

@Service()
export class PuestoRepository{

    constructor(){

    }

    getAll() {
        var dbConn = new sql.ConnectionPool(sqlConfig);
        return new Promise((resolve,reject) => {
          dbConn
          .connect()
          .then(pool => {
            pool.request().execute('[dbo].[getpuesto]', (err, result: any) => {
              console.log('result', result.recordset)
              resolve(result.recordset)
            })
          }).catch(err => {
            console.log('err',err)
            resolve([])
          })
        } )
      }

      crearPuesto(body :any) {
        var dbConn = new sql.ConnectionPool(sqlConfig);
        return new Promise((resolve,reject) => {
          dbConn
          .connect()
          .then(pool => {
            pool.request()
            .input('nombre',body.nombrePuesto)
            .execute('[dbo].[crearpuesto]', (err, result: any) => {
            console.log('result', result.rowsAffected)
          resolve(result.rowsAffected)
            })
          }).catch(err => {
        console.log('err',err)
         resolve([])
          })
  } )
}
}

export const PuestoRepositoryService = new Token<PuestoRepository>();
