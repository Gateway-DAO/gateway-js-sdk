import { Request } from '../src/request/request';
import { getMeshSDK } from '../.mesh';
import { RequestMockService } from '../__mocks__/request.mock';
import { requestStub } from './stubs/request.stub';

let request: Request;

beforeAll(() => {
  request = new Request(getMeshSDK());
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
});
