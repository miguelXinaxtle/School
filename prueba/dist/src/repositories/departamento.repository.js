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
exports.DepartamentoRepositoryService = exports.DepartamentoRepository = void 0;
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
let DepartamentoRepository = class DepartamentoRepository {
    getAll() {
        var dbConn = new sql.ConnectionPool(sqlConfig);
        return new Promise((resolve, reject) => {
            dbConn
                .connect()
                .then(pool => {
                pool.request().execute('[dbo].[getdepartamentoo]', (err, result) => {
                    console.log('result', result.recordset);
                    resolve(result.recordset);
                });
            }).catch(err => {
                console.log('err', err);
                resolve([]);
            });
        });
    }
    crearDepartamento(body) {
        var dbConn = new sql.ConnectionPool(sqlConfig);
        return new Promise((resolve, reject) => {
            dbConn
                .connect()
                .then(pool => {
                pool.request()
                    .input('nombre', body.nombreDepartamento)
                    .execute('[dbo].[creardepartamento]', (err, result) => {
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
exports.DepartamentoRepository = DepartamentoRepository;
exports.DepartamentoRepository = DepartamentoRepository = __decorate([
    (0, typedi_1.Service)()
], DepartamentoRepository);
exports.DepartamentoRepositoryService = new typedi_1.Token();
//# sourceMappingURL=departamento.repository.js.map