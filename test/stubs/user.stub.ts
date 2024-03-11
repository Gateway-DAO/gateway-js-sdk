import { FinancialTransaction, User, Wallet } from '../../gatewaySdk';

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
  profilePicture: 'https://fake-url.com',
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

export const financialTransactionsStub = (): FinancialTransaction[] => {
  return [
    {
      action: 'PDA_ISSUANCE',
      createdAt: '2024-01-09T13:09:29.020Z',
      fee: -0.01,
      from: {
        arweaveUrl:
          'https://arweave.net/SJCWg98WEEjMLJrukrgAdtMe0yu5ZIzT3bxGJZPuq-o',
        createdAt: '2023-11-30T09:43:11.314Z',
        credentialsExtraCredits: 0,
        dataModelsExtraCredits: 0,
        deletedAt: null,
        displayName: 'siddharth9890',
        email: null,
        gatewayId: 'sid',
        gatewayIdLastupdate: '2023-11-30T09:43:31.787Z',
        gatewayIdUpdatedAt: null,
        hash: '2abd6aec32d0d99478ca367a82035dd65cfe8c8def639ae9e8fc0de0d0a6ed46fb90c7ca06e5f6c584d2784dfd6840b5',
        id: '955afb97-0d0d-4117-b360-0b279dba6efa',
        isCompleted: false,
        profilePicture:
          'https://www.tryodyssey.xyz/images/campaigns/lifi/odyssey_lifi.png',
        roles: ['User'],
        status: null,
        updatedAt: '2023-12-13T04:50:57.419Z',
        walletId: '65685931a37f3085dc7c0fb8',
        dataRequestTemplates: [],
        description: '',
        issuedPDAs: [],
        name: '',
        receivedPDAs: [],
        recipientDataRequests: [],
        usernameUpdatedAt: new Date(),
        verified: true,
        verifierDataRequests: [],
      },
      id: '659d4589abb2c024ff2ef8e5',
      memo: null,
      to: {
        arweaveUrl:
          'https://arweave.net/tc8GzNOsHU7c6dnPt483nSVB2NQ299pM-gbuCthpZQQ',
        createdAt: '2023-11-29T19:11:19.506Z',
        description:
          'Aqui é Body Builder Ipsum PORRA! AHHHHHHHHHHHHHHHHHHHHHH..., porra! É 13 porra! Eu quero esse 13 daqui a pouquinho aí.\n\n Vamo monstro! Vo derrubar tudo essas árvore do parque ibirapuera. Aqui é Body Builder Ipsum PORRA!\n\n Sai de casa comi pra caralho porra. Vamo monstro! Birl! Sai filho da puta!\n\n Vo derrubar tudo essas árvore do parque ibirapuera. Ele tá olhando pra gente.',
        gatewayId: 'gateway',
        id: '8f5be391-d9a9-4560-950c-3afa13628a66',
        image: null,
        name: 'Gateway',
        updatedAt: '2023-12-14T13:09:39.260Z',
        usernameUpdatedAt: '2023-11-29T19:11:19.506Z',
        verified: false,
        walletId: '657afe924edc79257aba7aed',
        website: 'http://mygateway.xyz',
        dataRequestTemplates: [],
        credentialsExtraCredits: 1,
        dataModelsExtraCredits: 1,
        gatewayIdLastupdate: new Date(),
        isCompleted: true,
        issuedPDAs: [],
        receivedPDAs: [],
        recipientDataRequests: [],
        roles: [],
        verifierDataRequests: [],
      },
      total: -0.01,
      transaction: {
        action: 'PDA_ISSUANCE',
        arweaveUrl:
          'https://arweave.net/AFDNmOYuIoltp_w9-4lGvGFGYQ_6ka7_81lrjRpBxO8',
        cost: -0.01,
        createdAt: '2024-01-09T13:09:28.999Z',
        id: '659d4588abb2c024ff2ef8e3',
        updatedAt: '2024-01-09T13:09:28.999Z',
        financialTransactions: [],
        metadata: {
          earnings: 1,
          fees: 1,
          owner: '',
          verifier: '',
          proof: '',
          requestTemplate: '',
          status: '',
        },
      },
      transactionId: '659d4588abb2c024ff2ef8e3',
      type: 'EXPENSE',
      updatedAt: '2024-01-09T13:09:29.020Z',
      value: 0,
      wallet: {
        moneyIn: 0,
        moneyOut: 0,
        balance: 10,
        moneyInSummary: [],
        moneyOutSummary: [],
      },
    },
  ];
};
