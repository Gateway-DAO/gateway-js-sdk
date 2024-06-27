import { SdkFunctionWrapper } from '../../gatewaySdk/sources/GatewayV2';

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

  const urls = [
    'https://protocol.mygateway.xyz/graphql',
    'https://sandbox.protocol.mygateway.xyz/graphql',
    'https://develop.protocol.mygateway.xyz/graphql',
    'https://v3-dev.protocol.mygateway.xyz/graphql',
  ];

  if (urls.includes(url)) return true;
  else throw new Error('No valid url found!. Use sandbox or production url');
};
