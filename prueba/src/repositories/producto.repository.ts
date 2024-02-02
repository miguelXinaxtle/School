
import 'reflect-metadata';
import * as sql from 'mssql';
import { Service, Token } from 'typedi';
import { resolve } from 'path';


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
export class ProductoRepository{

    constructor(){

    }
    productoPorDepartamentoList(idDepartamento:number) {
        var dbConn = new sql.ConnectionPool(sqlConfig);
        return new Promise((resolve,reject) => {
          dbConn
          .connect()
          .then(pool => {
            pool.request()
            .input('idDepartamento', idDepartamento)
            .execute('[dbo].[getProductoPorDepartamento]', (err, result: any) => {
            console.log('result', result.recordset)
          resolve(result.recordset)
            })
          }).catch(err => {
        console.log('err',err)
         resolve([])
          })
        } )
      }

      productoPorDescripcion(descripcion: string){
        var dbConn = new sql.ConnectionPool(sqlConfig);
        return new Promise((resolve,reject) => {
          dbConn
          .connect()
          .then(pool => {
            pool.request()
            .input('Descripcion', descripcion)
            .execute('[dbo].[getProductoPorDescripcion]', (err, result: any) => {
            console.log('result', result.recordset)
          resolve(result.recordset)
            })
          }).catch(err => {
        console.log('err',err)
         resolve([])
          })
        } )
      }
      
      getProducto() {
        var dbConn = new sql.ConnectionPool(sqlConfig);
        return new Promise((resolve,reject) => {
          dbConn
          .connect()
          .then(pool => {
            pool.request().execute('[dbo].[getProducto]', (err, result: any) => {
              console.log('result', result.recordset)
              resolve(result.recordset)
            })
          }).catch(err => {
            console.log('err',err)
            resolve([])
          })
        } )
      }

      crearProducto(body: any) {
        var dbConn = new sql.ConnectionPool(sqlConfig);
        return new Promise((resolve,reject) => {
          dbConn
          .connect()
          .then(pool => {
            pool.request()
            .input('idProducto', body.idProducto)
            .input('descripcion', body.descripcionProducto)
            .input('costo',body.costoProducto)
            .input('precio', body.precioProducto)
            .input('minimoexistencia', body.minimoexistenciaProducto)
            .input('idUsuario', body.idUsuarioProducto)
            .input('idDepartamento', body.idDepartamentoProducto)
            .input('idProvedor', body.idProvedorProducto)
            .execute('[dbo].[creaproduct]', (err, result: any) => {
            console.log('result', result.rowsAffected)
            resolve(result.rowsAffected)
            })
          }).catch(err => {
        console.log('err',err)
         resolve([])
          })
        } )
      }

      actualizarInventario(body :any) {
        var dbConn = new sql.ConnectionPool(sqlConfig);
        return new Promise((resolve,reject) => {
          dbConn
          .connect()
          .then(pool => {
            pool.request()
            .input('cantidad',body.cantidad)
            .input('idProducto',body.idProducto)
            .execute('[dbo].[updateInventario]', (err, result: any) => {
            console.log('result', result.rowsAffected)
          resolve(result.rowsAffected)
            })
          }).catch(err => {
        console.log('err',err)
         resolve([])
          })
    } )
  }
  productoAbastecer() {
    var dbConn = new sql.ConnectionPool(sqlConfig);
    return new Promise((resolve,reject) => {
      dbConn
      .connect()
      .then(pool => {
        pool.request().execute('[dbo].[productosPorComprar]', (err, result: any) => {
          console.log('result', result.recordset)
          resolve(result.recordset)
        })
      }).catch(err => {
        console.log('err',err)
        resolve([])
      })
    } )
  }
  borrarProducto(idProducto: number) {
    var dbConn = new sql.ConnectionPool(sqlConfig);
    return new Promise((resolve,reject) => {
      dbConn
      .connect()
      .then(pool => {
        pool.request()
        .input('idProducto',idProducto)
        .execute('[dbo].[borrarProduct]', (err, result: any) => {
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

export const ProductoRepositoryService = new Token<ProductoRepository>();
