import { DataRequest } from '../../gatewaySdk';

export const requestStub = (overrideDataRequest?: any): DataRequest => ({
  arweaveUrl: 'https://arweave.net/Mrs7eYW4366sIOM4nZ9mKHU-XnftQ_RbfDS1Hx1EQWM',
  createdAt: '2023-12-12T18:46:12.932Z',
  dataRequestTemplate: {
    id: 'd1fb5d09-7302-46ee-a871-9f15ac0cb4e8',
  },
  dataUse:
    'Give you a discount for the next "Taylor Swift - The Eras Tour" concert!',
  id: '6188e5e1-dc9e-4b4a-837a-63e18c5f1ae5',
  owner: {
    walletId: '6579ade711ccc692dcabf67e',
  },
  proof: null,
  status: 'PENDING',
  verifier: {
    walletId: '65789be8c8c57f261d6f0921',
  },
  verifierOrganization: {
    gatewayId: 'Ticketmaster',
  },
  ...overrideDataRequest,
});
