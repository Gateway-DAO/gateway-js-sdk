import { Transaction } from '../../gatewaySdk';

export const transactionStub = (overirdeTransaction?: any): Transaction => ({
  action: 'PDA_ISSUANCE',
  arweaveUrl: 'https://arweave.net/UteWnSizZvTxzczXQfjbUF3IhCrCVJwggpCOQK_LeXA',
  cost: -0.01,
  createdAt: '2024-01-23T20:47:09.259Z',
  financialTransactions: [
    {
      action: 'PDA_ISSUANCE',
      createdAt: '2024-01-23T20:47:09.298Z',
      fee: -0.01,
      id: '65b025cd7b20022a8d08844b',
      memo: null,
      total: -0.01,
      transactionId: '65ba321f3d17fd2bd6d9f49d',
      type: 'EXPENSE',
      updatedAt: '2024-01-23T20:47:09.298Z',
      value: 0,
    },
  ],
  from: {
    arweaveUrl:
      'https://arweave.net/ddNNm1wT8Y0A-P8lpGJw94-CFeOWlo2Ydx3RYFVUFY8',
    createdAt: '2023-11-29T19:11:19.506Z',
    description:
      'Aqui é Body Builder Ipsum PORRA! AHHHHHHHHHHHHHHHHHHHHHH..., porra! É 13 porra! Eu quero esse 13 daqui a pouquinho aí.\n\n Vamo monstro! Vo derrubar tudo essas árvore do parque ibirapuera. Aqui é Body Builder Ipsum PORRA!\n\n Sai de casa comi pra caralho porra. Vamo monstro! Birl! Sai filho da puta!\n\n Vo derrubar tudo essas árvore do parque ibirapuera. Ele tá olhando pra gente.',
    gatewayId: 'gateway',
    id: '8f5be391-d9a9-4560-950c-3afa13628a66',
    image: null,
    name: 'Gateway',
    updatedAt: '2024-01-23T18:03:00.598Z',
    usernameUpdatedAt: '2023-11-29T19:11:19.506Z',
    verified: false,
    walletId: '657afe924edc79257aba7aed',
    website: 'http://mygateway.xyz',
  },
  id: '65ba321f3d17fd2bd6d9f49d',
  metadata: {
    dataModel: '75928d4b-e3de-4952-80ac-f8723dffac1e',
    expirationDate: null,
    issuer:
      'b266afd285d6c64b918ea805d82918c58ff4b76f46827c43b8584f73ff440ce0eb2515143579801f277203b33f4eb69b',
    pda: '353bb28128e51d8decb4552412d099150ae02b32aa260b9731a1c760e73bf5263c638668fa153d7c019a76611e9feef2',
    signedBy:
      '860a31d220e1343b46c4efae14f4c7db375daba8c8259ae8620928f31b150ca26c7b5c355fbfba3a408536fd1a4027c8',
    owner: 'fdsfdsa',
    requestTemplate: 'dsfdsffdsf',
    status: 'dsfdsffdsf',
    verifier: 'dsfdsffdsf',
    request: 'Dsfdsfdsfd',
  },

  to: {
    arweaveUrl:
      'https://arweave.net/zPS28G4hM6_21Ud9qMllk44v93h0XRrPZff5JvxiCFk',
    createdAt: '2023-11-29T19:21:15.743Z',
    credentialsExtraCredits: 0,
    dataModelsExtraCredits: 0,
    deletedAt: null,
    displayName: 'James Rodriguez',
    email: 'joao+james@mygateway.xyz',
    gatewayId: 'jamesrodriguez',
    gatewayIdLastupdate: '2024-01-10T21:27:32.484Z',
    gatewayIdUpdatedAt: null,
    hash: '7a132db844c68f4cd2873578f9a37398f508fe21c5a73d87ffc070c992926287feedb13e348e9f492370387987f61e32',
    id: 'a1030d23-c237-4047-8090-89ba1aac16cf',
    isCompleted: true,
    profilePicture:
      'https://arweave.net/A4xjcnKZ61mB9N3iDJ-UJHdrYUKLdSTJLWaZDYHelfA',
    roles: ['User'],
    status: null,
    updatedAt: '2024-01-23T21:44:34.375Z',
    walletId: '65678f2dcc94cfb73e364eb3',
  },
  updatedAt: '2024-01-23T20:47:09.259Z',
  ...overirdeTransaction,
});
