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

export enum OrganizationIdentifierType {
  GATEWAY_ID = 'GATEWAY_ID',
  ORG_ID = 'ORG_ID',
}

export enum OrganizationRole {
  Admin = 'Admin',
  Member = 'Member',
  Owner = 'Owner',
}
