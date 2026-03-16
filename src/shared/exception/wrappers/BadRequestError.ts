import { AppError } from '../AppError';

export class BadRequestError extends AppError {

  constructor(message: string) {

    super(message, "Bad Request", 400);

    Object.setPrototypeOf(this, BadRequestError.prototype);
  }

}
