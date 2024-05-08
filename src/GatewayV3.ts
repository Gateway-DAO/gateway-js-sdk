import { GraphQLClient } from 'graphql-request';
import { Sdk, getSdk } from '../gatewaySdk/sources/GatewayV3';
import {
  checkVersion,
  clientTimingWrapper,
  parameterChecker,
} from './utils/helper';
import { PDA } from './v3/pda/pda';

export class GatewayV3 {
  private sdk: Sdk;
  private pda: PDA;

  constructor({
    apiKey,
    token,
    url,
    logging = false,
  }: {
    apiKey: string;
    token: string;
    url: string;
    logging?: boolean;
  }) {
    parameterChecker(apiKey, token, url);

    checkVersion();

    const client = new GraphQLClient(url, {
      headers: { Authorization: `Bearer ${token}`, 'X-Api-Key': apiKey },
    });

    this.sdk = getSdk(client, logging ? clientTimingWrapper : undefined);
    this.pda = new PDA(this.sdk);
  }
}
