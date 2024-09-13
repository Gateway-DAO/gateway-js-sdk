import {
  AccessLevel,
  ACLRequest,
  PublicACL,
  PublicDataAsset,
} from '../../src/common/types';
import { ID } from './common.stub';

export const dataAssetStub = (overrideDataAsset?: any): PublicDataAsset => ({
  id: 8708405493497959,
  created_at: '2024-09-11T07:36:36.244479Z',
  updated_at: '2024-09-11T07:36:36.244479Z',
  expiration_date: '2025-09-11T07:36:35.788241Z',
  created_by: '',
  name: 'test.txt',
  size: 183,
  fid: '104,04ab3f808d2e8d',
  transaction_id:
    '2evNA2dzA4tHE8YsZ8z7FWPnQ3UjzUAnSLYDfg8F8eaxxBzMBB9gjtC4WvywayxXmMXthjAcpnZANgSct2B2bAiT',
  tags: null,
  type: 'text/plain',
  acl: [
    {
      solana_address: 'HJrZyDu9nzqrLDprvcp9boRT38zvFnTRN1D5THnAoiD1',
      address:
        'did:gatewayid:gateway:2bc9fa1a1c61102c0601ff7be94d8f8b6ab8f8091a138ee60022b85fzaffce1a',
      roles: ['view', 'update', 'delete'],
    },
  ],
  ...overrideDataAsset,
});

export const aclStub = (): PublicACL => ({
  address:
    'did:gatewayid:gateway:2bc9fa1a1c61102c0601ff7be94d8f8b6ab8f8091a138ee60022b85fzaffce1a',
  created_at: '2025-09-11T07:36:35.788241Z',
  data_asset_id: ID,
  roles: ['view'],
  solana_address: 'HJrZyDu9n1qrLDprvcp9boRT38zvFnTRN1D5THnAoiDR',
  updated_at: '2025-09-11T07:36:35.788241Z',
});

export const aclListStub = (): ACLRequest => ({
  address:
    'did:gatewayid:gateway:2bc9fa1a1c61102c0601ff7be94d8f8b6ab8f8091a138ee60022b85fzaffce1a',
  roles: [AccessLevel.VIEW],
});

export const blobStub = new Blob(['Hello, world!'], { type: 'text/plain' });
