import createClient from 'openapi-fetch';

import { ACL } from '../src/modules/data-asset/acl';
import { ValidationService } from '../src/services/validator-service';
import {
  bodyStub,
  errorMessage,
  ID,
  mockClient,
  mockPatch,
  mockPost,
  paramsStub,
  successMessage,
} from './stubs/common.stub';
import { routes } from '../src/common/routes';
import { GTWError } from '../src/helpers/custom-error';
import { aclStub, aclListStub } from './stubs/data-asset.stub';

jest.mock('openapi-fetch');

let acl: ACL;
let validationService: ValidationService;

beforeAll(() => {
  (createClient as jest.Mock).mockReturnValue(mockClient);

  validationService = new ValidationService();
  acl = new ACL(mockClient, validationService);
});

afterAll(() => {
  jest.resetAllMocks();
});

describe('ACL TESTS', () => {
  it('should update acl', async () => {
    mockPatch.mockResolvedValue(successMessage({ data: aclStub() }));

    const aclList = await acl.update(ID, [aclListStub()]);

    expect(aclList).toBeDefined();
    expect(mockPatch).toHaveBeenCalledWith(routes.UpdateACLItemsToDataAsset, {
      body: bodyStub({ body: [aclListStub()] }).body,
      params: paramsStub({ params: { path: { id: 1 } } }).params,
    });
  });

  it('should throw GTWError for updating acl', async () => {
    mockPatch.mockResolvedValue(errorMessage());

    await expect(acl.update(ID, [aclListStub()])).rejects.toThrow(GTWError);
    expect(mockPatch).toHaveBeenCalledWith(routes.UpdateACLItemsToDataAsset, {
      body: bodyStub({ body: [aclListStub()] }).body,
      params: paramsStub({ params: { path: { id: 1 } } }).params,
    });
  });

  it('should override acl', async () => {
    mockPost.mockResolvedValue(successMessage({ data: aclStub() }));

    const aclList = await acl.add(ID, [aclListStub()]);

    expect(aclList).toBeDefined();
    expect(mockPost).toHaveBeenCalledWith(routes.AssignACLItemsToDataAsset, {
      body: bodyStub({ body: [aclListStub()] }).body,
      params: paramsStub({ params: { path: { id: 1 } } }).params,
    });
  });

  it('should throw GTWError for override acl', async () => {
    mockPost.mockResolvedValue(errorMessage());

    await expect(acl.add(ID, [aclListStub()])).rejects.toThrow(GTWError);
    expect(mockPost).toHaveBeenCalledWith(routes.AssignACLItemsToDataAsset, {
      body: bodyStub({ body: [aclListStub()] }).body,
      params: paramsStub({ params: { path: { id: 1 } } }).params,
    });
  });

  it('should delete acl', async () => {
    mockPatch.mockResolvedValue(successMessage());

    const message = await acl.delete(ID, [aclListStub()]);

    expect(message).toBeDefined();
    expect(mockPatch).toHaveBeenCalledWith(routes.DeleteAssignedRoleByACL, {
      params: paramsStub({
        params: { path: { id: 1 } },
      }).params,
      body: bodyStub({ body: [aclListStub()] }).body,
    });
  });

  it('should throw GTWError for updating acl', async () => {
    mockPatch.mockResolvedValue(errorMessage());

    await expect(acl.delete(ID, [aclListStub()])).rejects.toThrow(GTWError);
    expect(mockPatch).toHaveBeenCalledWith(routes.DeleteAssignedRoleByACL, {
      params: paramsStub({
        params: { path: { id: 1 } },
      }).params,
      body: bodyStub({ body: [aclListStub()] }).body,
    });
  });
});
