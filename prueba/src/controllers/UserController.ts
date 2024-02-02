import { UserRepository } from '../repositories/UserRepository';
import 'reflect-metadata';
import { Controller, Param, Body, Get, Post, Put, Delete, JsonController } from 'routing-controllers';

@JsonController()
export class UserController {

  private _repository: UserRepository;

  constructor(userRepository: UserRepository){
    this._repository = userRepository
  }
  // private dbConnect(): Promise<any> {
  //   const env: string = process.env.NODE_ENV || "development";
  //   // Conexion a base de datos dependiendo de entorno
  //   var dbConn = new sql.ConnectionPool(sqlConfig);
  //   return dbConn
  //     .connect()
  //     .then(pool => {
  //       pool.request().execute('[dbo].[getdepartamentoo]')
  //     })
  // }
  @Post('/borrarUsuario/:idUsuario')
  borrarUsuario(@Param('idUsuario') idUsuario: number) {
    console.log('borrarUsuario')
    return this._repository.borrarUsuario(idUsuario)
  }


  @Get('/usersList')
  getUsuario() {
    return this._repository.getUsuario()
  }

  @Get('/usersPorPuestoList')
  usuarioPorPuestoList(@Param('idPuesto') idPuesto: number) {
    return this._repository.usuarioPorPuestoList(idPuesto)
    
  }
  
  @Post('/crearUsuario')
  crearUsuario(@Body() body: any) {
    console.log('crearUsuario', body)
    return this._repository.crearUsuario(body)
  }



  @Post('/users')
  post(@Body() user: any) {
    return 'Saving user...';
  }

  @Put('/users/:id')
  put(@Param('id') id: number, @Body() user: any) {
    return 'Updating a user...';
  }

  @Delete('/users/:id')
  remove(@Param('id') id: number) {
    return 'Removing user...';
  }

  
}