export class AppError extends Error {

  public readonly statusCode: number;

  constructor(message: string, error: string, statusCode = 400) {

    super(message);

    this.statusCode = statusCode;
    this.name = error;

    Object.setPrototypeOf(this, AppError.prototype);
    
  }
  
}