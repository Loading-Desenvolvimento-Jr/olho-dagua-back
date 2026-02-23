import { AppError } from './AppError';

export class ResourceNotFound extends AppError {

  constructor(message: string) {
    
    super(message, 404);

    Object.setPrototypeOf(this, ResourceNotFound.prototype);

  }
  
}