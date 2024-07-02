import { Chain } from './enums';

export interface Config {
  apiKey: string;
  token: string;
  url: string;
  logging?: boolean;
}

export interface AddWalletConfirmationInput {
  wallet: string;
  chain: Chain;
  signature: string;
}
