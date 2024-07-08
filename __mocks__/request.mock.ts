import { Sdk } from '../gatewaySdk/sources/Gateway';
import { requestStub } from '../test/stubs/request.stub';

export const RequestMockService = (sdk: Sdk) => ({
  createDataRequestMock: jest
    .spyOn(sdk, 'createDataRequestMutation')
    .mockResolvedValue({
      createDataRequest: requestStub(),
    }),
  updateDataRequestMock: jest
    .spyOn(sdk, 'updateDataRequestMutation')
    .mockResolvedValue({
      updateDataRequest: requestStub(),
    }),
  getDataRequestMock: jest.spyOn(sdk, 'dataRequestQuery').mockResolvedValue({
    dataRequest: requestStub(),
  }),
  getDataRequestCountMock: jest
    .spyOn(sdk, 'dataRequestCountQuery')
    .mockResolvedValue({
      dataRequestCount: 10,
    }),
  getDataRequestStatusMock: jest
    .spyOn(sdk, 'dataRequestStatusQuery')
    .mockResolvedValue({
      dataRequestStatus: requestStub().status,
    }),
  getDataRequestsMock: jest.spyOn(sdk, 'dataRequestsQuery').mockResolvedValue({
    dataRequests: [requestStub()],
  }),
  getRequestsReceivedMock: jest
    .spyOn(sdk, 'requestsReceivedQuery')
    .mockResolvedValue({
      requestsReceived: [requestStub()],
    }),
  getRequestReceivedCountMock: jest
    .spyOn(sdk, 'requestsReceivedCountQuery')
    .mockResolvedValue({
      requestsReceivedCount: 10,
    }),

  getRequestsSentMock: jest.spyOn(sdk, 'requestsSentQuery').mockResolvedValue({
    requestsSent: [requestStub()],
  }),

  getRequestsSentCountMock: jest
    .spyOn(sdk, 'requestsSentCountQuery')
    .mockResolvedValue({ requestsSentCount: 10 }),
});
