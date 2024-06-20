export enum UserIdentifierType {
  EMAIL = 'EMAIL',
  EVM = 'EVM',
  GATEWAY_ID = 'GATEWAY_ID',
  SOLANA = 'SOLANA',
  USER_ID = 'USER_ID',
}

export enum SignCipherEnum {
  ED25519 = 'ED25519',
  SECP256K1 = 'SECP256K1',
}

export enum UserIdentifierTypeV3 {
  EMAIL = 'EMAIL',
  EVM = 'EVM',
  POK = 'POKT',
  SOLANA = 'SOLANA',
  USERNAME = 'USERNAME',
  USER_DID = 'USER_DID',
  USER_ID = 'USER_ID',
}
export enum PDAStatus {
  'Expired' = 'Expired',
  'Revoked' = 'Revoked',
  'Suspended' = 'Suspended',
  'Valid' = 'Valid',
}

export enum OrganizationIdentifierType {
  GATEWAY_ID = 'GATEWAY_ID',
  ORG_ID = 'ORG_ID',
}

export enum OrganizationIdentifierTypeV3 {
  ORG_DID = 'ORG_DID',
  ORG_ID = 'ORG_ID',
  USERNAME = 'USERNAME',
}

export enum OrganizationRole {
  Admin = 'Admin',
  Member = 'Member',
  Owner = 'Owner',
}

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

export type EncryptedAESCipher = {
  aesBlob: string;
  keyBlobs: Record<string, string>;
  iv: string;
  tag: string;
};
