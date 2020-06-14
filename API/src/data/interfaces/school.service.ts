import * as Q from "q";
import { Token } from "typedi";

export interface ISchoolRepository {
  addSchool(body: any): Q.IPromise<{}>;
  modifySchool(body: any): Q.IPromise<{}>;
  removeSchool(body: any): Q.IPromise<{}>;
  getSchool(query: any): Q.IPromise<{}>;
}

export const SchoolService = new Token<ISchoolRepository>();
