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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepositoryService = exports.UserRepository = void 0;
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
let UserRepository = class UserRepository {
    getUsuario() {
        var dbConn = new sql.ConnectionPool(sqlConfig);
        return new Promise((resolve, reject) => {
            dbConn
                .connect()
                .then(pool => {
                pool.request().execute('[dbo].[getUsuario]', (err, result) => {
                    console.log('result', result.recordset);
                    resolve(result.recordset);
                });
            }).catch(err => {
                console.log('err', err);
                resolve([]);
            });
        });
    }
    usuarioPorPuestoList(idPuesto) {
        var dbConn = new sql.ConnectionPool(sqlConfig);
        return new Promise((resolve, reject) => {
            dbConn
                .connect()
                .then(pool => {
                pool.request()
                    .input('idPuesto', idPuesto)
                    .execute('[dbo].[getUsuarioPorPuesto]', (err, result) => {
                    console.log('result', result.recordset);
                    resolve(result.recordset);
                });
            }).catch(err => {
                console.log('err', err);
                resolve([]);
            });
        });
    }
    crearUsuario(body) {
        var dbConn = new sql.ConnectionPool(sqlConfig);
        return new Promise((resolve, reject) => {
            dbConn
                .connect()
                .then(pool => {
                pool.request()
                    .input('idUsuario', body.idUsuario)
                    .input('nombre', body.nombreUsuario)
                    .input('nacimiento', body.nacimientoUsuario)
                    .input('correo', body.correoUsuario)
                    .input('telefono', body.telefonoUsuario)
                    .input('foto', body.fotoUsuario)
                    .input('idPuesto', body.idPuestoUsuario)
                    .execute('[dbo].[crearusuario]', (err, result) => {
                    console.log('result', result.rowsAffected);
                    resolve(result.rowsAffected);
                });
            }).catch(err => {
                console.log('err', err);
                resolve([]);
            });
        });
    }
    borrarUsuario(idUsuario) {
        console.log('idUsuario', idUsuario);
        var dbConn = new sql.ConnectionPool(sqlConfig);
        return new Promise((resolve, reject) => {
            dbConn
                .connect()
                .then(pool => {
                pool.request()
                    .input('idUsuario', idUsuario)
                    .execute('[dbo].[borrarUsuario]', (err, result) => {
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
exports.UserRepository = UserRepository;
exports.UserRepository = UserRepository = __decorate([
    (0, typedi_1.Service)()
], UserRepository);
exports.UserRepositoryService = new typedi_1.Token();
//# sourceMappingURL=UserRepository.js.map