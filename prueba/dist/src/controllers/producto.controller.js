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
exports.ProductoController = void 0;
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const producto_repository_1 = require("../repositories/producto.repository");
let ProductoController = class ProductoController {
    constructor(repository) {
        this._repository = repository;
    }
    productoPorDescripcion(descripcion) {
        console.log('productoPorDescripcion');
        return this._repository.productoPorDescripcion(descripcion);
    }
    productoPorDepartamentoList(idDepartamento) {
        console.log('productoPorDepartamentoList');
        return this._repository.productoPorDepartamentoList(idDepartamento);
    }
    getAll() {
        return this._repository.getProducto();
    }
    actualizarInventario(body) {
        console.log('updateInventario', body);
        return this._repository.actualizarInventario(body);
    }
    crearProducto(body) {
        console.log('crearProducto', body);
        return this._repository.crearProducto(body);
    }
    productoAbastecer() {
        return this._repository.productoAbastecer();
    }
    borrarProducto(idProducto) {
        console.log('borrarProducto');
        return this._repository.borrarProducto(idProducto);
    }
};
exports.ProductoController = ProductoController;
__decorate([
    (0, routing_controllers_1.Get)('/productoPorDescripcion/:descripcion'),
    __param(0, (0, routing_controllers_1.Param)('descripcion')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProductoController.prototype, "productoPorDescripcion", null);
__decorate([
    (0, routing_controllers_1.Get)('/productoPorDepartamentoList/:idDepartamento'),
    __param(0, (0, routing_controllers_1.Param)('idDepartamento')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ProductoController.prototype, "productoPorDepartamentoList", null);
__decorate([
    (0, routing_controllers_1.Get)('/producto'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ProductoController.prototype, "getAll", null);
__decorate([
    (0, routing_controllers_1.Post)('/updateInventario'),
    __param(0, (0, routing_controllers_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ProductoController.prototype, "actualizarInventario", null);
__decorate([
    (0, routing_controllers_1.Post)('/crearProducto'),
    __param(0, (0, routing_controllers_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ProductoController.prototype, "crearProducto", null);
__decorate([
    (0, routing_controllers_1.Get)('/productoAbastecer'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ProductoController.prototype, "productoAbastecer", null);
__decorate([
    (0, routing_controllers_1.Post)('/borrarProducto/:idProducto'),
    __param(0, (0, routing_controllers_1.Param)('idProducto')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ProductoController.prototype, "borrarProducto", null);
exports.ProductoController = ProductoController = __decorate([
    (0, routing_controllers_1.JsonController)(),
    __metadata("design:paramtypes", [producto_repository_1.ProductoRepository])
], ProductoController);
//# sourceMappingURL=producto.controller.js.map