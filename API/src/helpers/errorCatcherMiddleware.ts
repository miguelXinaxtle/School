import {
  Middleware,
  ExpressErrorMiddlewareInterface,
} from "routing-controllers";

@Middleware({ type: "after" })
export class ErrorCatcherMiddleware implements ExpressErrorMiddlewareInterface {
  error(error: any, _req: any, _res: any, _next: any) {
    if (error) {
      if (_res.headersSent) {
        return _res.end();
      }

      return _res.json(error);
    }

    return _next();
  }
}
