import { FilterPDAInput } from '../.mesh';

export enum UserIdentifierType {
  EMAIL = 'EMAIL',
  EVM = 'EVM',
  GATEWAY_ID = 'GATEWAY_ID',
  SOLANA = 'SOLANA',
  USER_ID = 'USER_ID',
}

export enum PDAStatus {
  'Expired' = 'Expired',
  'Revoked' = 'Revoked',
  'Suspended' = 'Suspended',
  'Valid' = 'Valid',
}

export type PDAFilter = {
  filter?: FilterPDAInput;
  order?: JSON;
  skip?: number;
  take?: number;
};

export enum AuthType {
  'EMAIL' = 'EMAIL',
  'GOOGLE' = 'GOOGLE',
  'HOT_WALLET' = 'HOT_WALLET',
  'WALLET' = 'WALLET',
}

export enum Chain {
  EVM = 'EVM',
  SOL = 'SOL',
}

export type GoogleAuthData = EmailAuthData & {
  accessToken: string;
};

export type EmailAuthData = {
  address: string;
};

export type WalletAuthData = {
  address: string;
  chain: Chain;
  primary?: boolean;
};

export type AuthData = GoogleAuthData | EmailAuthData | WalletAuthData;
