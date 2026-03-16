import { AppError } from '../AppError';

export class UnauthorizedError extends AppError {

  constructor(message: string) {

    super(message, "Unauthorized", 401);

    Object.setPrototypeOf(this, UnauthorizedError.prototype);
  }

}
