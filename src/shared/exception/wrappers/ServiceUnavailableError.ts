import { AppError } from '../AppError';

export class ServiceUnavailableError extends AppError {

  constructor(message: string) {

    super(message, "Service Unavailable", 503);

    Object.setPrototypeOf(this, ServiceUnavailableError.prototype);
  }

}
