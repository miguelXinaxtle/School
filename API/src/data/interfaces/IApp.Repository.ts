import * as Q from 'q';
import { Token } from 'typedi';

export interface IAppRepository {

    addUbicacion(body: any): Q.IPromise<{}>;
    getUbicaciones(query: any): Q.IPromise<{}>;
    getPoligonos(query: any): Q.IPromise<{}>;
}

export const AppService = new Token<IAppRepository>(); 