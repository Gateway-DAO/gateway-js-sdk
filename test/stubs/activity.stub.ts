import {
  Activity,
  ActivityAction,
  Role,
} from '../../gatewaySdk/sources/Gateway';

export const activityStub = (overrideActivity?: Activity) => ({
  action: 'USER_CREATE' as ActivityAction,
  createdAt: '2024-06-25T12:02:34.587Z',
  id: '667ab1dac4d49d302a576fb7',
  metadata: {
    user: 'did:gatewayid:mygateway:26c56294900e6f55eb2b7897f4d3c3731cfd6cc3aca66747200f39de9a141965',
  },
  read: true,
  signature: null,
  source: {
    did: 'did:gatewayid:238',
    roles: ['User'] as Role[],
    username: 'sid_desktop',
    createdAt: '2024-06-25T12:02:41.828Z',
    description: 'dsfds',
    encryptionKey: 'dsfdsfads',
    id: 'dsfdsfdsfdsf',
    isCompleted: true,
    issuedPDAs: [],
    usernameLastUpdated: '2024-06-25T12:02:41.828Z',
    name: 'dos',
    receivedPDAs: [],
    recipientDataRequests: [],
    totalFileSize: 21312321,
    updatedAt: '2024-06-25T12:02:41.828Z',
    verifierDataRequests: [],
    receivedProofs: [],
  },
  target: null,
  updatedAt: '2024-06-25T12:02:41.828Z',
});
