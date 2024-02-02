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
exports.DepartamentoController = void 0;
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const departamento_repository_1 = require("../repositories/departamento.repository");
let DepartamentoController = class DepartamentoController {
    constructor(repository) {
        this._repository = repository;
    }
    getAll() {
        return this._repository.getAll();
    }
    crearDepartamento(body) {
        console.log('crearDepartamento', body);
        return this._repository.crearDepartamento(body);
    }
};
exports.DepartamentoController = DepartamentoController;
__decorate([
    (0, routing_controllers_1.Get)('/departamentoList'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DepartamentoController.prototype, "getAll", null);
__decorate([
    (0, routing_controllers_1.Post)('/crearDepartamento'),
    __param(0, (0, routing_controllers_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], DepartamentoController.prototype, "crearDepartamento", null);
exports.DepartamentoController = DepartamentoController = __decorate([
    (0, routing_controllers_1.JsonController)(),
    __metadata("design:paramtypes", [departamento_repository_1.DepartamentoRepository])
], DepartamentoController);
//# sourceMappingURL=departamento.controller.js.map