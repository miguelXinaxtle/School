import 'reflect-metadata';
import { Controller, Param, Body, Get, Post, Put, Delete, JsonController } from 'routing-controllers';
import { DepartamentoRepository } from '../repositories/departamento.repository';

@JsonController()
export class DepartamentoController {

  private _repository: DepartamentoRepository

  constructor(repository: DepartamentoRepository){
    this._repository = repository
  }
  
  @Get('/departamentoList')
  getAll() {
    return this._repository.getAll()
  }
  
  @Post('/crearDepartamento')
  crearDepartamento(@Body() body:any) {
    console.log('crearDepartamento', body)
    return this._repository.crearDepartamento(body)
  }
}