import { HttpStatusCode } from './index';

export default class AppBaseError extends Error {
  public readonly message: string;
  public readonly name: string;
  public readonly errors: Error[];
  public readonly status: number;

  constructor(status?: number, message?: string, errors?: Error[], name?: string) {
    super(message);

    Error.captureStackTrace(this, this.constructor);

    this.message = message || '';
    this.name = name || 'AppBaseError';
    this.status = status || HttpStatusCode.INTERNAL_SERVER_ERROR;
    this.errors = errors || [];
  }
}
