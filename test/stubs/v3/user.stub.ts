import { Activity, User } from '../../../gatewaySdk/sources/GatewayV3';

export const userStub = (overrideUser?: Partial<User>): User => ({
  id: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
  createdAt: new Date('2021-01-01T12:00:00Z'),
  updatedAt: new Date('2021-01-01T12:00:00Z'),
  username: 'test01',
  isCompleted: true,
  issuedPDAs: [],
  receivedPDAs: [],
  receivedProofs: [],
  recipientDataRequests: [],
  verifierDataRequests: [],
  roles: [],
  did: 'did:gatewayid:abc123',
  encryptionKey: '',
  usernameLastUpdated: new Date('2021-01-01T12:00:00Z'),
  ...overrideUser,
});

export const activitiesStub = (): Activity[] => {
  return [
    {
      action: 'PDA_ISSUANCE',
      createdAt: '2024-01-09T13:09:29.020Z',
      id: '659d4589abb2c024ff2ef8e5',
      updatedAt: '2024-01-09T13:09:29.020Z',
      metadata: {
        creator: '',
        dataModel: '',
        issuer: '',
        dataModels: [''],
        organization: '',
        owner: '',
        pda: '',
        proof: '',
        requestTemplate: '',
        signedBy: '',
        status: '',
      },
    },
  ];
};

export const invalidUUID = '111';
