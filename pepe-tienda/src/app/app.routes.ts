import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { ProductoComponent } from './producto/producto.component';
import { CrearProductoComponent } from './crear-producto/crear-producto.component';
import { CrearUsuarioComponent } from './crear-usuario/crear-usuario.component';
import { CrearProvedorComponent } from './crear-provedor/crear-provedor.component';
import { CrearDepartamentoComponent } from './crear-departamento/crear-departamento.component';
import { CrearPuestoComponent } from './crear-puesto/crear-puesto.component';
import { CajaComponent } from './caja/caja.component';
import { InventarioComponent } from './inventario/inventario.component';
import { VentaComponent } from './venta/venta.component';
import { MinimoExistenciaComponent } from './minimo-existencia/minimo-existencia.component';
import { ClienteComponent } from './cliente/cliente.component';
import { ProductoDepartamentoComponent } from './producto-departamento/producto-departamento.component';
import { DescripcionUserComponent } from './descripcion-user/descripcion-user.component';
import { DescripcionClienteComponent } from './descripcion-cliente/descripcion-cliente.component';

export const routes: Routes = [
    {
        path:'',
        component: HomeComponent
    },
    {
        path: 'user',
        component: UserComponent
    },
    {
        path: 'crearProducto',
        component: CrearProductoComponent
    },
    {
        path: 'crearUsuario',
        component: CrearUsuarioComponent
    },
    {
        path: 'crearProvedor',
        component: CrearProvedorComponent
    },
    {
        path: 'crearDepartamento',
        component: CrearDepartamentoComponent
    },
    {
        path:'crearPuesto',
        component: CrearPuestoComponent
    },
    {
        path:'caja',
        component: CajaComponent
    },
    {
        path:'inventario',
        component:InventarioComponent
    },
    {
        path:'venta',
        component:VentaComponent
    },
    {
        path:'minimoExistencia',
        component:MinimoExistenciaComponent
    },
    {
        path:'cliente',
        component:ClienteComponent
    },
    {
        path:'productoDepartamento',
        component:ProductoDepartamentoComponent
    },
    {
        path:'producto/:idProducto',
        component:ProductoComponent
    },
    {
        path:'user/:idUsuario',
        component:DescripcionUserComponent
    },
    {
        path:'cliente/:idCliente',
        component:DescripcionClienteComponent
    }
];
