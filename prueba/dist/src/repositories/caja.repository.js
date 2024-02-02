"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CajaRepositoryService = exports.CajaRepository = void 0;
require("reflect-metadata");
const sql = __importStar(require("mssql"));
const typedi_1 = require("typedi");
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
};
let CajaRepository = class CajaRepository {
    constructor() {
    }
    verCaja() {
        var dbConn = new sql.ConnectionPool(sqlConfig);
        return new Promise((resolve, reject) => {
            dbConn
                .connect()
                .then(pool => {
                pool.request().execute('[dbo].[getMostrarCaja]', (err, result) => {
                    console.log('result', result.recordset);
                    resolve(result.recordset);
                });
            }).catch(err => {
                console.log('err', err);
                resolve([]);
            });
        });
    }
    abrirCaja(body) {
        var dbConn = new sql.ConnectionPool(sqlConfig);
        return new Promise((resolve, reject) => {
            dbConn
                .connect()
                .then(pool => {
                pool.request()
                    .input('monto', body.monto)
                    .input('estatus', body.estatus)
                    .input('idUsuario', body.idUsuario)
                    .execute('[dbo].[abrirCaja]', (err, result) => {
                    console.log('result', result.rowsAffected);
                    resolve(result.rowsAffected);
                });
            }).catch(err => {
                console.log('err', err);
                resolve([]);
            });
        });
    }
    venderProduct(body) {
        var dbConn = new sql.ConnectionPool(sqlConfig);
        return new Promise((resolve, reject) => {
            dbConn
                .connect()
                .then(pool => {
                pool.request()
                    .input('Productos', body.Productos)
                    .input('idUsuario', body.idUsuario)
                    .input('idCliente', body.idCliente)
                    .execute('[dbo].[ProductosXML]', (err, result) => {
                    console.log('result', result.rowsAffected);
                    resolve(result.rowsAffected);
                });
            }).catch(err => {
                console.log('err', err);
                resolve([]);
            });
        });
    }
};
exports.CajaRepository = CajaRepository;
exports.CajaRepository = CajaRepository = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [])
], CajaRepository);
exports.CajaRepositoryService = new typedi_1.Token();
//# sourceMappingURL=caja.repository.js.map