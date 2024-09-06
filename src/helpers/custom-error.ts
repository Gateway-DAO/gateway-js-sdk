export class GTWError extends Error {
  public statusCode: number;

  constructor(message: string, res: Response) {
    super(message);
    this.message = captureError(message);
    this.statusCode = res.status;

    Error.captureStackTrace(this, this.constructor);
  }
}

function captureError(message: any) {
  if (message.hasOwnProperty('error')) {
    return message.error;
  }

  return message.error.message;
}
