
import 'reflect-metadata';
import { Controller, Param, Body, Get, Post, Put, Delete, JsonController } from 'routing-controllers';
import { ProvedorRepository } from './../repositories/provedor.repository';

@JsonController()
export class ProvedorController {

  private _repository: ProvedorRepository

  constructor(repository: ProvedorRepository){
    this._repository = repository
  }
  
  @Get('/provedorList')
  getAll() {
    return this._repository.getAll()
  }
  
  @Post('/crearProvedor')
  crearProvedor(@Body() body: any) {
    console.log('crearProvedor', body)
    return this._repository.crearProvedor(body)
  }
}