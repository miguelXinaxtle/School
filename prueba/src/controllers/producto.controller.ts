

import 'reflect-metadata';
import { Controller, Param, Body, Get, Post, Put, Delete, JsonController } from 'routing-controllers';
import { ProductoRepository } from '../repositories/producto.repository';
import { get } from 'http';

@JsonController()
export class ProductoController {

  private _repository: ProductoRepository

  constructor(repository: ProductoRepository){
    this._repository = repository
  }
  
  @Get('/productoPorDescripcion/:descripcion')
  productoPorDescripcion(@Param('descripcion') descripcion: string) {
    console.log('productoPorDescripcion')
    return this._repository.productoPorDescripcion(descripcion)
}

  @Get('/productoPorDepartamentoList/:idDepartamento')
  productoPorDepartamentoList(@Param('idDepartamento') idDepartamento: number) {
    console.log('productoPorDepartamentoList')
    return this._repository.productoPorDepartamentoList(idDepartamento)
  }
  
  @Get('/producto')
  getAll() {
    return this._repository.getProducto()
  }

  @Post('/updateInventario')
    actualizarInventario(@Body() body: any){
      console.log('updateInventario',body)
      return this._repository.actualizarInventario(body)
  }

  @Post('/crearProducto')
  crearProducto(@Body() body: any) {
    console.log('crearProducto',body)
    return this._repository.crearProducto(body)
  }

  @Get('/productoAbastecer')
  productoAbastecer() {
    return this._repository.productoAbastecer()
  }

  @Post('/borrarProducto/:idProducto')
  borrarProducto(@Param('idProducto') idProducto: number) {
    console.log('borrarProducto')
    return this._repository.borrarProducto(idProducto)
  }

}
