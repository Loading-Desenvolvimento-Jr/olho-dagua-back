import { AppError } from '../AppError';

export class UnprocessableEntityError extends AppError {

  constructor(message: string) {

    super(message, "Unprocessable Entity", 422);

    Object.setPrototypeOf(this, UnprocessableEntityError.prototype);
  }

}
