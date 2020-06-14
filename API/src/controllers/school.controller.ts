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

@JsonController("/school")
export class SchoolController {
  private repository: ISchoolRepository;

  constructor(@Inject(SchoolService) repository: ISchoolRepository) {
    this.repository = repository;
  }

  @Authorized()
  @Post("/addSchool")
  addSchool(@Body() body: Request) {
    return this.repository.addSchool(body);
  }

  @Authorized()
  @Post("/modifySchool")
  modifySchool(@Body() body: Request) {
    return this.repository.modifySchool(body);
  }

  @Authorized()
  @Post("/removeSchool")
  removeSchool(@Body() body: Request) {
    return this.repository.removeSchool(body);
  }

  @Authorized()
  @Get("/")
  getSchool(@Req() req: Request) {
    return this.repository.getSchool(req.query);
  }
}
