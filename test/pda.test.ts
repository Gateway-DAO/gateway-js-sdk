import { GraphQLClient } from 'graphql-request';

import { PDA } from '../src/modules/pda/pda';
import { getSdk } from '../gatewaySdk/sources/Gateway';
import { pdaBodyData, pdaCreateStub, pdaStub } from './stubs/pda.stub';
import { PDAMockService } from '../__mocks__/pda.mock';
import { ValidationService } from '../src/services/validator-service';
import { Sdk } from '../gatewaySdk/sources/Gateway';
import { WalletService } from '../src/services/wallet-service';
import { ethers } from 'ethers';
import { PDAStatus } from '../src/common/enums';
import { invalidUUID } from './stubs/user.stub';

import MockAdapter from 'axios-mock-adapter';
import { mock, MockProxy } from 'jest-mock-extended';
import axios from 'axios';

let sdk: Sdk;
let pda: PDA;
let wallet: ethers.Wallet;
let mockGetPDA: jest.SpyInstance;
let mockAxios: MockAdapter;
let mockValidationService: MockProxy<any>;

beforeAll(() => {
  sdk = getSdk(new GraphQLClient(''));
  mockValidationService = mock<any>();
  mockAxios = new MockAdapter(axios);
  wallet = ethers.Wallet.createRandom();
  pda = new PDA(
    sdk,
    new ValidationService(),
    {
      apiKey: '',
      token: '',
      url: 'http:localhost:3000/graphql',
      walletPrivateKey: wallet.privateKey,
    },
    new WalletService({ walletPrivateKey: wallet.privateKey }),
  );
  mockGetPDA = jest.spyOn(pda, 'getPDA');
});

afterAll(() => {
  mockAxios.reset();
  jest.clearAllMocks();
});

describe('PDA SERVICE TESTING', () => {
  it('pda create', async () => {
    const { createPDAMock: createPDAMutationMock } = PDAMockService(sdk);

    const { createPDA } = await pda.createPDA(pdaCreateStub());

    expect(createPDA.id).toBe(pdaStub().id);
    expect(createPDAMutationMock).toHaveBeenCalled();
  });

  it('pda create to throw error', async () => {
    const { createPDAMock: createPDAMutationMock } = PDAMockService(sdk);

    expect(
      async () => await pda.createPDA(pdaCreateStub({ title: '' })),
    ).rejects.toThrow(' should be atleast 2 length');

    expect(createPDAMutationMock).toHaveBeenCalled();
  });

  it('pda update status', async () => {
    const { changePDAStatusMock } = PDAMockService(sdk);

    const { changePDAStatus } = await pda.changePDAStatus({
      id: pdaStub({ id: 'f47ac10b-58cc-4372-a567-0e02b2c3d479' }).id,
      status: PDAStatus.SUSPENDED,
    });

    expect(changePDAStatus.status).toEqual(PDAStatus.SUSPENDED);
    expect(changePDAStatusMock).toHaveBeenCalled();
  });

  it('pda update status to throw error', async () => {
    const { changePDAStatusMock } = PDAMockService(sdk);

    expect(
      async () =>
        await pda.changePDAStatus({
          id: pdaStub({ id: '' }).id,
          status: PDAStatus.SUSPENDED,
        }),
    ).rejects.toThrow('');

    expect(changePDAStatusMock).toHaveBeenCalled();
  });

  it('get pda', async () => {
    const { getPDAMock } = PDAMockService(sdk);

    const { PDA } = await pda.getPDA(pdaStub().id);

    expect(PDA?.id).toEqual(pdaStub().id);
    expect(getPDAMock).toHaveBeenCalled();
  });

  it('pda count', async () => {
    const { pdaCountMock } = PDAMockService(sdk);

    const count = await pda.getPDACount();

    expect(count).toBeGreaterThanOrEqual(0);
    expect(pdaCountMock).toHaveBeenCalled();
  });

  it('pda count to throw error', async () => {
    const { pdaCountMock } = PDAMockService(sdk);

    expect(
      async () =>
        await pda.getPDACount({ filter: { dataModelIds: [invalidUUID] } }),
    ).rejects.toThrow(`${invalidUUID} is not valid uuid`);

    expect(pdaCountMock).toHaveBeenCalled();
  });

  it('pdas', async () => {
    const { pdasMock } = PDAMockService(sdk);

    const { PDAs } = await pda.getPDAs({
      filter: { dataModelIds: [pdaBodyData().dataModelId] },
      skip: 0,
      take: 10,
    });

    expect(PDAs.length).toBeGreaterThanOrEqual(0);
    expect(pdasMock).toHaveBeenCalled();
  });

  it('pdas to throw error', async () => {
    const { pdasMock } = PDAMockService(sdk);

    expect(
      async () =>
        await pda.getPDAs({
          filter: { dataModelIds: [invalidUUID] },
        }),
    ).rejects.toThrow(`${invalidUUID} is not valid uuid`);

    expect(pdasMock).toHaveBeenCalled();
  });

  it('issued pdas count', async () => {
    const { issuedCountPDAMock } = PDAMockService(sdk);

    const count = await pda.getIssuedPDAsCount();

    expect(count).toBeGreaterThanOrEqual(0);
    expect(issuedCountPDAMock).toHaveBeenCalled();
  });

  it('issued pdas count to throw error', async () => {
    const { issuedCountPDAMock } = PDAMockService(sdk);

    expect(
      async () => await pda.getIssuedPDAsCount({ dataModelIds: [invalidUUID] }),
    ).rejects.toThrow(`${invalidUUID} is not valid uuid`);

    expect(issuedCountPDAMock).toHaveBeenCalled();
  });

  it('issued pdas', async () => {
    const { issuedPDAMock } = PDAMockService(sdk);

    const { issuedPDAs } = await pda.getIssuedPDAs();

    expect(issuedPDAs.length).toBeGreaterThanOrEqual(0);
    expect(issuedPDAMock).toHaveBeenCalled();
  });

  it('issued pdas to throw error', async () => {
    const { issuedPDAMock } = PDAMockService(sdk);

    expect(
      async () =>
        await pda.getIssuedPDAs({ filter: { dataModelIds: [invalidUUID] } }),
    ).rejects.toThrow(`${invalidUUID} is not valid uuid`);

    expect(issuedPDAMock).toHaveBeenCalled();
  });

  it('update pda', async () => {
    const { updatePDAMock } = PDAMockService(sdk);

    const { updatePDA } = await pda.updatePDA({
      id: pdaBodyData({ id: pdaStub().id }),
    });

    expect(updatePDA.id).toBe(pdaStub().id);
    expect(updatePDAMock).toHaveBeenCalled();
  });

  it('update pda to throw error', async () => {
    const { updatePDAMock } = PDAMockService(sdk);

    expect(
      async () =>
        await pda.updatePDA({
          id: pdaBodyData({ id: pdaStub().id }),
          title: '',
        }),
    ).rejects.toThrow('');

    expect(updatePDAMock).toHaveBeenCalled();
  });

  it('non structured pda upload file successfully', async () => {
    const file = Buffer.from('test file');
    const pdaId = 123;
    const fileName = 'test.txt';

    mockValidationService.validateFileName.mockReturnValue({
      extension: 'text/plain',
      name: 'test.txt',
    });

    mockGetPDA.mockResolvedValue({
      PDA: {
        status: PDAStatus.PENDING,
      },
    });

    mockAxios
      .onPost(
        `${'http:localhost:3000/graphql'.replace('/graphql', '')}/file/upload`,
      )
      .reply(200, { success: true });

    const result = await pda.uploadFileAsPDA(file, pdaId, fileName);

    expect(result.data.success).toBe(true);

    expect(mockGetPDA).toHaveBeenCalledWith(pdaId);
  });

  it('non structured pda should throw an error if file name is invalid', async () => {
    const file = Buffer.from('test file');
    const pdaId = 123;
    const fileName = 'invalid file name';

    mockValidationService.validateFileName.mockImplementation(() => {
      throw new Error('Invalid file name');
    });

    await expect(pda.uploadFileAsPDA(file, pdaId, fileName)).rejects.toThrow(
      'File Upload failed!',
    );
  });

  it('should throw an error if file size exceeds the limit', async () => {
    const file = Buffer.alloc(31 * 1024 * 1024); // 31 MB
    const pdaId = 123;
    const fileName = 'test.txt';

    mockValidationService.validateFileName.mockReturnValue({
      extension: 'text/plain',
      name: 'test',
    });

    await expect(pda.uploadFileAsPDA(file, pdaId, fileName)).rejects.toThrow(
      'File Upload failed!',
    );
  });

  it('should throw an error if PDA status is not PENDING', async () => {
    const file = Buffer.from('test file');
    const pdaId = 123;
    const fileName = 'test.txt';

    mockValidationService.validateFileName.mockReturnValue({
      extension: 'text/plain',
      name: 'test',
    });

    mockGetPDA.mockResolvedValue({
      PDA: {
        status: PDAStatus.VALID,
      },
    });

    await expect(pda.uploadFileAsPDA(file, pdaId, fileName)).rejects.toThrow(
      'File Upload failed!',
    );
  });

  it('should throw an error if PDA is not found', async () => {
    const file = Buffer.from('test file');
    const pdaId = 123;
    const fileName = 'test.txt';

    mockValidationService.validateFileName.mockReturnValue({
      extension: 'text/plain',
      name: 'test',
    });

    mockGetPDA.mockResolvedValue({ PDA: undefined });

    await expect(pda.uploadFileAsPDA(file, pdaId, fileName)).rejects.toThrow(
      'File Upload failed!',
    );
  });
});
