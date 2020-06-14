import { Request } from "express";
import { Inject } from "typedi";
import {
  JsonController,
  Param,
  UploadedFile,
  Body,
  Get,
  Post,
  Put,
  Delete,
  Req,
  OnUndefined,
  NotFoundError,
  Authorized,
} from "routing-controllers";
import { AppService, IAppRepository } from "../data/interfaces/IApp.Repository";
import { getType } from "mime";

@JsonController("/app")
export class AppController {
  private repository: IAppRepository;

  constructor(@Inject(AppService) repository: IAppRepository) {
    this.repository = repository;
  }

  @Post("/addUbicacion")
  addUbicacion(@Body() body: Request) {
    return this.repository.addUbicacion(body);
  }

  @Get("/getUbicaciones")
  getUbicaciones(@Req() req: Request) {
    return this.repository.getUbicaciones(req.query);
  }

  @Get("/getPoligonos")
  getPoligonos(@Req() req: Request) {
    return this.repository.getPoligonos(req.query);
  }
}
