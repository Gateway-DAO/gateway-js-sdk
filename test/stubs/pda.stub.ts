import { CreatePDAInput, PrivateDataAsset } from '../../gatewaySdk';
import { UserIdentifierType } from '../../src/types';

export const pdaStub = (overridePDA?: any): PrivateDataAsset => ({
  arweaveUrl: 'https://arweave.net/test',
  claimHash: '3e0e527bfcdf531ac7e7333f57f9b8eb7a7cf7388c92920b35c778df1f98673b',
  id: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
  issuanceDate: new Date('2021-01-01T12:00:00Z'),
  lastUpdated: new Date('2021-01-01T12:00:00Z'),
  status: 'Valid',
  dataAsset: {
    description: 'test',
    title: 'test',
    claim: { gatewayUse: 'test' },
    expirationDate: new Date('2021-01-01T12:00:00Z'),
    claimArray: [],
    dataModel: {},
    issuer: {},
    owner: {},
  },
  expirationDate: new Date('2021-01-01T12:00:00Z'),
  hash: '9c10c15ea609ca3598a35b551e2ebe4827e8fb99b5da8443c0cf84ff20872a1b',
  issuerHash:
    'a86d21a712aebd1e6d5a4cb02a6a4a30f41e319a670b401c0bf0fc04c617e0f1',
  ownerHash: '65f18a8b37cbf73d8b201345ed1ccf983e0a571b69b2eef17465a26e3b187700',
  ...overridePDA,
});

export const pdaCreateStub = (overridePDA?: any): CreatePDAInput => ({
  dataModelId: 'f47ac10b-58cc-4372-a567-0e02b2c3d471',
  description: 'test',
  title: 'test',
  claim: {
    gatewayUse: 'test',
  },
  owner: {
    type: UserIdentifierType.GATEWAY_ID,
    value: 'sid',
  },
  expirationDate: new Date('2021-01-01T12:00:0'),
  ...overridePDA,
});
