import { Auth } from '../../gatewaySdk';
import { Chain } from '../../src/types';

export const authStub = (overrideAuth?: any) => ({
  email: 'testuser01@mygateway.xyz',
  username: 'testuser01',
  id: 'f17ac10b-58cc-4372-a567-0e02b2c3d479',
  issuanceDate: new Date('2021-01-01T12:00:00Z'),
  lastUpdated: new Date('2021-01-01T12:00:00Z'),
  code: 111111,
  expirationDate: new Date('2021-01-01T12:00:00Z'),
  wallet: '0x8887d10B02C9b785Ca54A2e60c3Ce68DC6dDcdb1',
  chain: Chain.EVM,
  existingRefreshToken:
    'a86d21a712aebd1e6d5a4cb02a6a4a30f41e319a670b401c0bf0fc04c617e0f1',
  signature: '65f18a8b37cbf73d8b201345ed1ccf983e0a571b69b2eef17465a26e3b187700',
  message: 'message is valid',
  token: 'a86d21a712aebd1e6d5a4cb02a6a4a30f41e319a670b401c0bf0fc04c617e0f1',
  ...overrideAuth,
});
