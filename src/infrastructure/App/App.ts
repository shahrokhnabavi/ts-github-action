import express, {
  Application,
  json,
  NextFunction,
  Request,
  Response,
  Router
} from 'express';

import { Configuration } from '../Configuration';
import { ContainerInterface } from '../Container';
import { DatabaseInterface } from '../Database';
import { ErrorHandler } from '../ErrorHandler';
import { ControllerInterface, Route } from '../Http';
import { LoggerInterface } from '../Logger';
import ExpressAction from './ExpressAction';

class App {
  private readonly express: Application;
  private readonly logger: LoggerInterface;
  private readonly errorHandler: ErrorHandler;
  private readonly db: DatabaseInterface;
  private readonly port: string;

  constructor(private readonly container: ContainerInterface) {
    this.port = <string>container.get<Configuration>('config').get('app_port');
    this.logger = container.get('logger');
    this.errorHandler = container.get('errorHandler');
    this.db = container.get('db');

    this.express = express();
    this.loadMiddleware();
  }

  private loadMiddleware(): void {
    this.express.use(json());
    this.express.use((request: Request, response: Response, next: NextFunction): void => {
      this.logger.info(`[🪄] ${request.method}: ${request.path}`);
      next();
    });
  }

  public run(): void {
    this.express.use(this.errorHandler.handle());
    this.express.listen(this.port, (): void => {
      this.logger.info(`Server Running here 👉 http://localhost:${this.port}`);
    });
  }

  public addRoutes<T extends ControllerInterface>(controller: T): void {
    const router: Router = Router();
    const expressAction = new ExpressAction<T>(controller, this.db);

    controller.routes.forEach((route: Route): void => {
      const handler = expressAction.handle(route.action as keyof T);

      if (!(route.method in router)) {
        throw new Error('Method VERB is not supported.');
      }

      router[route.method](route.path, handler);
    });

    this.express.use(router);
  }
}

export default App;
