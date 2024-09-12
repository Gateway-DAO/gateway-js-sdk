export class GTWError extends Error {
  public statusCode: number;

  constructor(message: string, res: Response) {
    super(message);
    this.message = captureError(message);
    this.statusCode = res.status;

    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * The function `captureError` checks if the input message has an 'error' property and returns either
 * the error itself or its message.
 * @param {any} message - The `captureError` function takes a parameter `message`, which can be of any
 * type. The function checks if the `message` object has a property called `error`. If it does, the
 * function returns the value of the `error` property. If the `error` property does not exist
 * @returns The function `captureError` will return the `error` property of the `message` object if it
 * exists. If the `error` property does not exist, it will return the `message` property of the `error`
 * property.
 */
function captureError(message: any) {
  if (message.hasOwnProperty('error')) {
    return message.error;
  }

  return message.error.message;
}
