import { GraphQLClient } from 'graphql-request';
import { getSdk, Sdk } from '../gatewaySdk/sources/Gateway';
import { ethers } from 'ethers';
import { Request } from '../src/modules/request/request';
import { ValidationService } from '../src/services/validator-service';
import { WalletService } from '../src/services/wallet-service';
import {
  createRequestStub,
  requestStub,
  updateRequestStub,
} from './stubs/request.stub';
import { RequestMockService } from '../__mocks__/request.mock';

let request: Request;
let sdk: Sdk;
let wallet: ethers.Wallet;

beforeAll(() => {
  sdk = getSdk(new GraphQLClient(''));
  wallet = ethers.Wallet.createRandom();
  request = new Request(
    sdk,
    new ValidationService(),
    {
      apiKey: '',
      token: '',
      url: '',
      walletPrivateKey: wallet.privateKey,
    },
    new WalletService({ walletPrivateKey: wallet.privateKey }),
  );
});

afterAll(() => {
  jest.resetAllMocks();
});

describe('REQUEST SERVICE TESTING', () => {
  it('data request create', async () => {
    const { createDataRequestMock } = RequestMockService(sdk);

    const { createDataRequest } =
      await request.createDataRequest(createRequestStub());

    expect(createDataRequest.id).toBe(requestStub().id);
    expect(createDataRequestMock).toHaveBeenCalled();
  });

  it('data request create -> throw error', async () => {
    const { createDataRequestMock } = RequestMockService(sdk);

    expect(
      async () =>
        await request.createDataRequest(createRequestStub({ id: '' })),
    ).rejects.toThrow('');
    expect(createDataRequestMock).toHaveBeenCalled();
  });

  it('data request update', async () => {
    const { updateDataRequestMock } = RequestMockService(sdk);

    const { updateDataRequest } =
      await request.updateDataRequest(updateRequestStub());

    expect(updateDataRequest.id).toBe(requestStub().id);
    expect(updateDataRequestMock).toHaveBeenCalled();
  });

  it('data request create -> throw error', async () => {
    const { updateDataRequestMock } = RequestMockService(sdk);

    expect(
      async () =>
        await request.updateDataRequest(updateRequestStub({ id: '' })),
    ).rejects.toThrow('');
    expect(updateDataRequestMock).toHaveBeenCalled();
  });

  it('get data request', async () => {
    const { getDataRequestMock } = RequestMockService(sdk);
    const { dataRequest } = await request.getDataRequest(requestStub().id);

    expect(dataRequest.id).toBe(requestStub().id);
    expect(getDataRequestMock).toHaveBeenCalled();
  });

  it('get data request -> throw error', async () => {
    const { getDataRequestMock } = RequestMockService(sdk);

    expect(async () => await request.getDataRequest('wrong')).rejects.toThrow(
      'wrong is not valid',
    );
    expect(getDataRequestMock).toHaveBeenCalled();
  });

  it('get data request count', async () => {
    const { getDataRequestCountMock } = RequestMockService(sdk);
    const { dataRequestCount } = await request.getDataRequestCount();

    expect(dataRequestCount).toBeGreaterThanOrEqual(0);
    expect(getDataRequestCountMock).toHaveBeenCalled();
  });

  it('get data request status', async () => {
    const { getDataRequestStatusMock } = RequestMockService(sdk);
    const { dataRequestStatus } = await request.getDataRequestStatus(
      requestStub().id,
    );

    expect(dataRequestStatus).toEqual(requestStub().status);
    expect(getDataRequestStatusMock).toHaveBeenCalled();
  });

  it('get data request status -> throww message', async () => {
    const { getDataRequestStatusMock } = RequestMockService(sdk);

    expect(
      async () => await request.getDataRequestStatus('wrong'),
    ).rejects.toThrow('wrong is not valid');
    expect(getDataRequestStatusMock).toHaveBeenCalled();
  });

  it('get data requests', async () => {
    const { getDataRequestMock } = RequestMockService(sdk);
    const { dataRequests } = await request.getDataRequests();

    expect(dataRequests.length).toBeGreaterThanOrEqual(0);
    expect(getDataRequestMock).toHaveBeenCalled();
  });

  it('get requests  received', async () => {
    const { getRequestsReceivedMock } = RequestMockService(sdk);
    const { requestsReceived } = await request.getRequestsReceived();

    expect(requestsReceived.length).toBeGreaterThanOrEqual(0);
    expect(getRequestsReceivedMock).toHaveBeenCalled();
  });

  it('get requests recieved count', async () => {
    const { getRequestReceivedCountMock } = RequestMockService(sdk);
    const { requestsReceivedCount } = await request.getRequestsReceivedCount();

    expect(requestsReceivedCount).toBeGreaterThanOrEqual(0);
    expect(getRequestReceivedCountMock).toHaveBeenCalled();
  });

  it('get requests sent', async () => {
    const { getRequestsSentMock } = RequestMockService(sdk);
    const { requestsSent } = await request.getRequestsSent();

    expect(requestsSent.length).toBeGreaterThanOrEqual(0);
    expect(getRequestsSentMock).toHaveBeenCalled();
  });

  it('get requests sent count', async () => {
    const { getDataRequestCountMock } = RequestMockService(sdk);
    const { requestsSentCount } = await request.getRequestsSentCount();

    expect(requestsSentCount).toBeGreaterThanOrEqual(0);
    expect(getDataRequestCountMock).toHaveBeenCalled();
  });
});
