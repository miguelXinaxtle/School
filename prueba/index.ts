import { createExpressServer, useContainer } from 'routing-controllers';
import { UserController } from './src/controllers/UserController';
import { Container } from 'typedi';
import { UserRepository, UserRepositoryService } from './src/repositories/UserRepository';
import { DepartamentoController } from './src/controllers/departamento.controller';
import { DepartamentoRepository, DepartamentoRepositoryService } from './src/repositories/departamento.repository';
import { PuestoRepository, PuestoRepositoryService } from './src/repositories/puesto.repository';
import { PuestoController } from './src/controllers/puesto.controller';
import { ProvedorRepository, ProvedorRepositoryService } from './src/repositories/provedor.repository';
import { ProvedorController } from './src/controllers/provedor.controller';
import { ProductoRepository, ProductoRepositoryService } from './src/repositories/producto.repository';
import { ProductoController } from './src/controllers/producto.controller';
import { CajaRepository, CajaRepositoryService } from './src/repositories/caja.repository';
import { CajaController } from './src/controllers/caja.controller';
import { VentaRepository, VentaRepositoryService } from './src/repositories/venta.repository';
import { VentaController } from './src/controllers/venta.controller';
import { ClienteRepository, ClienteRepositoryService } from './src/repositories/cliente.repository';
import { ClienteController } from './src/controllers/cliente.controller';


Container.set(UserRepositoryService,            Container.get(UserRepository))
Container.set(DepartamentoRepositoryService,    Container.get(DepartamentoRepository))
Container.set(PuestoRepositoryService,          Container.get(PuestoRepository))
Container.set(ProvedorRepositoryService,        Container.get(ProvedorRepository))
Container.set(ProductoRepositoryService,        Container.get(ProductoRepository))
Container.set(CajaRepositoryService,            Container.get(CajaRepository))
Container.set(VentaRepositoryService,           Container.get(VentaRepository))
Container.set(ClienteRepositoryService,         Container.get(ClienteRepository))


Container.get(UserController)
Container.get(DepartamentoController)
Container.get(PuestoRepository)
Container.get(ProvedorRepository)
Container.get(ProductoRepository)
Container.get(CajaController)
Container.get(VentaController)
Container.get(ClienteController)

useContainer(Container);
// creates express app, registers all controller routes and returns you express app instance
const app = createExpressServer({
  cors: true,
  controllers: [
    UserController, 
    DepartamentoController, 
    PuestoController,
    ProvedorController,
    ProductoController,
    CajaController,
    VentaController,
    ClienteController
  ], // we specify controllers we want to use
});

// run express application on port 3000
app.listen(3000);
