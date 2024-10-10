import createClient from 'openapi-fetch';
import {
  bodyStub,
  errorMessage,
  ID,
  linksStub,
  metaStub,
  mockClient,
  mockDelete,
  mockGet,
  mockPatch,
  mockPost,
  mockPut,
  paramsStub,
  successMessage,
} from './stubs/common.stub';
import { DataAsset } from '../src/modules/data-asset/data-asset';
import { ValidationService } from '../src/services/validator-service';
import { GTWError } from '../src/helpers/custom-error';
import {
  aclListStub,
  aclStub,
  blobStub,
  dataAssetStub,
} from './stubs/data-asset.stub';
import { routes } from '../src/common/routes';
import { toRFC3339 } from '../src/helpers/helper';
import { AccessLevel } from '../src/common/types';

jest.mock('openapi-fetch');

let dataAsset: DataAsset;
let validationService: ValidationService;
let mockValidateFileName: jest.SpyInstance;

beforeAll(() => {
  (createClient as jest.Mock).mockReturnValue(mockClient);

  validationService = new ValidationService();
  dataAsset = new DataAsset(mockClient, validationService);
});

afterAll(() => {
  jest.resetAllMocks();
});

describe('Data Assets Test', () => {
  it('should create claim based data asset', async () => {
    mockPost.mockResolvedValue(successMessage({ data: { id: ID } }));

    const pdaId = await dataAsset.upload({ name: 'test' });

    expect(pdaId).toBeDefined();
    expect(mockPost).toHaveBeenCalledWith(routes.CreateANewDataAsset, {
      body: { name: 'test' },
    });
  });

  it('should throw GTWError for create claim based data asset', async () => {
    mockPost.mockResolvedValue(errorMessage());

    await expect(dataAsset.upload({ name: 'test' })).rejects.toThrow(
      GTWError,
    );
    expect(mockPost).toHaveBeenCalledWith(routes.CreateANewDataAsset, {
      body: { name: 'test' },
    });
  });

  it('should create a file-based data asset successfully', async () => {
    mockPost.mockResolvedValue(successMessage({ data: { id: ID } }));
    const fileName = 'test.txt';
    const fileBuffer = Buffer.from('test content');
    mockValidateFileName = jest
      .spyOn(validationService, 'validateFileName')
      .mockReturnValue({
        name: 'test-file',
        extension: 'text/plain',
      });
    const id = await dataAsset.uploadFile(fileName, fileBuffer);

    expect(mockValidateFileName).toHaveBeenCalledWith(fileName);
    expect(mockPost).toHaveBeenCalledWith('/data-assets', {
      body: {},
      bodySerializer: expect.any(Function),
    });

    expect(id).toEqual(ID);
  });

  it('should create a file-based data asset with ACL and expiration date', async () => {
    mockPost.mockResolvedValue(successMessage({ data: { id: ID } }));

    const fileName = 'test.txt';
    const fileBuffer = Buffer.from('test content');
    const mockACL = [{ address: '', roles: [AccessLevel.VIEW] }];
    const mockExpirationDate = new Date('2024-10-01');

    mockValidateFileName = jest
      .spyOn(validationService, 'validateFileName')
      .mockReturnValue({
        name: 'test-file',
        extension: 'text/plain',
      });

    const id = await dataAsset.uploadFile(
      fileName,
      fileBuffer,
      mockACL,
      mockExpirationDate,
    );

    expect(mockValidateFileName).toHaveBeenCalledWith(fileName);
    expect(mockPost).toHaveBeenCalledWith('/data-assets', {
      body: {},
      bodySerializer: expect.any(Function),
    });

    const formData = new FormData();
    formData.append(
      'data',
      new Blob([fileBuffer], { type: 'text/plain' }),
      fileName,
    );
    formData.append('acl', JSON.stringify(mockACL));
    formData.append('expiration_date', toRFC3339(mockExpirationDate));

    expect(id).toEqual(ID);
  });

  it('should throw GTWError on failure for create file data asset', async () => {
    mockPost.mockResolvedValue(errorMessage());

    const fileName = 'test.txt';
    const fileBuffer = Buffer.from('test content');

    await expect(dataAsset.uploadFile(fileName, fileBuffer)).rejects.toThrow(
      GTWError,
    );

    expect(mockValidateFileName).toHaveBeenCalledWith(fileName);
    expect(mockPost).toHaveBeenCalledWith('/data-assets', {
      body: {},
      bodySerializer: expect.any(Function),
    });
  });

  it('should data assets created by me', async () => {
    mockGet.mockResolvedValue(
      successMessage({
        data: { data: [dataAssetStub()], meta: metaStub(), links: linksStub() },
      }),
    );

    const data = await dataAsset.getCreatedByMe();

    expect(data).toBeDefined();
    expect(data.data.length).toBeGreaterThan(0);
    expect(mockGet).toHaveBeenCalledWith(
      routes.GetCreatedDataAssets,
      paramsStub(),
    );
  });

  it('should throw GTWError for data assets created by me', async () => {
    mockGet.mockResolvedValue(errorMessage());

    await expect(dataAsset.getCreatedByMe()).rejects.toThrow(GTWError);

    expect(mockGet).toHaveBeenCalledWith(
      routes.GetCreatedDataAssets,
      paramsStub(),
    );
  });

  it('should data assets received by me', async () => {
    mockGet.mockResolvedValue(
      successMessage({
        data: { data: [dataAssetStub()], meta: metaStub(), links: linksStub() },
      }),
    );

    const data = await dataAsset.getReceivedByMe();

    expect(data).toBeDefined();
    expect(data.data.length).toBeGreaterThan(0);
    expect(mockGet).toHaveBeenCalledWith(
      routes.GetReceivedDataAssets,
      paramsStub(),
    );
  });

  it('should throw GTWError for data assets received by me', async () => {
    mockGet.mockResolvedValue(errorMessage());

    await expect(dataAsset.getReceivedByMe()).rejects.toThrow(GTWError);

    expect(mockGet).toHaveBeenCalledWith(
      routes.GetReceivedDataAssets,
      paramsStub(),
    );
  });

  it('should get data asset by id', async () => {
    mockGet.mockResolvedValue(
      successMessage({
        data: dataAssetStub(),
      }),
    );

    const data = await dataAsset.get(ID);

    expect(data).toBeDefined();
    expect(mockGet).toHaveBeenCalledWith(
      routes.GetDataAssetByID,
      paramsStub({ params: { path: { id: 1 } } }),
    );
  });

  it('should throw GTWError for get data asset by id', async () => {
    mockGet.mockResolvedValue(errorMessage());

    await expect(dataAsset.get(ID)).rejects.toThrow(GTWError);

    expect(mockGet).toHaveBeenCalledWith(
      routes.GetDataAssetByID,
      paramsStub({ params: { path: { id: 1 } } }),
    );
  });

  it('should update a claim-based data asset successfully', async () => {
    const claimDataAssetBody = { name: 'Updated Data Asset' };
    mockPut.mockResolvedValue(
      successMessage({ data: { id: ID, name: 'Updated Data Asset' } }),
    );
    const result = await dataAsset.update(ID, claimDataAssetBody);

    expect(mockPut).toHaveBeenCalledWith('/data-assets/{id}', {
      params: { path: { id: ID } },
      body: claimDataAssetBody,
    });

    expect(result).toEqual({ id: ID, name: 'Updated Data Asset' });
  });

  it('should throw GTWError on failure for update claim based data asset', async () => {
    const id = 1;
    const claimDataAssetBody = { name: 'Updated Data Asset' };

    mockPut.mockResolvedValueOnce(errorMessage());

    await expect(
      dataAsset.update(id, claimDataAssetBody),
    ).rejects.toThrow(GTWError);

    expect(mockPut).toHaveBeenCalledWith('/data-assets/{id}', {
      params: { path: { id } },
      body: claimDataAssetBody,
    });
  });

  it('should update a file-based data asset successfully', async () => {
    const id = 1;
    const fileName = 'test.txt';
    const fileBuffer = Buffer.from('test content');

    const result = await dataAsset.updateFile(
      id,
      fileName,
      fileBuffer,
    );

    expect(mockValidateFileName).toHaveBeenCalledWith(fileName);

    expect(mockPut).toHaveBeenCalledWith('/data-assets/{id}', {
      params: { path: { id } },
      body: {},
      bodySerializer: expect.any(Function),
    });

    expect(result).toEqual({ id: ID, name: 'Updated Data Asset' });
  });

  it('should update a file-based data asset with ACL and expiration date', async () => {
    const id = 1;
    const fileName = 'test.txt';
    const fileBuffer = Buffer.from('test content');
    const mockACL = [{ address: '', roles: [AccessLevel.VIEW] }];
    const mockExpirationDate = new Date('2024-10-01');

    mockValidateFileName = jest
      .spyOn(validationService, 'validateFileName')
      .mockReturnValue({
        name: 'test-file',
        extension: 'text/plain',
      });

    mockPut.mockResolvedValue(successMessage());

    const result = await dataAsset.updateFile(
      id,
      fileName,
      fileBuffer,
      mockACL,
      mockExpirationDate,
    );

    expect(mockValidateFileName).toHaveBeenCalledWith(fileName);
    expect(mockPut).toHaveBeenCalledWith('/data-assets/{id}', {
      params: { path: { id } },
      body: {},
      bodySerializer: expect.any(Function),
    });

    const formData = new FormData();
    formData.append(
      'data',
      new Blob([fileBuffer], { type: 'text/plain' }),
      fileName,
    );
    formData.append('acl', JSON.stringify(mockACL));
    formData.append('expiration_date', toRFC3339(mockExpirationDate));

    expect(result).toBeDefined();
  });

  it('should throw GTWError on failure', async () => {
    const id = 1;
    const fileName = 'test.txt';
    const fileBuffer = Buffer.from('test content');

    mockPut.mockResolvedValueOnce(errorMessage());

    await expect(
      dataAsset.updateFile(id, fileName, fileBuffer),
    ).rejects.toThrow(GTWError);

    expect(mockValidateFileName).toHaveBeenCalledWith(fileName);

    expect(mockPut).toHaveBeenCalledWith('/data-assets/{id}', {
      params: { path: { id } },
      body: {},
      bodySerializer: expect.any(Function),
    });
  });

  it('should delete data asset by id', async () => {
    mockDelete.mockResolvedValue(successMessage());

    const deleteDataAsset = await dataAsset.delete(ID);

    expect(deleteDataAsset).toBeDefined();
    expect(mockDelete).toHaveBeenCalledWith(
      routes.DeleteDataAssetByID,
      paramsStub({ params: { path: { id: 1 } } }),
    );
  });

  it('should throw GTWError for delete data asset by id', async () => {
    mockDelete.mockResolvedValue(errorMessage());

    await expect(dataAsset.delete(ID)).rejects.toThrow(GTWError);
    expect(mockDelete).toHaveBeenCalledWith(
      routes.DeleteDataAssetByID,
      paramsStub({ params: { path: { id: 1 } } }),
    );
  });

  it('should share data asset', async () => {
    mockPost.mockResolvedValue(successMessage({ data: aclStub() }));

    const aclList = await dataAsset.share(ID, ['']);

    expect(aclList).toBeDefined();
    expect(mockPost).toHaveBeenCalled();
  });

  it('should throw GTWError for sharing data asset', async () => {
    mockPost.mockResolvedValue(errorMessage());

    await expect(dataAsset.share(ID, [''])).rejects.toThrow(GTWError);
    expect(mockPost).toHaveBeenCalled();
  });

  it('should download file based data asset', async () => {
    mockGet.mockResolvedValue(
      successMessage({ data: { fileName: 'test.txt', file: blobStub } }),
    );

    const file = await dataAsset.download(ID);

    expect(file).toBeDefined();
    expect(mockGet).toHaveBeenCalled();
  });

  it('should throw GTWError for downloading file based data asset', async () => {
    mockGet.mockResolvedValue(errorMessage());

    await expect(dataAsset.download(ID)).rejects.toThrow(GTWError);
    expect(mockGet).toHaveBeenCalled();
  });
});
