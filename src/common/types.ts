import { ClientMethod, Middleware } from 'openapi-fetch';
import type { MediaType } from 'openapi-typescript-helpers';

export interface Config {
  token: string;
  url: string;
  logging?: boolean;
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

export type HelperLinks = {
  first?: string;
  last?: string;
  next?: string;
  previous?: string;
};

export type HelperMeta = {
  current_page?: number;
  items_per_page?: number;
  total_items?: number;
  total_pages?: number;
};

export type HelperPaginatedResponse = {
  data?: any;
  links?: HelperLinks;
  meta?: HelperMeta;
};

export type ModelAccessLevel = 'Read' | 'Write';

export type ModelAccountCreateRequest = {
  message: string;
  signature: string;
  username: string;
  wallet_address: string;
};

export type ModelAuthRequest = {
  message: string;
  signature: string;
  wallet_address: string;
};

export type ModelCreateDataAssetRequest = {
  acl?: ModelRoleRequest[];
  claim?: {};
  data_model_id?: number;
  expiration_date?: string;
  name?: string;
  tags?: string[];
};

export type ModelDataAssetIDRequestAndResponse = { id?: number };

export type ModelDataModel = {
  created_at?: string;
  created_by?: string;
  deleted_at?: string;
  description?: string;
  id?: number;
  schema?: {};
  tags?: string[];
  title?: string;
  updated_at?: string;
};

export type ModelMessageResponse = { message?: string };

export type ModelMyAccountResponse = {
  created_at?: string;
  did?: string;
  profile_picture?: string;
  updated_at?: string;
  username?: string;
  wallet_address?: string;
};

export type ModelPublicDataAsset = {
  created_at?: string;
  created_by?: string;
  data_model_id?: number;
  expiration_date?: string;
  fid?: string;
  id?: number;
  name?: string;
  roles?: ModelPublicRole[];
  size?: number;
  tags?: string[];
  transaction_id?: string;
  type?: string;
  updated_at?: string;
};

export type ModelPublicRole = {
  created_at?: string;
  data_asset_id?: number;
  role?: string;
  updated_at?: string;
  wallet_address?: string;
};

export type ModelRoleRequest = { address?: string; role?: ModelAccessLevel };

export type ModelTokenResponse = { token?: string };

export type ResponsesEntityRemovedResponse = { message?: string };
