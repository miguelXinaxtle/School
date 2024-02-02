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
export class ClienteRepository{

    crearCliente(body: any) {
        var dbConn = new sql.ConnectionPool(sqlConfig);
        return new Promise((resolve,reject) => {
          dbConn
          .connect()
          .then(pool => {
            pool.request()
            .input('idCliente', body.idCliente)
            .input('nombre', body.nombre)
            .input('nacimiento',body.nacimiento)
            .input('correo', body.correo)
            .input('telefono', body.telefono)
            .execute('[dbo].[crearCliente]', (err, result: any) => {
            console.log('result', result.rowsAffected)
            resolve(result.rowsAffected)
            })
          }).catch(err => {
        console.log('err',err)
         resolve([])
          })
      } )
    }
      comprasCliente() {
        var dbConn = new sql.ConnectionPool(sqlConfig);
        return new Promise((resolve,reject) => {
          dbConn
          .connect()
          .then(pool => {
            pool.request().execute('[dbo].[getClient]', (err, result: any) => {
              console.log('result', result.recordset)
              resolve(result.recordset)
            })
          }).catch(err => {
            console.log('err',err)
            resolve([])
          })
        } )
      }
      borrarCliente(idCliente: number) {
        var dbConn = new sql.ConnectionPool(sqlConfig);
        return new Promise((resolve,reject) => {
          dbConn
          .connect()
          .then(pool => {
            pool.request()
            .input('idCliente',idCliente)
            .execute('[dbo].[borrarClient]', (err, result: any) => {
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
export const ClienteRepositoryService = new Token<ClienteRepository>();




