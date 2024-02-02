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
exports.CajaController = void 0;
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const caja_repository_1 = require("../repositories/caja.repository");
let CajaController = class CajaController {
    constructor(repository) {
        this._repository = repository;
    }
    getall() {
        console.log('vercaja');
        return this._repository.verCaja();
    }
    abrirCaja(body) {
        console.log('abrirCaja', body);
        return this._repository.abrirCaja(body);
    }
    venderProduct(body) {
        console.log('venderProduct', body);
        return this._repository.venderProduct(body);
    }
};
exports.CajaController = CajaController;
__decorate([
    (0, routing_controllers_1.Get)('/verCaja'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CajaController.prototype, "getall", null);
__decorate([
    (0, routing_controllers_1.Post)('/abrirCaja'),
    __param(0, (0, routing_controllers_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CajaController.prototype, "abrirCaja", null);
__decorate([
    (0, routing_controllers_1.Post)('/venderProduct'),
    __param(0, (0, routing_controllers_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CajaController.prototype, "venderProduct", null);
exports.CajaController = CajaController = __decorate([
    (0, routing_controllers_1.JsonController)(),
    __metadata("design:paramtypes", [caja_repository_1.CajaRepository])
], CajaController);
//# sourceMappingURL=caja.controller.js.map