
import 'reflect-metadata';
import * as sql from 'mssql';
import { Service, Token } from 'typedi';


const sqlConfig = {
    user: 'sa',
    password: 'S0p0rt3',
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
export class ProvedorRepository{

    constructor(){

    }

    getAll() {
        var dbConn = new sql.ConnectionPool(sqlConfig);
        return new Promise((resolve,reject) => {
          dbConn
          .connect()
          .then(pool => {
            pool.request().execute('[dbo].[getprovedor]', (err, result: any) => {
              console.log('result', result.recordset)
              resolve(result.recordset)
            })
          }).catch(err => {
            console.log('err',err)
            resolve([])
          })
        } )
      }

      crearProvedor(body: any) {
       var dbConn = new sql.ConnectionPool(sqlConfig);
       return new Promise((resolve,reject) => {
        dbConn
        .connect()
        .then(pool => {
          pool.request().input('nombre', body.nombreProvedor )
          .input('correo',body.correoProvedor)
          .input('telefono', body.correoProvedor)
          .input('empresa', body.empresaProvedor)
          .execute('[dbo].[crearprovedor]', (err, result: any) => {
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

export const ProvedorRepositoryService = new Token<ProvedorRepository>();
