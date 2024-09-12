import createClient from 'openapi-fetch';
import {
  errorMessage,
  ID,
  linksStub,
  metaStub,
  mockClient,
  mockDelete,
  mockGet,
  mockPost,
  mockPut,
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

jest.mock('openapi-fetch');

let dataAsset: DataAsset;
let validationService: ValidationService;

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

    const pdaId = await dataAsset.createClaimBasedDataAsset();

    expect(pdaId).toBeDefined();
    expect(mockPost).toHaveBeenCalled();
  });

  it('should throw GTWError for create claim based data asset', async () => {
    mockPost.mockResolvedValue(errorMessage());

    await expect(dataAsset.createClaimBasedDataAsset()).rejects.toThrow(
      GTWError,
    );
    expect(mockPost).toHaveBeenCalled();
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
    expect(mockGet).toHaveBeenCalled();
  });

  it('should throw GTWError for get my data assets', async () => {
    mockGet.mockResolvedValue(errorMessage());

    await expect(dataAsset.getMyDataAssets()).rejects.toThrow(GTWError);

    expect(mockGet).toHaveBeenCalled();
  });

  it('should get data asset by id', async () => {
    mockGet.mockResolvedValue(
      successMessage({
        data: dataAssetStub(),
      }),
    );

    const data = await dataAsset.getDataAssetById(ID);

    expect(data).toBeDefined();
    expect(mockGet).toHaveBeenCalled();
  });

  it('should throw GTWError for get data asset by id', async () => {
    mockGet.mockResolvedValue(errorMessage());

    await expect(dataAsset.getDataAssetById(ID)).rejects.toThrow(GTWError);

    expect(mockGet).toHaveBeenCalled();
  });

  it('should update data asset', async () => {
    mockPut.mockResolvedValue(successMessage({ data: dataAssetStub() }));

    const updatedDataAsset = await dataAsset.updateDataAsset(ID);

    expect(updatedDataAsset).toBeDefined();
    expect(mockPut).toHaveBeenCalled();
  });

  it('should throw GTWError for update data asset', async () => {
    mockPut.mockResolvedValue(errorMessage());

    await expect(dataAsset.updateDataAsset(ID)).rejects.toThrow(GTWError);
    expect(mockPut).toHaveBeenCalled();
  });

  it('should delete data asset by id', async () => {
    mockDelete.mockResolvedValue(successMessage());

    const deleteDataAsset = await dataAsset.deleteDataAsset(ID);

    expect(deleteDataAsset).toBeDefined();
    expect(mockDelete).toHaveBeenCalled();
  });

  it('should throw GTWError for delete data asset by id', async () => {
    mockDelete.mockResolvedValue(errorMessage());

    await expect(dataAsset.deleteDataAsset(ID)).rejects.toThrow(GTWError);
    expect(mockDelete).toHaveBeenCalled();
  });

  it('should update acl', async () => {
    mockPut.mockResolvedValue(successMessage({ data: aclStub() }));

    const aclList = await dataAsset.updateACL(ID, [aclListStub()]);

    expect(aclList).toBeDefined();
    expect(mockPut).toHaveBeenCalled();
  });

  it('should throw GTWError for updating acl', async () => {
    mockPut.mockResolvedValue(errorMessage());

    await expect(dataAsset.updateACL(ID, [aclListStub()])).rejects.toThrow(
      GTWError,
    );
    expect(mockPut).toHaveBeenCalled();
  });

  it('should override acl', async () => {
    mockPost.mockResolvedValue(successMessage({ data: aclStub() }));

    const aclList = await dataAsset.overrideACL(ID, [aclListStub()]);

    expect(aclList).toBeDefined();
    expect(mockPost).toHaveBeenCalled();
  });

  it('should throw GTWError for override acl', async () => {
    mockPost.mockResolvedValue(errorMessage());

    await expect(dataAsset.overrideACL(ID, [aclListStub()])).rejects.toThrow(
      GTWError,
    );
    expect(mockPost).toHaveBeenCalled();
  });

  it('should delete acl', async () => {
    mockDelete.mockResolvedValue(successMessage());

    const message = await dataAsset.deleteACL(ID, [aclListStub()]);

    expect(message).toBeDefined();
    expect(mockDelete).toHaveBeenCalled();
  });

  it('should throw GTWError for updating acl', async () => {
    mockDelete.mockResolvedValue(errorMessage());

    await expect(dataAsset.deleteACL(ID, [aclListStub()])).rejects.toThrow(
      GTWError,
    );
    expect(mockDelete).toHaveBeenCalled();
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
