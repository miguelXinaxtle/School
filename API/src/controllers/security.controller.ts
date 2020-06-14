import { Request } from "express";
import { Inject } from "typedi";
import {
  JsonController,
  Body,
  Get,
  Post,
  Req,
  Authorized,
} from "routing-controllers";
import {
  ISecurityRepository,
  SecurityService,
} from "../data/interfaces/security.service";

/**
 * @author            Miguel Angel Reyes xinaxtle
 * @description       Registra y permite el logueo a la aplicación utilizando tokens
 * @url               http://{server}:{port}/security
 */
@JsonController("/security")
export class SecurityController {
  private repository: ISecurityRepository;

  // Inyecta el repositorio como una dependencia
  constructor(@Inject(SecurityService) repository: ISecurityRepository) {
    this.repository = repository;
  }

  /**
   * @author         Miguel Angel Reyes xinaxtle
   * @description    Registra un nuevo usuario en el sistema
   * @sp             [Catalogo].[INS_USUARIO_SP]
   * @url            http://{server}:{port}/security/addUser
   * @param          correo
   * @param          contrasenia
   * @param          nombre
   * @param          telefono
   */
  @Post("/addUser")
  addUser(@Body() body: Request) {
    return this.repository.addUser(body);
  }

  /**
   * @author         Miguel Angel Reyes xinaxtle
   * @description    Validar el acceso de un usuario con contraseña mediante token's
   * @sp             [Operacion].[LOGIN_SP], [Operacion].[INS_TOKEN_SP]
   * @url            http://{server}:{port}/security/login
   * @param          correo
   * @param          contrasenia
   */
  @Post("/login")
  login(@Body() body: Request) {
    return this.repository.login(body);
  }

  /**
   * @author         Miguel Angel Reyes xinaxtle
   * @description    Prueba de uso de roles
   * @sp             -NA-
   * @url            http://{server}:{port}/security/test
   */
  @Authorized(["administrator", "client"])
  @Get("/test")
  test(@Req() req: Request) {
    return this.repository.test(req.query);
  }
}
