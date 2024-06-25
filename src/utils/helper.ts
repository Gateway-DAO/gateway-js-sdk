import fs from 'fs';
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

export const checkVersion = async (): Promise<string> => {
  let inMemory = true;
  let version = '0.0.0';
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
        version = packageJson.version;
        if (packageJson.version !== result.version)
          console.error(
            `You are using Gateway SDK (${packageJson.version}) which is outdated. Please update to latest version of Gateway SDK (${result.version}).\nhttps://www.npmjs.com/package/@gateway-dao/sdk `,
          );
      } catch (e) {
        console.error('Error parsing package.json:', e);
      }
    });

    inMemory = false;
    return version;
  }
  return version;
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
