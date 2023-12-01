import { Gateway } from '../src/Gateway';
let api: Gateway;

beforeAll(() => {
  const apiKey = process.env.API_KEY;
  const token = process.env.BEARER_TOKEN;

  if (!apiKey || !token) {
    throw new Error(
      'APIKEY or TOKEN is not defined in the environment variables.',
    );
  }

  api = new Gateway({
    apiKey: apiKey,
    token: token,
  });
});

describe('unit test related to the request queries', () => {
  it('create data request', async () => {
    const { createDataRequest } = await api.request.createDataRequest({
      dataRequestTemplateId: process.env.DATAREQUEST_TEMPLATE_ID as string,
      owner: {
        type: 'GATEWAY_ID',
        value: 'sid',
      },
      dataUse: 'Because I can',
    });

    expect(createDataRequest.dataUse).toEqual('Because I can');
  }, 8000);

  it('get request using id', async () => {
    const { dataRequest } = await api.request.getDataRequest(
      process.env.DATAREQUEST_ID as string,
    );

    expect(dataRequest.id).toEqual(process.env.DATAREQUEST_ID);
  });

  it('get request count', async () => {
    const { dataRequestCount } = await api.request.getDataRequestCount();

    expect(dataRequestCount).toBeGreaterThanOrEqual(0);
  });

  it('get data request status', async () => {
    const { dataRequestStatus } = await api.request.getDataRequestStatus(
      process.env.DATAREQUEST_ID as string,
    );
    expect(dataRequestStatus).toEqual('EXPIRED');
  });

  it('get data requests', async () => {
    const { dataRequests } = await api.request.getDataRequests({
      dataTemplateIds: [process.env.DATAREQUEST_TEMPLATE_ID as string],
    });

    expect(dataRequests.length).toBeGreaterThanOrEqual(0);
  }, 8000);

  it('get requests received', async () => {
    const { requestsReceived } = await api.request.getRequestsReceived();

    expect(requestsReceived.length).toBeGreaterThanOrEqual(0);
  }, 8000);

  it('get requests received count', async () => {
    const { requestsReceivedCount } =
      await api.request.getRequestsReceivedCount();

    expect(requestsReceivedCount).toBeGreaterThanOrEqual(0);
  });

  it('get requests sent', async () => {
    const { requestsSent } = await api.request.getRequestsSent();
    expect(requestsSent.length).toBeGreaterThanOrEqual(0);
  }, 8000);

  it('get requests sent count', async () => {
    const { requestsSentCount } = await api.request.getRequestsSentCount();

    expect(requestsSentCount).toBeGreaterThanOrEqual(0);
  });
});
