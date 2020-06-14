import * as Q from "q";
import { Token } from "typedi";

export interface ISecurityRepository {
  login(body: any): Q.IPromise<{}>;
  addUser(body: any): Q.IPromise<{}>;
  test(query: any): string;
}

export const SecurityService = new Token<ISecurityRepository>();
