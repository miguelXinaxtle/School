import { Inject } from "typedi";
import {
  Param,
  Body,
  Get,
  Post,
  Put,
  Delete,
  JsonController,
  Authorized,
} from "routing-controllers";
import { ISecurity, SecurityService } from "../interfaces/security.service";
import { ILogin } from "../models/login";
import { IUser } from "../models/user";

/**
 * @author          Miguel Angel Reyes Xinaxtle
 * @description     Administración de la seguridad de la aplicación
 */
@JsonController("/security")
export class SecurityController {
  private repository: ISecurity;

  // Inyecta el repositorio como dependencia
  constructor(@Inject(SecurityService) repository: ISecurity) {
    this.repository = repository;
  }

  @Get("/users")
  getAll() {
    return "This action returns all users";
  }

  @Get("/user/:id")
  getOne(@Param("id") id: number) {
    return "This action returns user #" + id;
  }

  @Authorized(["Sistemas", "Gerente"])
  @Post("/user")
  post(@Body() user: IUser) {
    return this.repository.addUser(user);
  }

  @Post("/login")
  login(@Body() login: ILogin) {
    return this.repository.login(login);
  }

  @Put("/user/:id")
  put(@Param("id") id: number, @Body() user: any) {
    return "Updating a user...";
  }

  @Delete("/user/:id")
  remove(@Param("id") id: number) {
    return "Removing user...";
  }
}
