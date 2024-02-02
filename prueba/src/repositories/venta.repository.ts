
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
export class VentaRepository{

    constructor(){

    }

    getVenta(dateInicial: string, dateFinal: string) {
        var dbConn = new sql.ConnectionPool(sqlConfig);
        return new Promise((resolve,reject) => {
          dbConn
          .connect()
          .then(pool => {
            console.log('body.dateInicial', dateInicial)
            console.log('body.dateFinal', dateFinal)
            pool.request()
            .input('dateInicial', dateInicial)
            .input('dateFinal', dateFinal)
            .execute('[dbo].[getVenta]', (err, result: any) => {
              console.log('result', err)
              console.log('result', result)
              console.log('result', result.recordset)
              resolve(result.recordset)
            })
          }).catch(err => {
            console.log('err',err)
            resolve([])
          })
        } )
      }
      masVendidos(fechaInicial: string, fechaFinal: string) {
        var dbConn = new sql.ConnectionPool(sqlConfig);
        return new Promise((resolve,reject) => {
          dbConn
          .connect()
          .then(pool => {
            console.log('body.fechaInicial', fechaInicial)
            console.log('body.fechaFinal', fechaFinal)
            pool.request()
            .input('fechaInicial', fechaInicial)
            .input('fechaFinal', fechaFinal)
            .execute('[dbo].[masVendidos]', (err, result: any) => {
              console.log('result', err)
              console.log('result', result)
              console.log('result', result.recordset)
              resolve(result.recordset)
            })
          }).catch(err => {
            console.log('err',err)
            resolve([])
          })
        } )
      }
    }

export const VentaRepositoryService = new Token<VentaRepository>();     
