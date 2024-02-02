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
exports.PuestoController = void 0;
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const puesto_repository_1 = require("../repositories/puesto.repository");
let PuestoController = class PuestoController {
    constructor(repository) {
        this._repository = repository;
    }
    getAll() {
        return this._repository.getAll();
    }
    crearPuesto(body) {
        console.log('crearPuesto', body);
        return this._repository.crearPuesto(body);
    }
};
exports.PuestoController = PuestoController;
__decorate([
    (0, routing_controllers_1.Get)('/puestoList'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PuestoController.prototype, "getAll", null);
__decorate([
    (0, routing_controllers_1.Post)('/crearPuesto'),
    __param(0, (0, routing_controllers_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PuestoController.prototype, "crearPuesto", null);
exports.PuestoController = PuestoController = __decorate([
    (0, routing_controllers_1.JsonController)(),
    __metadata("design:paramtypes", [puesto_repository_1.PuestoRepository])
], PuestoController);
//# sourceMappingURL=puesto.controller.js.map