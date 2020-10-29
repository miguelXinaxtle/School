import {
  Middleware,
  ExpressErrorMiddlewareInterface,
} from "routing-controllers";

// middleaware to response errors
@Middleware({ type: "after" })
export class ErrorMiddleware implements ExpressErrorMiddlewareInterface {
  error(error: any, request: any, response: any, next: any): any {
    if (error) {
      if (response.headersSent) {
        return response.end();
      }
      return response.json(error);
    }
    return next();
  }
}
