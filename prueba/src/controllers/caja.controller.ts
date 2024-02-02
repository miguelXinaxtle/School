
import 'reflect-metadata';
import { Controller, Param, Body, Get, Post, Put, Delete, JsonController } from 'routing-controllers';
import { CajaRepository } from '../repositories/caja.repository';


@JsonController()
export class CajaController {

  private _repository: CajaRepository

  constructor(repository: CajaRepository){
    this._repository = repository
  }
  
  @Get('/verCaja')
  getall(){
    console.log('vercaja')
    return this._repository.verCaja()
  }

  
  @Post('/abrirCaja')
  abrirCaja(@Body() body:any) {
    console.log('abrirCaja', body)
    return this._repository.abrirCaja(body)
  }

  @Post('/venderProduct')
  venderProduct(@Body() body:any){
    console.log('venderProduct',body)
    return this._repository.venderProduct(body)
  }
}



