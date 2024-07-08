import { Chain, SignCipherEnum } from './enums';

export interface Config {
  apiKey: string;
  token: string;
  url: string;
  walletPrivateKey: string;
  walletType?: SignCipherEnum;
  logging?: boolean;
}

export interface AddWalletConfirmationInput {
  wallet: string;
  chain: Chain;
  signature: string;
}

export interface WalletSignMessageType {
  signature: string;
  signingKey: string;
}
