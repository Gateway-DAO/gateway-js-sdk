import { Chain, SignCipherEnum } from '../common/enums';
import { SdkFunctionWrapper } from '../../gatewaySdk/sources/Gateway';

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

export const parameterChecker = (
  apiKey: string,
  token: string,
  url: string,
): boolean => {
  if (!apiKey) throw new Error('No api Key found!');
  if (!token) throw new Error('No token found!');
  if (!url)
    throw new Error('No url found!.Use either sandbox or production url');

  const urls = ['https://v3-dev.protocol.mygateway.xyz/graphql'];

  if (urls.includes(url)) return true;
  else throw new Error('No valid url found!. Use sandbox or production url');
};

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

export const getChain = (cipher?: SignCipherEnum): Chain => {
  if (cipher === SignCipherEnum.ED25519) {
    return Chain.SOL;
  }
  return Chain.EVM;
};

export const getSignCipher = (
  signingCipher?: SignCipherEnum,
): SignCipherEnum => {
  if (signingCipher === SignCipherEnum.ED25519) {
    return SignCipherEnum.ED25519;
  }
  return SignCipherEnum.SECP256K1;
};
