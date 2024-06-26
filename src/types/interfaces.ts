import { Chain } from './types';

export interface Config {
  apiKey: string;
  token: string;
  url: string;
}

export interface AddWalletConfirmationInput {
  wallet: string;
  chain: Chain;
  signature: string;
}
