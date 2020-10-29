import { Request } from "express";
import { Token } from "typedi/Token";
import { IPromise } from "q";
import { IResult } from "../models/result";
import { ILogin } from "../models/login";
import { IUser } from "../models/user";

export interface ISecurity {
  login(body: ILogin): IPromise<IResult>;
  addUser(body: IUser): IPromise<IResult>;
}

export const SecurityService = new Token<ISecurity>();
