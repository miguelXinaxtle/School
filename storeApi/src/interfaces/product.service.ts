import { Token } from "typedi/Token";
import { IPromise } from "q";
import { IResult } from "../models/result";

export interface IProduct {
  getAll(): IPromise<IResult>;
}

export const ProductService = new Token<IProduct>();
