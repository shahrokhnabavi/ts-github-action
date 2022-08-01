import { NextFunction, Request, RequestHandler, Response } from 'express';

import { DatabaseInterface } from '../Database';
import { HttpRequest, HttpResponse, ControllerInterface, ResponseType } from '../Http';

class ExpressAction<T extends ControllerInterface> {
  constructor(private readonly controller: T, private readonly db: DatabaseInterface) {}

  public handle(action: keyof T): RequestHandler {
    const actionHandler = this.controller[action];

    if (typeof actionHandler !== 'function') {
      throw new Error(
        `Action '${String(action)}' does not implement in ${this.constructor.name}`
      );
    }

    return async (
      request: Request,
      response: Response,
      next: NextFunction
    ): Promise<void> => {
      try {
        const req = new HttpRequest(
          request.body,
          request.query,
          request.params,
          request.ip,
          request.method,
          request.path,
          request.headers
        );

        const res: HttpResponse = await actionHandler.bind(this.controller)(req);
        response.status(res.status);

        if (res.type === ResponseType.HTML) {
          response.send(res.body);
        } else {
          response.json(JSON.parse(res.body));
        }
      } catch (error) {
        await this.db.close();
        next(error);
      }
    };
  }
}

export default ExpressAction;
