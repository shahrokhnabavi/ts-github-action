import { ErrorRequestHandler, Request, Response } from 'express';

import { LoggerInterface } from '../Logger';
import HttpError from './HttpError';
import HttpStatusCode from './HttpStatusCode';

class ErrorHandler {
  private readonly logger: LoggerInterface;

  constructor({ logger }: { logger: LoggerInterface }) {
    this.logger = logger;
  }

  public handle(): ErrorRequestHandler {
    return (error: Error, req: Request, res: Response): void => {
      this.logger.error(String(error.stack));

      let httpError = error;
      if (!(httpError instanceof HttpError)) {
        httpError = new HttpError(HttpStatusCode.INTERNAL_SERVER_ERROR, '');
      }

      res.status((httpError as HttpError).status).send('Something broke!');
    };
  }
}

export default ErrorHandler;
