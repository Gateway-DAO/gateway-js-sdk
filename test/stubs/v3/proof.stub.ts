import { Proof, CreateProofInput } from '../../../gatewaySdk/sources/GatewayV3';

export const proofStub = (overrideProof?: any): Proof => ({
  id: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
  createdAt: new Date('2021-01-01T12:00:00Z'),
  updatedAt: new Date('2021-01-01T12:00:00Z'),
  arweaveUrl: 'https://arweave.net/test',
  facilitationFee: 5,
  status: 'ACTIVE',
  hash: '9c10c15ea609ca3598a35b551e2ebe4827e8fb99b5da8443c0cf84ff20872a1b',
  owner: {},
  proofHash: 'sa',
  totalCost: 60.0,
  data: {},
  dataRequest: {},
  verifier: {},
  verifierOrganization: {},
  ...overrideProof,
});

export const createProofStub = (overrideProof?: any): CreateProofInput => ({
  data: {
    claims: [{ keyBlob: 'dfds', pdaId: 1 }],
  },
  signature: '0x8887d10B02C9b785Ca54A2e60c3Ce68DC6dDcdb1',
  signingKey: '0x8887d10B02C9b785Ca54A2e60c3Ce68DC6dDcdb1',
  signingCipher: 'ED25519',
  ...overrideProof,
});

export const requestId = 'f47ac10b-58cc-4372-a567-0e02b2c3d479';
