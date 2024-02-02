

import 'reflect-metadata';
import { Controller, Param, Body, Get, Post, Put, Delete, JsonController } from 'routing-controllers';
import { ProductoRepository } from '../repositories/producto.repository';
import { VentaRepository } from '../repositories/venta.repository';

@JsonController()
export class VentaController {

  private _repository: VentaRepository

  constructor(repository: VentaRepository){
    this._repository = repository
  }


  @Get('/getVenta/:dateInicial/:dateFinal')
  getAll(@Param('dateInicial') dateInicial: string, @Param('dateFinal') dateFinal: string) {
    return this._repository.getVenta(dateInicial, dateFinal)
  }

  @Get('/masVendidos/:fechaInicial/:fechaFinal')
    getVendidos(@Param('fechaInicial') fechaInicial: string, @Param('fechaFinal') fechaFinal: string) {
      return this._repository.masVendidos(fechaInicial, fechaFinal)
    }


}