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
  ISchoolRepository,
  SchoolService,
} from "../data/interfaces/school.service";

/**
 * @author            Miguel Angel Reyes xinaxtle
 * @description       Al ser un servicio seguro require un token para poder ser utilizado
 * @Authorized        Permite procesar el request para validar el token
 * @url               http://{server}:{port}/school
 */
@JsonController("/school")
export class SchoolController {
  private repository: ISchoolRepository;

  // inyecta el respository como una dependencia
  constructor(@Inject(SchoolService) repository: ISchoolRepository) {
    this.repository = repository;
  }

  /**
   * @author         Miguel Angel Reyes xinaxtle
   * @description    Registra una nueva escuela
   * @sp             [Catalogo].[INS_ESCUELA_SP]
   * @url            http://{server}:{port}/school/addSchool
   * @param          nombre
   * @param          estado
   * @param          ciudad
   * @param          municipio
   */
  @Authorized()
  @Post("/addSchool")
  addSchool(@Body() body: Request) {
    return this.repository.addSchool(body);
  }

  /**
   * @author         Miguel Angel Reyes xinaxtle
   * @description    Modifica una escuela
   * @sp             [Catalogo].[UPD_ESCUELA_SP]
   * @url            http://{server}:{port}/school/modifySchool
   * @param          idEscuela
   * @param          nombre
   * @param          estado
   * @param          ciudad
   * @param          municipio
   */
  @Authorized()
  @Post("/modifySchool")
  modifySchool(@Body() body: Request) {
    return this.repository.modifySchool(body);
  }

  /**
   * @author         Miguel Angel Reyes xinaxtle
   * @description    Elimina una escuela
   * @sp             [Catalogo].[DEL_ESCUELA_SP]
   * @url            http://{server}:{port}/school/removeSchool
   * @param          idEscuela
   */
  @Authorized()
  @Post("/removeSchool")
  removeSchool(@Body() body: Request) {
    return this.repository.removeSchool(body);
  }

  /**
   * @author         Miguel Angel Reyes xinaxtle
   * @description    Obtiene las escuelas registradas
   * @sp             [Catalogo].[SEL_ESCUELA_SP]
   * @url            http://{server}:{port}/school/
   */
  @Authorized()
  @Get("/")
  getSchool(@Req() req: Request) {
    return this.repository.getSchool(req.query);
  }
}
