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

    const pdaId = await dataAsset.createClaimBasedDataAsset({ name: 'test' });

    expect(pdaId).toBeDefined();
    expect(mockPost).toHaveBeenCalledWith(routes.CreateANewDataAsset, {
      body: { name: 'test' },
    });
  });

  it('should throw GTWError for create claim based data asset', async () => {
    mockPost.mockResolvedValue(errorMessage());

    await expect(
      dataAsset.createClaimBasedDataAsset({ name: 'test' }),
    ).rejects.toThrow(GTWError);
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
    const id = await dataAsset.createFileBasedDataAsset(fileName, fileBuffer);

    expect(mockValidateFileName).toHaveBeenCalledWith(fileName);
    expect(mockPost).toHaveBeenCalledWith('/data-assets', {
      body: {},
      bodySerializer: expect.any(Function),
    });

    expect(id).toEqual(ID);
  });

  it('should throw GTWError on failure for create file data asset', async () => {
    mockPost.mockResolvedValue(errorMessage());

    const fileName = 'test.txt';
    const fileBuffer = Buffer.from('test content');

    await expect(
      dataAsset.createFileBasedDataAsset(fileName, fileBuffer),
    ).rejects.toThrow(GTWError);

    expect(mockValidateFileName).toHaveBeenCalledWith(fileName);
    expect(mockPost).toHaveBeenCalledWith('/data-assets', {
      body: {},
      bodySerializer: expect.any(Function),
    });
  });

  it('should get my data assets', async () => {
    mockGet.mockResolvedValue(
      successMessage({
        data: { data: [dataAssetStub()], meta: metaStub(), links: linksStub() },
      }),
    );

    const data = await dataAsset.getMyDataAssets();

    expect(data).toBeDefined();
    expect(data.data.length).toBeGreaterThan(0);
    expect(mockGet).toHaveBeenCalledWith(routes.GetMyDataAssets, paramsStub());
  });

  it('should throw GTWError for get my data assets', async () => {
    mockGet.mockResolvedValue(errorMessage());

    await expect(dataAsset.getMyDataAssets()).rejects.toThrow(GTWError);

    expect(mockGet).toHaveBeenCalledWith(routes.GetMyDataAssets, paramsStub());
  });

  it('should get data asset by id', async () => {
    mockGet.mockResolvedValue(
      successMessage({
        data: dataAssetStub(),
      }),
    );

    const data = await dataAsset.getDataAssetById(ID);

    expect(data).toBeDefined();
    expect(mockGet).toHaveBeenCalledWith(
      routes.GetDataAssetByID,
      paramsStub({ params: { path: { id: 1 } } }),
    );
  });

  it('should throw GTWError for get data asset by id', async () => {
    mockGet.mockResolvedValue(errorMessage());

    await expect(dataAsset.getDataAssetById(ID)).rejects.toThrow(GTWError);

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
    const result = await dataAsset.updateClaimBasedDataAsset(
      ID,
      claimDataAssetBody,
    );

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
      dataAsset.updateClaimBasedDataAsset(id, claimDataAssetBody),
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

    const result = await dataAsset.updateFileBasedDataAsset(
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

  it('should throw GTWError on failure', async () => {
    const id = 1;
    const fileName = 'test.txt';
    const fileBuffer = Buffer.from('test content');

    mockPut.mockResolvedValueOnce(errorMessage());

    await expect(
      dataAsset.updateFileBasedDataAsset(id, fileName, fileBuffer),
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

    const deleteDataAsset = await dataAsset.deleteDataAsset(ID);

    expect(deleteDataAsset).toBeDefined();
    expect(mockDelete).toHaveBeenCalledWith(
      routes.DeleteDataAssetByID,
      paramsStub({ params: { path: { id: 1 } } }),
    );
  });

  it('should throw GTWError for delete data asset by id', async () => {
    mockDelete.mockResolvedValue(errorMessage());

    await expect(dataAsset.deleteDataAsset(ID)).rejects.toThrow(GTWError);
    expect(mockDelete).toHaveBeenCalledWith(
      routes.DeleteDataAssetByID,
      paramsStub({ params: { path: { id: 1 } } }),
    );
  });

  it('should update acl', async () => {
    mockPut.mockResolvedValue(successMessage({ data: aclStub() }));

    const aclList = await dataAsset.updateACL(ID, [aclListStub()]);

    expect(aclList).toBeDefined();
    expect(mockPut).toHaveBeenCalledWith(routes.UpdateACLItemsToDataAsset, {
      body: bodyStub({ body: [aclListStub()] }).body,
      params: paramsStub({ params: { path: { id: 1 } } }).params,
    });
  });

  it('should throw GTWError for updating acl', async () => {
    mockPut.mockResolvedValue(errorMessage());

    await expect(dataAsset.updateACL(ID, [aclListStub()])).rejects.toThrow(
      GTWError,
    );
    expect(mockPut).toHaveBeenCalledWith(routes.UpdateACLItemsToDataAsset, {
      body: bodyStub({ body: [aclListStub()] }).body,
      params: paramsStub({ params: { path: { id: 1 } } }).params,
    });
  });

  it('should override acl', async () => {
    mockPost.mockResolvedValue(successMessage({ data: aclStub() }));

    const aclList = await dataAsset.overrideACL(ID, [aclListStub()]);

    expect(aclList).toBeDefined();
    expect(mockPost).toHaveBeenCalledWith(routes.AssignACLItemsToDataAsset, {
      body: bodyStub({ body: [aclListStub()] }).body,
      params: paramsStub({ params: { path: { id: 1 } } }).params,
    });
  });

  it('should throw GTWError for override acl', async () => {
    mockPost.mockResolvedValue(errorMessage());

    await expect(dataAsset.overrideACL(ID, [aclListStub()])).rejects.toThrow(
      GTWError,
    );
    expect(mockPost).toHaveBeenCalledWith(routes.AssignACLItemsToDataAsset, {
      body: bodyStub({ body: [aclListStub()] }).body,
      params: paramsStub({ params: { path: { id: 1 } } }).params,
    });
  });

  it('should delete acl', async () => {
    mockDelete.mockResolvedValue(successMessage());

    const message = await dataAsset.deleteACL(ID, [ID]);

    expect(message).toBeDefined();
    expect(mockDelete).toHaveBeenCalledWith(routes.DeleteAssignedRoleByACL, {
      params: paramsStub({
        params: { query: { acl_ids: [1] }, path: { id: 1 } },
      }).params,
    });
  });

  it('should throw GTWError for updating acl', async () => {
    mockDelete.mockResolvedValue(errorMessage());

    await expect(dataAsset.deleteACL(ID, [ID])).rejects.toThrow(GTWError);
    expect(mockDelete).toHaveBeenCalledWith(routes.DeleteAssignedRoleByACL, {
      params: paramsStub({
        params: { query: { acl_ids: [1] }, path: { id: 1 } },
      }).params,
    });
  });

  it('should share data asset', async () => {
    mockPost.mockResolvedValue(successMessage({ data: aclStub() }));

    const aclList = await dataAsset.shareDataAsset(ID, ['']);

    expect(aclList).toBeDefined();
    expect(mockPost).toHaveBeenCalled();
  });

  it('should throw GTWError for sharing data asset', async () => {
    mockPost.mockResolvedValue(errorMessage());

    await expect(dataAsset.shareDataAsset(ID, [''])).rejects.toThrow(GTWError);
    expect(mockPost).toHaveBeenCalled();
  });

  it('should download file based data asset', async () => {
    mockGet.mockResolvedValue(
      successMessage({ data: { fileName: 'test.txt', file: blobStub } }),
    );

    const file = await dataAsset.downloadDataAsset(ID);

    expect(file).toBeDefined();
    expect(mockGet).toHaveBeenCalled();
  });

  it('should throw GTWError for downloading file based data asset', async () => {
    mockGet.mockResolvedValue(errorMessage());

    await expect(dataAsset.downloadDataAsset(ID)).rejects.toThrow(GTWError);
    expect(mockGet).toHaveBeenCalled();
  });
});
