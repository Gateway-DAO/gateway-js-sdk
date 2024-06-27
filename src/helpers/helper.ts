import fs from 'fs';
import { SdkFunctionWrapper } from '../../gatewaySdk/sources/Gateway';

export const clientTimingWrapper: SdkFunctionWrapper = async <T>(
  action: () => Promise<T>,
  operationName: string,
  operationType?: string,
): Promise<T> => {
  const startTime = new Date();
  const result: any = await action();
  console.log(
    `${Object.keys(result)[0]} ${operationType} took ${(new Date() as any) - (startTime as any)} (ms)`,
  );
  return result;
};

export const checkVersion = async () => {
  let inMemory = true;
  if (inMemory) {
    const result = await (
      await fetch('https://registry.npmjs.org/@gateway-dao/sdk/latest')
    ).json();

    fs.readFile('package.json', 'utf8', (err, data) => {
      if (err) {
        console.error('Error reading package.json:', err);
        return;
      }

      try {
        const packageJson = JSON.parse(data);
        if (packageJson.version !== result.version)
          console.warn(
            `You are using ${packageJson.version} which is outdated. Please update to ${result.version} which is latest.`,
          );
      } catch (e) {
        console.error('Error parsing package.json:', e);
      }
    });

    inMemory = false;
  }
};

export const parameterChecker = (
  apiKey: string,
  token: string,
  url: string,
): boolean => {
  if (!apiKey) throw new Error('No apikey found!');
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
