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

@JsonController("/security")
export class SecurityController {
  private repository: ISecurityRepository;

  constructor(@Inject(SecurityService) repository: ISecurityRepository) {
    this.repository = repository;
  }

  @Post("/login")
  login(@Body() body: Request) {
    return this.repository.login(body);
  }

  @Post("/addUser")
  addUser(@Body() body: Request) {
    return this.repository.addUser(body);
  }

  @Authorized(["administrator", "client"])
  @Get("/test")
  test(@Req() req: Request) {
    return this.repository.test(req.query);
  }
}
