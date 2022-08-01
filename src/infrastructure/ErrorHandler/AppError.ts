import AppBaseError from './AppBaseError';

export default class AppError extends AppBaseError {
  constructor(message: string) {
    super(500, message, [], 'AppError');
  }
}
