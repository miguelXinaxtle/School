import { Body } from 'routing-controllers';

import { resolve } from 'path';
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
export class CajaRepository{

    constructor(){

    }

      verCaja(){
        var dbConn = new sql.ConnectionPool(sqlConfig);
        return new Promise ((resolve,reject) => {
          dbConn 
          .connect()
            .then(pool => { 
              pool.request().execute('[dbo].[getMostrarCaja]', (err, result: any) => {
                console.log('result', result.recordset)
              resolve(result.recordset)
            })
          }).catch(err => {
            console.log('err',err)
            resolve([])
          })
        } )
      }
              


    abrirCaja(body: any) {
        var dbConn = new sql.ConnectionPool(sqlConfig);
        return new Promise((resolve,reject) => {
          dbConn
          .connect()
          .then(pool => {
            pool.request()
            .input('monto', body.monto )
            .input('estatus',body.estatus)
            .input('idUsuario', body.idUsuario)
            .execute('[dbo].[abrirCaja]', (err, result: any) => {
            console.log('result', result.rowsAffected)
            resolve(result.rowsAffected)
            })
          }).catch(err => {
        console.log('err',err)
         resolve([])
          })
    } )
   }


   venderProduct(body:any){
        var dbConn = new sql.ConnectionPool(sqlConfig);
        return new Promise((resolve,reject) => {
          dbConn
          .connect()
          .then(pool => {
            pool.request()
            .input('Productos',body.Productos)
            .input('idUsuario', body.idUsuario)
            .input('idCliente', body.idCliente)
            .execute('[dbo].[ProductosXML]', (err, result: any) => {
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
export const CajaRepositoryService = new Token<CajaRepository>();
