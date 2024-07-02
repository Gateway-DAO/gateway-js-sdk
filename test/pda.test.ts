import { GraphQLClient } from 'graphql-request';

import { PDAStatus } from '../src/common/enums';
import { PDA } from '../src/modules/pda/pda';
import { getSdk } from '../gatewaySdk/sources/Gateway';
import { pdaBodyData, pdaCreateStub, pdaStub } from './stubs/pda.stub';
import { PDAMockService } from '../__mocks__/pda.mock';
import { authStub } from './stubs/auth.stub';
import { invalidUUID } from './stubs/user.stub';
import { ValidationService } from '../src/services/validator-service';
import { Sdk } from '../gatewaySdk/sources/Gateway';
import { Gateway } from '../src';

let pda: PDA;
let sdk: Sdk;
let chwc: Gateway;

beforeAll(() => {
  const validationService = new ValidationService();
  (sdk = getSdk(
    new GraphQLClient('https://v3-dev.protocol.mygateway.xyz/graphql'),
  )),
    (pda = new PDA(
      getSdk(
        new GraphQLClient('https://v3-dev.protocol.mygateway.xyz/graphql'),
      ),
      validationService,
      {
        apiKey: '',
        token: '',
        url: 'https://v3-dev.protocol.mygateway.xyz/graphql',
      },
    ));
    
  chwc = new Gateway({
    apiKey: '',
    token: '',
    url: 'https://v3-dev.protocol.mygateway.xyz/graphql',
  });
  global.fetch = jest.fn();
});

afterAll(() => {
  jest.resetAllMocks();
});

describe('PDA SERVICE TESTING', () => {
  it('pda create', async () => {
    const { createPDAMock: createPDAMutationMock } = PDAMockService(sdk);

    const { createPDA } = await pda.createPDA(pdaCreateStub());

    expect(createPDA.id).toBe(pdaStub().id);
    expect(createPDAMutationMock).toHaveBeenCalled();
  });

  // it('pda create to throw error', async () => {
  //   const { createPDAMock: createPDAMutationMock } = PDAMockService(sdk);

  //   expect(
  //     async () => await pda.createPDA(pdaCreateStub({ data: { title: '' } })),
  //   ).rejects.toThrow(' should be atleast 2 length');

  //   expect(createPDAMutationMock).toHaveBeenCalled();
  // });

  // it('pda create to throw solana error', async () => {
  //   const { createPDAMock: createPDAMutationMock } = PDAMockService(sdk);

  //   expect(
  //     async () =>
  //       await pda.createPDA(pdaCreateStub({ signingCipher: 'ED25519' })),
  //   ).rejects.toThrow('');

  //   expect(createPDAMutationMock).toHaveBeenCalled();
  // });

  // it('pda update status', async () => {
  //   const { changePDAStatusMock } = PDAMockService(sdk);

  //   const { changePDAStatus } = await pda.changePDAStatus({
  //     data: {
  //       id: pdaStub({ id: 'f47ac10b-58cc-4372-a567-0e02b2c3d479' }).id,
  //       status: PDAStatus.SUSPENDED,
  //     },
  //     signature: pdaCreateStub().signature,
  //     signingKey: pdaCreateStub().signingKey,
  //   });

  //   expect(changePDAStatus.status).toEqual(PDAStatus.SUSPENDED);
  //   expect(changePDAStatusMock).toHaveBeenCalled();
  // });

  // it('pda update status to throw error', async () => {
  //   const { changePDAStatusMock } = PDAMockService(sdk);

  //   expect(
  //     async () =>
  //       await pda.changePDAStatus({
  //         data: {
  //           id: pdaStub({ id: '' }).id,
  //           status: PDAStatus.SUSPENDED,
  //         },
  //         signature: pdaCreateStub().signature,
  //         signingKey: pdaCreateStub().signingKey,
  //       }),
  //   ).rejects.toThrow('');

  //   expect(changePDAStatusMock).toHaveBeenCalled();
  // });

  // it('pda update status to throw solana error', async () => {
  //   const { changePDAStatusMock } = PDAMockService(sdk);

  //   expect(
  //     async () =>
  //       await pda.changePDAStatus({
  //         data: {
  //           id: pdaStub().id,
  //           status: PDAStatus.SUSPENDED,
  //         },
  //         signature: pdaCreateStub().signature,
  //         signingKey: pdaCreateStub().signingKey,
  //         signingCipher: 'ED25519',
  //       }),
  //   ).rejects.toThrow('');

  //   expect(changePDAStatusMock).toHaveBeenCalled();
  // });

  // it('get pda', async () => {
  //   const { getPDAMock } = PDAMockService(sdk);

  //   const { PDA } = await pda.getPDA(pdaStub().id);

  //   expect(PDA?.id).toEqual(pdaStub().id);
  //   expect(getPDAMock).toHaveBeenCalled();
  // });

  // it('pda count', async () => {
  //   const { pdaCountMock } = PDAMockService(sdk);

  //   const count = await pda.getPDACount();

  //   expect(count).toBeGreaterThanOrEqual(0);
  //   expect(pdaCountMock).toHaveBeenCalled();
  // });

  // it('pda count to throw error', async () => {
  //   const { pdaCountMock } = PDAMockService(sdk);

  //   expect(
  //     async () =>
  //       await pda.getPDACount({ filter: { dataModelIds: [invalidUUID] } }),
  //   ).rejects.toThrow(`${invalidUUID} is not valid uuid`);

  //   expect(pdaCountMock).toHaveBeenCalled();
  // });

  // it('pdas', async () => {
  //   const { pdasMock } = PDAMockService(sdk);

  //   const { PDAs } = await pda.getPDAs({
  //     filter: { dataModelIds: [pdaCreateStub().data.dataModelId!] },
  //     skip: 0,
  //     take: 10,
  //   });

  //   expect(PDAs.length).toBeGreaterThanOrEqual(0);
  //   expect(pdasMock).toHaveBeenCalled();
  // });

  // it('pdas to throw error', async () => {
  //   const { pdasMock } = PDAMockService(sdk);

  //   expect(
  //     async () =>
  //       await pda.getPDAs({
  //         filter: { dataModelIds: [invalidUUID] },
  //       }),
  //   ).rejects.toThrow(`${invalidUUID} is not valid uuid`);

  //   expect(pdasMock).toHaveBeenCalled();
  // });

  // it('issued pdas count', async () => {
  //   const { issuedCountPDAMock } = PDAMockService(sdk);

  //   const count = await pda.getIssuedPDAsCount();

  //   expect(count).toBeGreaterThanOrEqual(0);
  //   expect(issuedCountPDAMock).toHaveBeenCalled();
  // });

  // it('issued pdas count to throw error', async () => {
  //   const { issuedCountPDAMock } = PDAMockService(sdk);

  //   expect(
  //     async () => await pda.getIssuedPDAsCount({ dataModelIds: [invalidUUID] }),
  //   ).rejects.toThrow(`${invalidUUID} is not valid uuid`);

  //   expect(issuedCountPDAMock).toHaveBeenCalled();
  // });

  // it('issued pdas', async () => {
  //   const { issuedPDAMock } = PDAMockService(sdk);

  //   const { issuedPDAs } = await pda.getIssuedPDAs();

  //   expect(issuedPDAs.length).toBeGreaterThanOrEqual(0);
  //   expect(issuedPDAMock).toHaveBeenCalled();
  // });

  // it('issued pdas to throw error', async () => {
  //   const { issuedPDAMock } = PDAMockService(sdk);

  //   expect(
  //     async () =>
  //       await pda.getIssuedPDAs({ filter: { dataModelIds: [invalidUUID] } }),
  //   ).rejects.toThrow(`${invalidUUID} is not valid uuid`);

  //   expect(issuedPDAMock).toHaveBeenCalled();
  // });

  // it('update pda', async () => {
  //   const { updatePDAMock } = PDAMockService(pda);

  //   const { updatePDA } = await pda.updatePDA({
  //     data: pdaBodyData({ id: pdaStub().id }),
  //     did: authStub().did,
  //     signature: authStub().signature,
  //   });

  //   expect(updatePDA.id).toBe(pdaStub().id);
  //   expect(updatePDAMock).toHaveBeenCalled();
  // });

  // it('update pda to throw error', async () => {
  //   const { updatePDAMock } = PDAMockService(pda);

  //   expect(
  //     async () =>
  //       await pda.updatePDA({
  //         data: pdaBodyData({ id: pdaStub().id }),
  //         did: authStub({ did: '' }).did,
  //         signature: authStub().signature,
  //       }),
  //   ).rejects.toThrow('');

  //   expect(updatePDAMock).toHaveBeenCalled();
  // });

  // it('non structured pda', async () => {
  //   const mockData = { data: 'Mocked data' };

  //   (fetch as jest.Mock).mockResolvedValueOnce({
  //     mockData,
  //   });

  //   const data: any = await pda.uploadFileAsPDA('test/v3/hello.txt', 1);
  //   expect(data.mockData).toEqual(mockData);
  //   expect(fetch).toHaveBeenCalledTimes(1);
  // });

  // it('non structured pda to throw error', async () => {
  //   const mockData = { data: 'Mocked data' };

  //   (fetch as jest.Mock).mockResolvedValueOnce({
  //     mockData,
  //   });

  //   expect(
  //     async () => await pda.uploadFileAsPDA('test/v3/hello.txt1', 1),
  //   ).rejects.toThrow('');

  //   expect(fetch).toHaveBeenCalledTimes(1);
  // });
});
