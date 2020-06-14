import "reflect-metadata";
import {
  createExpressServer,
  useContainer,
  Action,
  UnauthorizedError,
} from "routing-controllers";
import { Container, ContainerInstance } from "typedi";
import { ErrorCatcherMiddleware } from "./helpers/errorCatcherMiddleware";
import { SecurityService } from "./data/interfaces/security.service";
import { SecurityRepository } from "./data/repository/security.repository";
import { SecurityController } from "./controllers/security.controller";
import { SchoolService } from "./data/interfaces/school.service";
import { SchoolRepository } from "./data/repository/school.repository";
import { SchoolController } from "./controllers/school.controller";
import { async } from "q";
import { IToken } from "./models/token";
import { IResult } from "./models/result";

Container.set(SecurityService, Container.get(SecurityRepository));
Container.set(SchoolService, Container.get(SchoolRepository));

useContainer(Container);
const app = createExpressServer({
  cors: true,
  controllers: [SecurityController, SchoolController],
  middlewares: [ErrorCatcherMiddleware],
  authorizationChecker: async (action: Action, roles: string[]) => {
    const token = action.request.headers["authorization"];
    const body: IToken = {
      idUsuario: 0,
      token,
    };

    const user: IResult = await new SecurityRepository().checkToken(body);
    if (user && user.error == "" && user.item && user.item.tokenValido) {
      return true;
    }
    // Cuando se implementen roles
    // if (user && roles.find(role => user.roles.indexOf(role) !== -1))
    //     return true;
    return false;
  },
});

const PORT = process.env.PORT || 5990;

app.listen(PORT);
console.log(`Running local server on http://localhost:${PORT}`);
