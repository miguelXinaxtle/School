"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const routing_controllers_1 = require("routing-controllers");
const UserController_1 = require("./src/controllers/UserController");
const typedi_1 = require("typedi");
const UserRepository_1 = require("./src/repositories/UserRepository");
const departamento_controller_1 = require("./src/controllers/departamento.controller");
const departamento_repository_1 = require("./src/repositories/departamento.repository");
const puesto_repository_1 = require("./src/repositories/puesto.repository");
const puesto_controller_1 = require("./src/controllers/puesto.controller");
const provedor_repository_1 = require("./src/repositories/provedor.repository");
const provedor_controller_1 = require("./src/controllers/provedor.controller");
const producto_repository_1 = require("./src/repositories/producto.repository");
const producto_controller_1 = require("./src/controllers/producto.controller");
const caja_repository_1 = require("./src/repositories/caja.repository");
const caja_controller_1 = require("./src/controllers/caja.controller");
const venta_repository_1 = require("./src/repositories/venta.repository");
const venta_controller_1 = require("./src/controllers/venta.controller");
const cliente_repository_1 = require("./src/repositories/cliente.repository");
const cliente_controller_1 = require("./src/controllers/cliente.controller");
typedi_1.Container.set(UserRepository_1.UserRepositoryService, typedi_1.Container.get(UserRepository_1.UserRepository));
typedi_1.Container.set(departamento_repository_1.DepartamentoRepositoryService, typedi_1.Container.get(departamento_repository_1.DepartamentoRepository));
typedi_1.Container.set(puesto_repository_1.PuestoRepositoryService, typedi_1.Container.get(puesto_repository_1.PuestoRepository));
typedi_1.Container.set(provedor_repository_1.ProvedorRepositoryService, typedi_1.Container.get(provedor_repository_1.ProvedorRepository));
typedi_1.Container.set(producto_repository_1.ProductoRepositoryService, typedi_1.Container.get(producto_repository_1.ProductoRepository));
typedi_1.Container.set(caja_repository_1.CajaRepositoryService, typedi_1.Container.get(caja_repository_1.CajaRepository));
typedi_1.Container.set(venta_repository_1.VentaRepositoryService, typedi_1.Container.get(venta_repository_1.VentaRepository));
typedi_1.Container.set(cliente_repository_1.ClienteRepositoryService, typedi_1.Container.get(cliente_repository_1.ClienteRepository));
typedi_1.Container.get(UserController_1.UserController);
typedi_1.Container.get(departamento_controller_1.DepartamentoController);
typedi_1.Container.get(puesto_repository_1.PuestoRepository);
typedi_1.Container.get(provedor_repository_1.ProvedorRepository);
typedi_1.Container.get(producto_repository_1.ProductoRepository);
typedi_1.Container.get(caja_controller_1.CajaController);
typedi_1.Container.get(venta_controller_1.VentaController);
typedi_1.Container.get(cliente_controller_1.ClienteController);
(0, routing_controllers_1.useContainer)(typedi_1.Container);
// creates express app, registers all controller routes and returns you express app instance
const app = (0, routing_controllers_1.createExpressServer)({
    cors: true,
    controllers: [
        UserController_1.UserController,
        departamento_controller_1.DepartamentoController,
        puesto_controller_1.PuestoController,
        provedor_controller_1.ProvedorController,
        producto_controller_1.ProductoController,
        caja_controller_1.CajaController,
        venta_controller_1.VentaController,
        cliente_controller_1.ClienteController
    ], // we specify controllers we want to use
});
// run express application on port 3000
app.listen(3000);
//# sourceMappingURL=index.js.map