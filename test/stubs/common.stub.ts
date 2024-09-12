import { MediaType } from 'openapi-typescript-helpers';
import { paths } from '../../src/api';
import { HelperLinks, HelperMeta, OpenAPIClient } from '../../src/common/types';

export const successMessage = (overrideMessage?: any) => ({
  data: { message: 'Test message' },
  error: null,
  response: {},
  ...overrideMessage,
});

export const errorMessage = (overrideError?: any) => ({
  data: null,
  error: { error: { message: 'Request failed' } },
  response: { status: 500 },
  ...overrideError,
});

export const ID = 8708467049103462;

export const authDetails = (overrideAuth?: any) => ({
  message: 'test',
  signature:
    '0xce4cde85910fb1d667b19f154907160b4b5a03c3e5ad17f338715737283f41a73bb91991900d3f0d98c23f1ce3cbf70071024e8f473599bc7938bd9311744dab1c',
  wallet_address: '0x22e19B1aB46B484d56FbAF069f1bD74477A5cDDC',
  ...overrideAuth,
});

export const authSolanaDetails = (overrideAuth?: any) => ({
  message: 'test',
  signature:
    '2UVETkfpJd5jB6f6rEMUWchMTxamfAS2ufQfZSkkPnQ2zdDXcmsiaHvW7fwauLKXzXKW3bjbh8rboLaHLDz8Ajvb',
  wallet_address: 'GX8ANrJUkaxjHduzz3UStVLxLZBL8RdYR3V6978aRoHT',
  ...overrideAuth,
});

export const metaStub = (overrideMetaStub?: HelperMeta) => ({
  current_page: 1,
  items_per_page: 10,
  total_items: 2,
  total_pages: 1,
  ...overrideMetaStub,
});

export const linksStub = (overrideLinkStub?: HelperLinks) => ({
  first: '/data-assets/me?page=1&page_size=10',
  last: '/data-assets/me?page=1&page_size=10',
  previous: '',
  next: '',
  ...overrideLinkStub,
});

export let mockGet: jest.Mock;
export let mockPost: jest.Mock;
export let mockPut: jest.Mock;
export let mockDelete: jest.Mock;

mockGet = jest.fn();
mockPost = jest.fn();
mockPut = jest.fn();
mockDelete = jest.fn();

export let mockClient: OpenAPIClient<paths, MediaType> = {
  GET: mockGet,
  POST: mockPost,
  PUT: mockPut,
  DELETE: mockDelete,
} as any as OpenAPIClient<paths, MediaType>;
