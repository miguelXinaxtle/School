"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const UserRepository_1 = require("../repositories/UserRepository");
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
let UserController = class UserController {
    constructor(userRepository) {
        this._repository = userRepository;
    }
    // private dbConnect(): Promise<any> {
    //   const env: string = process.env.NODE_ENV || "development";
    //   // Conexion a base de datos dependiendo de entorno
    //   var dbConn = new sql.ConnectionPool(sqlConfig);
    //   return dbConn
    //     .connect()
    //     .then(pool => {
    //       pool.request().execute('[dbo].[getdepartamentoo]')
    //     })
    // }
    borrarUsuario(idUsuario) {
        console.log('borrarUsuario');
        return this._repository.borrarUsuario(idUsuario);
    }
    getUsuario() {
        return this._repository.getUsuario();
    }
    usuarioPorPuestoList(idPuesto) {
        return this._repository.usuarioPorPuestoList(idPuesto);
    }
    crearUsuario(body) {
        console.log('crearUsuario', body);
        return this._repository.crearUsuario(body);
    }
    post(user) {
        return 'Saving user...';
    }
    put(id, user) {
        return 'Updating a user...';
    }
    remove(id) {
        return 'Removing user...';
    }
};
exports.UserController = UserController;
__decorate([
    (0, routing_controllers_1.Post)('/borrarUsuario/:idUsuario'),
    __param(0, (0, routing_controllers_1.Param)('idUsuario')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "borrarUsuario", null);
__decorate([
    (0, routing_controllers_1.Get)('/usersList'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getUsuario", null);
__decorate([
    (0, routing_controllers_1.Get)('/usersPorPuestoList'),
    __param(0, (0, routing_controllers_1.Param)('idPuesto')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "usuarioPorPuestoList", null);
__decorate([
    (0, routing_controllers_1.Post)('/crearUsuario'),
    __param(0, (0, routing_controllers_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "crearUsuario", null);
__decorate([
    (0, routing_controllers_1.Post)('/users'),
    __param(0, (0, routing_controllers_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "post", null);
__decorate([
    (0, routing_controllers_1.Put)('/users/:id'),
    __param(0, (0, routing_controllers_1.Param)('id')),
    __param(1, (0, routing_controllers_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "put", null);
__decorate([
    (0, routing_controllers_1.Delete)('/users/:id'),
    __param(0, (0, routing_controllers_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "remove", null);
exports.UserController = UserController = __decorate([
    (0, routing_controllers_1.JsonController)(),
    __metadata("design:paramtypes", [UserRepository_1.UserRepository])
], UserController);
//# sourceMappingURL=UserController.js.map