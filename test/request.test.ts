import { Request } from '../src/request/request';
import { getSdk } from '../gatewaySdk';
import { RequestMockService } from '../__mocks__/request.mock';
import { requestStub } from './stubs/request.stub';
import { GraphQLClient } from 'graphql-request';

let request: Request;

beforeAll(() => {
  request = new Request(getSdk(new GraphQLClient('')));
});

afterAll(() => {
  jest.resetAllMocks();
});

describe('REQUEST SERVICE TESTING', () => {
  it('data request create', async () => {
    const { createDataRequestMock } = RequestMockService(request);
    const { dataUse, owner, dataRequestTemplate } = requestStub();
    const { createDataRequest } = await request.createDataRequest({
      dataUse,
      owner: {
        type: 'GATEWAY_ID',
        value: 'Ticketmaster',
      },
      dataRequestTemplateId: dataRequestTemplate.id,
    });

    expect(createDataRequest.id).toBe(requestStub().id);
    expect(createDataRequestMock).toHaveBeenCalled();
  });

  it('data request create -> throw error', async () => {
    const { createDataRequestMock } = RequestMockService(request);
    const { dataUse, owner, dataRequestTemplate } = requestStub();
    expect(
      async () =>
        await request.createDataRequest({
          dataUse,
          owner: {
            type: 'GATEWAY_ID',
            value: 'Ticketmaster',
          },
          dataRequestTemplateId: 'wrong',
        }),
    ).rejects.toThrow(' is not valid');
    expect(createDataRequestMock).toHaveBeenCalled();
  });

  it('get data request', async () => {
    const { getDataRequestMock } = RequestMockService(request);
    const { dataRequest } = await request.getDataRequest(requestStub().id);

    expect(dataRequest.id).toBe(requestStub().id);
    expect(getDataRequestMock).toHaveBeenCalled();
  });

  it('get data request -> throw error', async () => {
    const { getDataRequestMock } = RequestMockService(request);

    expect(async () => await request.getDataRequest('wrong')).rejects.toThrow(
      'wrong is not valid',
    );
    expect(getDataRequestMock).toHaveBeenCalled();
  });

  it('get data request count', async () => {
    const { getDataRequestCountMock } = RequestMockService(request);
    const { dataRequestCount } = await request.getDataRequestCount();

    expect(dataRequestCount).toBeGreaterThanOrEqual(0);
    expect(getDataRequestCountMock).toHaveBeenCalled();
  });

  it('get data request status', async () => {
    const { getDataRequestStatusMock } = RequestMockService(request);
    const { dataRequestStatus } = await request.getDataRequestStatus(
      requestStub().id,
    );
    expect(dataRequestStatus).toEqual(requestStub().status);
    expect(getDataRequestStatusMock).toHaveBeenCalled();
  });

  it('get data request status -> throww message', async () => {
    const { getDataRequestStatusMock } = RequestMockService(request);

    expect(
      async () => await request.getDataRequestStatus('wrong'),
    ).rejects.toThrow('wrong is not valid');
    expect(getDataRequestStatusMock).toHaveBeenCalled();
  });

  it('get data requests', async () => {
    const { getDataRequestMock } = RequestMockService(request);
    const { dataRequests } = await request.getDataRequests();
    expect(dataRequests.length).toBeGreaterThanOrEqual(0);
    expect(getDataRequestMock).toHaveBeenCalled();
  });

  it('get requests  received', async () => {
    const { getRequestsReceivedMock } = RequestMockService(request);
    const { requestsReceived } = await request.getRequestsReceived();

    expect(requestsReceived.length).toBeGreaterThanOrEqual(0);
    expect(getRequestsReceivedMock).toHaveBeenCalled();
  });

  it('get requests recieved count', async () => {
    const { getRequestReceivedCountMock } = RequestMockService(request);
    const { requestsReceivedCount } = await request.getRequestsReceivedCount();
    expect(requestsReceivedCount).toBeGreaterThanOrEqual(0);
    expect(getRequestReceivedCountMock).toHaveBeenCalled();
  });

  it('get requests sent', async () => {
    const { getRequestsSentMock } = RequestMockService(request);
    const { requestsSent } = await request.getRequestsSent();

    expect(requestsSent.length).toBeGreaterThanOrEqual(0);
    expect(getRequestsSentMock).toHaveBeenCalled();
  });

  it('get requests sent count', async () => {
    const { getDataRequestCountMock } = RequestMockService(request);
    const { requestsSentCount } = await request.getRequestsSentCount();
    expect(requestsSentCount).toBeGreaterThanOrEqual(0);
    expect(getDataRequestCountMock).toHaveBeenCalled();
  });
});
