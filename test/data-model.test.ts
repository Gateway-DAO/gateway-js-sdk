import { ValidationService } from '../src/services/validator-service';
import { GTWError } from '../src/helpers/custom-error';
import { DataModel } from '../src/modules/data-model/data-model';
import { Config, DataModelRequest } from '../src/common/types';
import { mockClient, mockGet, mockPost, mockPut } from './stubs/common.stub';
import { routes } from '../src/common/routes';

const mockValidationService = {} as ValidationService;

describe('DataModel', () => {
  let dataModel: DataModel;

  beforeEach(() => {
    jest.clearAllMocks();
    dataModel = new DataModel(mockClient, mockValidationService);
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

  describe('createDataModel', () => {
    it('should create a data model successfully', async () => {
      const input: DataModelRequest = {
        title: 'Test Model',
        description: 'A test data model',
        schema: {},
        tags: ['test'],
      };

      const expectedOutput = {
        id: 1,
        ...input,
        created_at: '2023-09-13T12:00:00Z',
        updated_at: '2023-09-13T12:00:00Z',
        created_by: 'user123',
      };

      mockPost.mockResolvedValue({ data: expectedOutput, error: null });

      const result = await dataModel.createDataModel(input);

      expect(result).toEqual(expectedOutput);
      expect(mockClient.POST).toHaveBeenCalledWith(routes.CreateDataModel, {
        body: input,
      });
    });

    it('should throw GTWError when API call fails', async () => {
      const input: DataModelRequest = {
        title: 'Test Model',
        description: 'A test data model',
        schema: {},
        tags: ['test'],
      };

      const mockError = { error: 'API Error' };
      mockPost.mockResolvedValue({
        data: null,
        error: mockError,
        response: {},
      });

      await expect(dataModel.createDataModel(input)).rejects.toThrow(GTWError);
      expect(mockClient.POST).toHaveBeenCalledWith(routes.CreateDataModel, {
        body: input,
      });
    });
  });

  // describe('updateDataModel', () => {
  //   it('should update a data model successfully', async () => {
  //     const dataModelId = 1;
  //     const input: DataModelRequest = {
  //       title: 'Updated Test Model',
  //       description: 'An updated test data model',
  //       schema: {},
  //       tags: ['test', 'updated'],
  //     };

  //     const expectedOutput = {
  //       id: dataModelId,
  //       ...input,
  //       created_at: '2023-09-13T12:00:00Z',
  //       updated_at: '2023-09-13T13:00:00Z',
  //       created_by: 'user123',
  //     };

  //     mockPut.mockResolvedValue({ data: expectedOutput, error: null });

  //     const result = await dataModel.updateDataModel(dataModelId, input);

  //     expect(result).toEqual(expectedOutput);
  //     expect(mockClient.PUT).toHaveBeenCalledWith(routes.UpdateDataModel, {
  //       body: input,
  //       params: { path: { id: dataModelId } },
  //     });
  //   });

  //   it('should throw GTWError when API call fails', async () => {
  //     const dataModelId = 1;
  //     const input: DataModelRequest = {
  //       title: 'Updated Test Model',
  //       description: 'An updated test data model',
  //       schema: {},
  //       tags: ['test', 'updated'],
  //     };

  //     const mockError = { error: 'API Error' };
  //     mockPut.mockResolvedValue({
  //       data: null,
  //       error: mockError,
  //       response: {},
  //     });

  //     await expect(
  //       dataModel.updateDataModel(dataModelId, input),
  //     ).rejects.toThrow(GTWError);
  //     expect(mockClient.PUT).toHaveBeenCalledWith(routes.UpdateDataModel, {
  //       body: input,
  //       params: { path: { id: dataModelId } },
  //     });
  //   });
  // });
});
