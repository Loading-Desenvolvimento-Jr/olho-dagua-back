import { AppError } from '../AppError';

export class TooManyRequestsError extends AppError {

  constructor(message: string) {

    super(message, "Too Many Requests", 429);

    Object.setPrototypeOf(this, TooManyRequestsError.prototype);
  }

}
