import { Request } from '../src/request/request';
import { requestStub } from '../test/stubs/request.stub';

export const RequestMockService = (request: Request) => ({
  createDataRequestMock: jest
    .spyOn(request.sdk, 'createDataRequest_mutation')
    .mockResolvedValue({
      createDataRequest: requestStub(),
    }),

  getDataRequestMock: jest
    .spyOn(request.sdk, 'dataRequest_query')
    .mockResolvedValue({
      dataRequest: requestStub(),
    }),

  getDataRequestCountMock: jest
    .spyOn(request.sdk, 'dataRequestCount_query')
    .mockResolvedValue({
      dataRequestCount: 10,
    }),

  getDataRequestStatusMock: jest
    .spyOn(request.sdk, 'dataRequestStatus_query')
    .mockResolvedValue({
      dataRequestStatus: requestStub().status,
    }),

  getDataRequestsMock: jest
    .spyOn(request.sdk, 'dataRequests_query')
    .mockResolvedValue({
      dataRequests: [requestStub()],
    }),

  getRequestsReceivedMock: jest
    .spyOn(request.sdk, 'requestsReceived_query')
    .mockResolvedValue({
      requestsReceived: [requestStub()],
    }),

  getRequestReceivedCountMock: jest
    .spyOn(request.sdk, 'requestsReceivedCount_query')
    .mockResolvedValue({
      requestsReceivedCount: 10,
    }),

  getRequestsSentMock: jest
    .spyOn(request.sdk, 'requestsSent_query')
    .mockResolvedValue({
      requestsSent: [requestStub()],
    }),

  getRequestsSentCountMock: jest
    .spyOn(request.sdk, 'requestsSentCount_query')
    .mockResolvedValue({ requestsSentCount: 10 }),
});
