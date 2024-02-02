
import 'reflect-metadata';
import { Controller, Param, Body, Get, Post, Put, Delete, JsonController } from 'routing-controllers';
import { PuestoRepository } from '../repositories/puesto.repository';

@JsonController()
export class PuestoController {

  private _repository: PuestoRepository

  constructor(repository: PuestoRepository){
    this._repository = repository
  }
  
  @Get('/puestoList')
  getAll() {
    return this._repository.getAll()
  }
  
  @Post('/crearPuesto')
  crearPuesto(@Body() body:any) {
    console.log('crearPuesto', body)
    return this._repository.crearPuesto(body)
  }
}