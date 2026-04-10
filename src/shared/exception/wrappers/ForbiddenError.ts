import { AppError } from '../AppError';

export class ForbiddenError extends AppError {

  constructor(message: string) {

    super(message, "Forbidden", 403);

    Object.setPrototypeOf(this, ForbiddenError.prototype);
  }

}
