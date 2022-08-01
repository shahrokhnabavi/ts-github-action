import AppBaseError from './AppBaseError';

export default class HttpError extends AppBaseError {
  constructor(status: number, message: string) {
    super(status, message, [], 'HttpError');
  }
}
