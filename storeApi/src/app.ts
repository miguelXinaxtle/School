import "reflect-metadata";
import { Action, createExpressServer, useContainer } from "routing-controllers";
import compression from "compression";
import Container from "typedi";
import { ErrorMiddleware } from "./middleware/ErrorMiddleware";
import { SecurityController } from "./controllers/security.controller";
import { SecurityService } from "./interfaces/security.service";
import { SecurityRepository } from "./repositories/security.repository";
import { ProductController } from "./controllers/product.controller";
import { ProductService } from "./interfaces/product.service";
import { ProductRepository } from "./repositories/product.repository";
import { IResult } from "./models/result";

Container.set(SecurityService, Container.get(SecurityRepository));
Container.set(ProductService, Container.get(ProductRepository));

useContainer(Container);

const app = createExpressServer({
  cors: true,
  controllers: [SecurityController, ProductController],
  middlewares: [ErrorMiddleware],
  authorizationChecker: async (action: Action, roles: string[]) => {
    const token = action.request.headers["authorization"];
    const user: IResult = await new SecurityRepository().checkToken(token);
    if (user && !user.error && !roles.length) return true;

    if (
      user &&
      !user.error &&
      roles.find((role) => user.rows?.indexOf(role) !== -1)
    )
      return true;

    return false;
  },
});

app.use(compression());

console.log("env", process.env.NODE_ENV);

const PORT = process.env.PORT || 3000;

app.listen({ port: PORT }, () =>
  console.log(`Running local server on http://localhost:${PORT}`)
);
