import { User, Wallet } from '../../.mesh';

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
  displayName: 'testuser02',
  profilePicture:
    'https://www.tryodyssey.xyz/images/campaigns/lifi/odyssey_lifi.png',
  ...overrideUser,
});

export const walletStub = (): Wallet => ({
  balance: 3.175,
  moneyIn: 5,
  moneyInSummary: [
    {
      action: 'MONEY_DEPOSIT',
      amount: 5,
    },
  ],
  moneyOut: -1.825,
  moneyOutSummary: [
    {
      action: 'PDA_ISSUANCE',
      amount: -0.39,
    },
    {
      action: 'PDA_STATUS_CHANGE',
      amount: -0.085,
    },
    {
      action: 'REQUEST_TEMPLATE_CREATE',
      amount: -0.7000000000000001,
    },
    {
      action: 'DATAMODEL_CREATE',
      amount: -0.65,
    },
  ],
});
