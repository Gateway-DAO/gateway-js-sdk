import { paths } from '../src/api';

import { DataModel } from '../src/modules/data-model/data-model';
import { OpenAPIClient } from '../src/common/types';
import { MediaType } from 'openapi-typescript-helpers';
import createClient from 'openapi-fetch';
import { ValidationService } from '../src/services/validator-service';

let dataModel: DataModel;
let mockClient: OpenAPIClient<paths, MediaType>;
jest.mock('openapi-fetch');
jest.mock('../src/services/validator-service');
let mockGet: jest.Mock;

beforeAll(() => {
  let validationService: ValidationService;
  let config: any;
  mockGet = jest.fn();
  mockClient = {
    GET: mockGet,
  } as any as OpenAPIClient<paths, MediaType>;

  validationService = new ValidationService();
  config = {};

  (createClient as jest.Mock).mockReturnValue(mockClient);
  dataModel = new DataModel(mockClient, validationService, config);
});

afterAll(() => {
  jest.resetAllMocks();
});
