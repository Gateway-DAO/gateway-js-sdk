import {
  ClientMethod,
  Middleware,
  MiddlewareCallbackParams,
} from 'openapi-fetch';
import type { MediaType } from 'openapi-typescript-helpers';
import { paths } from '../api';
import { WalletService } from '../services/wallet-service';

export type TokenManagementMode = 'jwt' | 'privateKey';

export interface Config {
  jwt?: string;
  apiUrl?: string;
  logging?: boolean;
  wallet?: {
    privateKey: string;
    walletType: WalletTypeEnum;
  };
}

export interface WalletSignMessageType {
  signature: string;
  signingKey: string;
}

export enum WalletTypeEnum {
  Ethereum = 'ethereum',
  Solana = 'solana',
  Sui = 'sui',
}

export interface JWTData {
  did: string;
  exp: number;
  wallet_address: string;
}

export interface CustomConfig {
  privateKey: string;
  wallet: WalletService;
  client: OpenAPIClient<paths, MediaType>;
}

export interface CustomMiddlewareWithVariables<T = any> {
  (variables: T): Middleware;
  onRequest?: (
    options: MiddlewareCallbackParams,
  ) => void | Request | undefined | Promise<Request | undefined | void>;
  onResponse?: (
    options: MiddlewareCallbackParams & { response: Response },
  ) => void | Response | undefined | Promise<Response | undefined | void>;
}

// eslint-disable-next-line @typescript-eslint/ban-types
export interface OpenAPIClient<Paths extends {}, Media extends MediaType> {
  GET: ClientMethod<Paths, 'get', Media>;
  PUT: ClientMethod<Paths, 'put', Media>;
  POST: ClientMethod<Paths, 'post', Media>;
  DELETE: ClientMethod<Paths, 'delete', Media>;
  OPTIONS: ClientMethod<Paths, 'options', Media>;
  HEAD: ClientMethod<Paths, 'head', Media>;
  PATCH: ClientMethod<Paths, 'patch', Media>;
  TRACE: ClientMethod<Paths, 'trace', Media>;
  use(...middleware: Middleware[]): void;
  eject(...middleware: Middleware[]): void;
}

export enum DataAssetType {
  StructuredData = 'Structured Data',
  UnstructedData = 'Other',
}

export type HelperLinks = {
  first: string;
  last: string;
  next: string;
  previous: string;
};

export type HelperMeta = {
  current_page: number;
  items_per_page: number;
  total_items: number;
  total_pages: number;
};

export type HelperPaginatedResponse<T = any> = {
  data: T;
  links: HelperLinks;
  meta: HelperMeta;
};

export type ACLRequest = { address: string; roles: AccessLevel[] };

export enum AccessLevel {
  VIEW = 'view',
  UPDATE = 'update',
  DELETE = 'delete',
  SHARE = 'share',
}

export type AccountCreateRequest = {
  message: string;
  signature: string;
  username: string;
  wallet_address: string;
};

export type AccountUpdateRequest = {
  profile_picture?: string;
  username?: string;
};

export type AuthRequest = {
  message: string;
  signature: string;
  wallet_address: string;
};

export type CreateDataAssetRequest = {
  acl?: ACLRequest[];
  claim?: {};
  data_model_id?: number;
  expiration_date?: string;
  name: string;
  tags?: string[];
};

export type DataAssetIDRequestAndResponse = { id: number };

export type DataModel = {
  created_at: string;
  created_by: string;
  deleted_at?: string;
  description: string;
  id: number;
  schema: {};
  tags?: string[];
  title: string;
  updated_at: string;
};

export type DataModelRequest = {
  description: string;
  schema: {};
  tags?: string[];
  title: string;
};

export type DeleteACLRequest = { addresses: string[] };

export type MessageResponse = { message: string };

export type MyAccountResponse = {
  created_at: string;
  did: string;
  profile_picture?: string;
  storage_size: number;
  updated_at: string;
  username: string;
  username_updated_at: string;
  wallet_addresses: WalletAddress[];
};

export type PublicACL = {
  address: string;
  created_at?: string;
  data_asset_id: number;
  is_authority?: boolean;
  roles: string[];
  solana_address: string;
  updated_at?: string;
};

export type PublicDataAsset = {
  acl: PublicACL[];
  created_at?: string;
  created_by: string;
  data_model_id?: number;
  expiration_date?: string;
  fid: string;
  id: number;
  name: string;
  size: number;
  tags: string[];
  transaction_id: string;
  type: string;
  updated_at?: string;
};

export type ShareDataAssetRequest = { addresses: string[] };

export type TokenResponse = { token: string };

export type UpdateDataAssetRequest = {
  claim?: {};
  expiration_date?: string;
  name?: string;
};

export type WalletAddress = {
  account_id: number;
  address: string;
  chain: string;
  created_at: string;
  id: number;
  updated_at?: string;
};

export type WalletCreateRequest = { address: string };

export type ResponsesMessageResponse = { message: string };
