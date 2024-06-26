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

export enum OrganizationIdentifierType {
  GATEWAY_ID = 'GATEWAY_ID',
  ORG_ID = 'ORG_ID',
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
