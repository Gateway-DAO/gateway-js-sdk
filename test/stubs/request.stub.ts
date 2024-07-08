import {
  DataRequest,
  DataRequestSchemaInput,
  UpdateDataRequestData,
} from '../../gatewaySdk/sources/Gateway';

export const requestStub = (overrideDataRequest?: any): DataRequest => ({
  id: '6188e5e1-dc9e-4b4a-837a-63e18c5f1ae5',
  arweaveUrl: 'https://arweave.net/Mrs7eYW4366sIOM4nZ9mKHU-XnftQ_RbfDS1Hx1EQWM',
  createdAt: '2023-12-12T18:46:12.932Z',
  data: {
    dataUse:
      'Give you a discount for the next "Taylor Swift - The Eras Tour" concert!',
    proofData: {},
    schema: [{ id: '6188e5e1-dc9e-4b4a-837a-63e18c5f1ae5' }],
  },

  owner: {
    did: 'did:gatewayId:rawatmanish12',
  },
  verifierOrganization: true,
  verifier: { id: '6188e5e1-dc9e-4b4a-837a-63e18c5f1ae5' },
  ...overrideDataRequest,
});

export const createRequestStub = (
  overrideDataRequest?: any,
): DataRequestSchemaInput => ({
  id: '6188e5e1-dc9e-4b4a-837a-63e18c5f1ae5',
  data: {
    dataUse: 'Example data usage for the user.',
    owner: { type: 'USER_DID', value: 'did:gatewayid:mygateway:rawatmanish12' },
    schema: [
      {
        id: '6188e5e1-dc9e-4b4a-837a-63e18c5f1ae5',
      },
    ],
  },
  ...overrideDataRequest,
});

export const updateRequestStub = (
  overrideDataRequest?: any,
): UpdateDataRequestData => ({
  requestId: '6188e5e1-dc9e-4b4a-837a-63e18c5f1ae5',
  status: 'EXPIRED',
  ...overrideDataRequest
});
