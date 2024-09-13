import { ValidationService } from '../src/services/validator-service';
import { GTWError } from '../src/helpers/custom-error';
import { DataModel } from '../src/modules/data-model/data-model';
import { Config } from '../src/common/types';
import { mockClient, mockGet } from './stubs/common.stub';
import { routes } from '../src/common/routes';

const mockValidationService = {} as ValidationService;
const mockConfig = {} as Config;

describe('DataModel', () => {
  let dataModel: DataModel;

  beforeEach(() => {
    jest.clearAllMocks();
    dataModel = new DataModel(mockClient, mockValidationService, mockConfig);
  });

  describe('getDataModels', () => {
    it('should fetch data models successfully', async () => {
      const mockResponse = {
        data: [{ id: 1, name: 'Model1' }],
        total: 1,
        page: 1,
        pageSize: 10,
      };
      mockGet.mockResolvedValue({
        data: mockResponse,
        error: null,
        response: {} as Response,
      });

      const result = await dataModel.getDataModels();

      expect(result).toEqual(mockResponse);
      expect(mockClient.GET).toHaveBeenCalledWith(routes.GetDataModels, {
        params: { query: { page: 1, page_size: 10 } },
      });
    });

    it('should throw GTWError on API error', async () => {
      const mockError = { error: 'API Error' };
      const mockResponse = { status: 400 } as Response;
      mockGet.mockResolvedValue({
        data: null,
        error: mockError,
        response: mockResponse,
      });

      await expect(dataModel.getDataModels()).rejects.toThrow(GTWError);
      await expect(dataModel.getDataModels()).rejects.toHaveProperty(
        'statusCode',
        400,
      );
      await expect(dataModel.getDataModels()).rejects.toHaveProperty(
        'message',
        'API Error',
      );
    });
  });

  describe('getDataModelById', () => {
    it('should fetch a data model by id successfully', async () => {
      const mockResponse = { id: 1, name: 'Model1' };
      mockGet.mockResolvedValue({
        data: mockResponse,
        error: null,
        response: {} as Response,
      });

      const result = await dataModel.getDataModelById(1);

      expect(result).toEqual(mockResponse);
      expect(mockClient.GET).toHaveBeenCalledWith(routes.GetDataModelByID, {
        params: { path: { id: 1 } },
      });
    });

    it('should throw GTWError on API error', async () => {
      const mockError = { error: 'Not Found' };
      const mockResponse = { status: 404 } as Response;
      mockGet.mockResolvedValue({
        data: null,
        error: mockError,
        response: mockResponse,
      });

      await expect(dataModel.getDataModelById(1)).rejects.toThrow(GTWError);
      await expect(dataModel.getDataModelById(1)).rejects.toHaveProperty(
        'statusCode',
        404,
      );
      await expect(dataModel.getDataModelById(1)).rejects.toHaveProperty(
        'message',
        'Not Found',
      );
    });
  });

  describe('getMyDataModels', () => {
    it('should fetch user-specific data models successfully', async () => {
      const mockResponse = {
        data: [{ id: 1, name: 'MyModel1' }],
        total: 1,
        page: 1,
        pageSize: 10,
      };
      mockGet.mockResolvedValue({
        data: mockResponse,
        error: null,
        response: {} as Response,
      });

      const result = await dataModel.getMyDataModels();

      expect(result).toEqual(mockResponse);
      expect(mockClient.GET).toHaveBeenCalledWith(routes.GetDataModelsByUser, {
        params: { query: { page: 1, page_size: 10 } },
      });
    });

    it('should throw GTWError on API error', async () => {
      const mockError = { error: 'Unauthorized' };
      const mockResponse = { status: 401 } as Response;
      mockGet.mockResolvedValue({
        data: null,
        error: mockError,
        response: mockResponse,
      });

      await expect(dataModel.getMyDataModels()).rejects.toThrow(GTWError);
      await expect(dataModel.getMyDataModels()).rejects.toHaveProperty(
        'statusCode',
        401,
      );
      await expect(dataModel.getMyDataModels()).rejects.toHaveProperty(
        'message',
        'Unauthorized',
      );
    });
  });
});
