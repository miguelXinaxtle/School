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
export class UserRepository{

    getUsuario() {
      var dbConn = new sql.ConnectionPool(sqlConfig);
      return new Promise((resolve,reject) => {
        dbConn
        .connect()
        .then(pool => {
          pool.request().execute('[dbo].[getUsuario]', (err, result: any) => {
            console.log('result', result.recordset)
            resolve(result.recordset)
          })
        }).catch(err => {
          console.log('err',err)
          resolve([])
        })
      } )
    }


    usuarioPorPuestoList(idPuesto: number) {
        var dbConn = new sql.ConnectionPool(sqlConfig);
        return new Promise((resolve,reject) => {
          dbConn
          .connect()
          .then(pool => {
            pool.request()
            .input('idPuesto', idPuesto)
            .execute('[dbo].[getUsuarioPorPuesto]', (err, result: any) => {
              console.log('result', result.recordset)
              resolve(result.recordset)
            })
          }).catch(err => {
            console.log('err',err)
            resolve([])
          })
        } )
      }

      crearUsuario(body: any) {
        var dbConn = new sql.ConnectionPool(sqlConfig);
        return new Promise((resolve,reject) => {
          dbConn
          .connect()
          .then(pool => {
            pool.request()
            .input('idUsuario', body.idUsuario )
            .input('nombre', body.nombreUsuario )
            .input('nacimiento',body.nacimientoUsuario)
            .input('correo', body.correoUsuario)
            .input('telefono', body.telefonoUsuario)
            .input('foto', body.fotoUsuario)
            .input('idPuesto', body.idPuestoUsuario)
            .execute('[dbo].[crearusuario]', (err, result: any) => {
            console.log('result', result.rowsAffected)
            resolve(result.rowsAffected)
            })
          }).catch(err => {
        console.log('err',err)
         resolve([])
          })
  } )
}
          borrarUsuario(idUsuario: number) {
            console.log('idUsuario',idUsuario)
            var dbConn = new sql.ConnectionPool(sqlConfig);
            return new Promise((resolve,reject) => {
              dbConn
              .connect()
              .then(pool => {
                pool.request()
                .input('idUsuario',idUsuario)
                .execute('[dbo].[borrarUsuario]', (err, result: any) => {
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
export const UserRepositoryService = new Token<UserRepository>();
