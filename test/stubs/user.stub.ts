import { User } from '../../.mesh';

export const userStub = (overrideUser?: Partial<User>): User => ({
  id: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
  createdAt: new Date('2021-01-01T12:00:00Z'),
  updatedAt: new Date('2021-01-01T12:00:00Z'),
  status: 'Valid',
  credentialsExtraCredits: 10,
  dataModelsExtraCredits: 10,
  dataRequestTemplates: [],
  gatewayIdLastupdate: new Date('2021-01-01T12:00:00Z'),
  isCompleted: true,
  issuedPDAs: [],
  receivedPDAs: [],
  receivedProofs: [],
  recipientDataRequests: [],
  verifierDataRequests: [],
  roles: [],
  gatewayId: 'testuser01',
  email: 'testuser01@mygateway.xyz',
  ...overrideUser,
});
