import { ClienteRepository } from './../repositories/cliente.repository';
import 'reflect-metadata';
import { Controller, Param, Body, Get, Post, Put, Delete, JsonController } from 'routing-controllers';

@JsonController()
export class ClienteController {

  private _repository: ClienteRepository;

  constructor(ClienteRepository: ClienteRepository){
    this._repository = ClienteRepository
  }


  @Post('/crearCliente')
  crearCliente(@Body() body: any) {
    console.log('crearCliente', body)
    return this._repository.crearCliente(body)
  }

  @Get('/comprasCLiente')
  comprasCLiente() {
    return this._repository.comprasCliente()
  }
  @Post('/borrarCliente/:idCliente')
  borrarCliente(@Param('idCliente') idCliente: number) {
    console.log('borrarCliente')
    return this._repository.borrarCliente(idCliente)
  }

}