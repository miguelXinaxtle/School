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
exports.VentaController = void 0;
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const venta_repository_1 = require("../repositories/venta.repository");
let VentaController = class VentaController {
    constructor(repository) {
        this._repository = repository;
    }
    getAll(dateInicial, dateFinal) {
        return this._repository.getVenta(dateInicial, dateFinal);
    }
    getVendidos(fechaInicial, fechaFinal) {
        return this._repository.masVendidos(fechaInicial, fechaFinal);
    }
};
exports.VentaController = VentaController;
__decorate([
    (0, routing_controllers_1.Get)('/getVenta/:dateInicial/:dateFinal'),
    __param(0, (0, routing_controllers_1.Param)('dateInicial')),
    __param(1, (0, routing_controllers_1.Param)('dateFinal')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], VentaController.prototype, "getAll", null);
__decorate([
    (0, routing_controllers_1.Get)('/masVendidos/:fechaInicial/:fechaFinal'),
    __param(0, (0, routing_controllers_1.Param)('fechaInicial')),
    __param(1, (0, routing_controllers_1.Param)('fechaFinal')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], VentaController.prototype, "getVendidos", null);
exports.VentaController = VentaController = __decorate([
    (0, routing_controllers_1.JsonController)(),
    __metadata("design:paramtypes", [venta_repository_1.VentaRepository])
], VentaController);
//# sourceMappingURL=venta.controller.js.map