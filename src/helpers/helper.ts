import { Chain, SignCipherEnum } from '../common/enums';
import { SdkFunctionWrapper } from '../../gatewaySdk/sources/Gateway';

/**
 * The `clientTimingWrapper` function is a TypeScript wrapper that logs the time taken for a specified
 * operation to complete.
 * @param action - The `action` parameter is a function that returns a Promise. It represents the
 * asynchronous operation that you want to measure the timing for.
 * @param {string} operationName - The `operationName` parameter in the `clientTimingWrapper` function
 * represents the name of the operation being performed. It is a string value that helps identify and
 * label the specific action or task being timed for performance measurement purposes.
 * @param {string} [operationType] - The `operationType` parameter in the `clientTimingWrapper`
 * function is an optional parameter that specifies the type of operation being performed. It can be
 * used to provide additional context or information about the operation being timed. If not provided,
 * the `operationType` parameter will default to `undefined`.
 * @returns The function `clientTimingWrapper` is returning a Promise of type T.
 */
export const clientTimingWrapper: SdkFunctionWrapper = async <T>(
  action: () => Promise<T>,
  operationName: string,
  operationType?: string,
): Promise<T> => {
  const startTime = new Date();
  const result: Awaited<T> = await action();
  console.log(
    `Gateway_SDK ${Object.keys(result as any)[0]} ${operationType} took ${(new Date() as any) - (startTime as any)} (ms)`,
  );
  return result;
};

/**
 * The function `parameterChecker` validates the presence of required parameters and checks if the
 * provided URL is valid for a specific set of URLs.
 * @param {string} apiKey - The `apiKey` parameter is a string that represents the API key required for
 * authentication.
 * @param {string} token - The `token` parameter is a string that is used for authentication and
 * authorization purposes when making requests to a specific API or service. It is typically a unique
 * identifier that grants access to certain resources or actions. In the `parameterChecker` function
 * provided, the `token` parameter is required and must be
 * @param {string} url - The `url` parameter is a string that represents the URL endpoint where the API
 * requests will be sent. It should be either a sandbox or production URL from the list provided in the
 * `parameterChecker` function.
 * @returns The `parameterChecker` function returns a boolean value. If the provided `url` parameter
 * matches one of the URLs in the `urls` array, it returns `true`. Otherwise, it throws an error
 * indicating that a valid URL was not found.
 */
export const parameterChecker = (
  apiKey: string,
  token: string,
  url: string,
): boolean => {
  if (!apiKey) throw new Error('No api Key found!');
  if (!token) throw new Error('No token found!');
  if (!url)
    throw new Error('No url found!.Use either sandbox or production url');

  const urls = [
    'https://protocol.mygateway.xyz/graphql',
    'https://sandbox.protocol.mygateway.xyz/graphql',
    'https://develop.protocol.mygateway.xyz/graphql',
    'https://v3-dev.protocol.mygateway.xyz/graphql',
  ];

  if (urls.includes(url)) return true;
  else throw new Error('No valid url found!. Use sandbox or production url');
};

/**
 * The errorHandler function in TypeScript handles errors by extracting and returning error messages
 * from different types of error objects.
 * @param {any} error - The `error` parameter in the `errorHandler` function is expected to be of type
 * `any`, which means it can be any data type. The function checks if the error has a `response`
 * property, then looks for `errors` array within `response`, and finally retrieves the error message
 * @returns The errorHandler function returns a string message based on the type of error object passed
 * to it. If the error object has a response property with errors array containing a message, it
 * returns that message. If the error object itself has a message property, it returns that message. If
 * none of these conditions are met, it returns 'Something went wrong!'.
 */
export const errorHandler = (error: any): string => {
  if (
    error.response &&
    error.response.errors &&
    error.response.errors.length > 0 &&
    error.response.errors[0].message
  ) {
    return error.response.errors[0].message;
  } else if (typeof error === 'object' && error !== null) {
    if ('message' in error) {
      return error.message;
    }
  }
  return 'Something went wrong!';
};

/**
 * The function `getChain` returns the blockchain type based on the provided cipher, defaulting to EVM
 * if no cipher is specified.
 * @param {SignCipherEnum} [cipher] - The `cipher` parameter is an optional parameter of type
 * `SignCipherEnum`. It is used to determine the type of cipher being used for signing. If the cipher
 * is `SignCipherEnum.ED25519`, the function will return the `Chain.SOL` chain. Otherwise, it will
 * return
 * @returns The function `getChain` returns the blockchain type based on the provided `cipher`
 * parameter. If the `cipher` is `SignCipherEnum.ED25519`, it returns `Chain.SOL` which represents the
 * Solana blockchain. Otherwise, it returns `Chain.EVM` which represents the Ethereum Virtual Machine
 * (EVM) compatible blockchains.
 */
export const getChain = (cipher?: SignCipherEnum): Chain => {
  if (cipher === SignCipherEnum.ED25519) {
    return Chain.SOL;
  }
  return Chain.EVM;
};

/**
 * The function `getSignCipher` returns the specified signing cipher or defaults to SECP256K1.
 * @param {SignCipherEnum} [signingCipher] - The `signingCipher` parameter is an optional parameter of
 * type `SignCipherEnum`. It is used to specify the type of signing cipher to be used in a
 * cryptographic operation. The function `getSignCipher` takes this parameter as input and returns the
 * specified signing cipher. If the `signing
 * @returns SignCipherEnum.SECP256K1
 */
export const getSignCipher = (
  signingCipher?: SignCipherEnum,
): SignCipherEnum => {
  if (signingCipher === SignCipherEnum.ED25519) {
    return SignCipherEnum.ED25519;
  }
  return SignCipherEnum.SECP256K1;
};
