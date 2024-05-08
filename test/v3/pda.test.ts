import { GraphQLClient } from 'graphql-request';

import { PDAStatus } from '../../src/types';
import { PDA } from '../../src/v3/pda/pda';
import { getSdk } from '../../gatewaySdk/sources/GatewayV3';
import { pdaBodyData, pdaCreateStub, pdaStub } from '../stubs/v3/pda.stub';
import { PDAMockService } from '../../__mocks__/v3/pda.mock';
import { authStub } from '../stubs/v3/auth.stub';
import { invalidUUID } from '../stubs/v3/user.stub';

let pda: PDA;

beforeAll(() => {
  pda = new PDA(getSdk(new GraphQLClient('')));
});

afterAll(() => {
  jest.resetAllMocks();
});

describe('PDA SERVICE TESTING', () => {
  it('pda create', async () => {
    const { createPDAMock: createPDAMutationMock } = PDAMockService(pda);

    const { createPDA } = await pda.createPDA(pdaCreateStub());

    expect(createPDA.id).toBe(pdaStub().id);
    expect(createPDAMutationMock).toHaveBeenCalled();
  });

  it('pda create to throw error', async () => {
    const { createPDAMock: createPDAMutationMock } = PDAMockService(pda);

    expect(
      async () => await pda.createPDA(pdaCreateStub({ data: { title: '' } })),
    ).rejects.toThrow(' should be atleast 2 length');

    expect(createPDAMutationMock).toHaveBeenCalled();
  });

  it('pda create to throw solana error', async () => {
    const { createPDAMock: createPDAMutationMock } = PDAMockService(pda);

    expect(
      async () =>
        await pda.createPDA(pdaCreateStub({ signingCipher: 'ED25519' })),
    ).rejects.toThrow('');

    expect(createPDAMutationMock).toHaveBeenCalled();
  });

  it('pda update status', async () => {
    const { changePDAStatusMock } = PDAMockService(pda);

    const { changePDAStatus } = await pda.changePDAStatus({
      data: {
        id: pdaStub({ id: 'f47ac10b-58cc-4372-a567-0e02b2c3d479' }).id,
        status: PDAStatus.Suspended,
      },
      signature: pdaCreateStub().signature,
      signingKey: pdaCreateStub().signingKey,
    });

    expect(changePDAStatus.status).toEqual(PDAStatus.Suspended);
    expect(changePDAStatusMock).toHaveBeenCalled();
  });

  it('pda update status to throw error', async () => {
    const { changePDAStatusMock } = PDAMockService(pda);

    expect(
      async () =>
        await pda.changePDAStatus({
          data: {
            id: pdaStub({ id: '' }).id,
            status: PDAStatus.Suspended,
          },
          signature: pdaCreateStub().signature,
          signingKey: pdaCreateStub().signingKey,
        }),
    ).rejects.toThrow('');

    expect(changePDAStatusMock).toHaveBeenCalled();
  });

  it('pda update status to throw solana error', async () => {
    const { changePDAStatusMock } = PDAMockService(pda);

    expect(
      async () =>
        await pda.changePDAStatus({
          data: {
            id: pdaStub().id,
            status: PDAStatus.Suspended,
          },
          signature: pdaCreateStub().signature,
          signingKey: pdaCreateStub().signingKey,
          signingCipher: 'ED25519',
        }),
    ).rejects.toThrow('');

    expect(changePDAStatusMock).toHaveBeenCalled();
  });

  it('get pda', async () => {
    const { getPDAMock } = PDAMockService(pda);

    const { PDA } = await pda.getPDA(pdaStub().id);

    expect(PDA?.id).toEqual(pdaStub().id);
    expect(getPDAMock).toHaveBeenCalled();
  });

  it('get pda to throw error', async () => {
    const { getPDAMock } = PDAMockService(pda);

    expect(
      async () => await pda.getPDA(pdaStub({ id: '' }).id),
    ).rejects.toThrow('');

    expect(getPDAMock).toHaveBeenCalled();
  });

  it('pda count', async () => {
    const { pdaCountMock } = PDAMockService(pda);

    const count = await pda.getPDACount();

    expect(count).toBeGreaterThanOrEqual(0);
    expect(pdaCountMock).toHaveBeenCalled();
  });

  it('pda count to throw error', async () => {
    const { pdaCountMock } = PDAMockService(pda);

    expect(
      async () =>
        await pda.getPDACount({ filter: { dataModelIds: [invalidUUID] } }),
    ).rejects.toThrow(`${invalidUUID} is not valid uuid`);

    expect(pdaCountMock).toHaveBeenCalled();
  });

  it('pdas', async () => {
    const { pdasMock } = PDAMockService(pda);

    const { PDAs } = await pda.getPDAs({
      filter: { dataModelIds: [pdaCreateStub().data.dataModelId!] },
      skip: 0,
      take: 10,
    });

    expect(PDAs.length).toBeGreaterThanOrEqual(0);
    expect(pdasMock).toHaveBeenCalled();
  });

  it('pdas to throw error', async () => {
    const { pdasMock } = PDAMockService(pda);

    expect(
      async () =>
        await pda.getPDAs({
          filter: { dataModelIds: [invalidUUID] },
        }),
    ).rejects.toThrow(`${invalidUUID} is not valid uuid`);

    expect(pdasMock).toHaveBeenCalled();
  });

  it('issued pdas count', async () => {
    const { issuedCountPDAMock } = PDAMockService(pda);

    const count = await pda.getIssuedPDAsCount();

    expect(count).toBeGreaterThanOrEqual(0);
    expect(issuedCountPDAMock).toHaveBeenCalled();
  });

  it('issued pdas count to throw error', async () => {
    const { issuedCountPDAMock } = PDAMockService(pda);

    expect(
      async () => await pda.getIssuedPDAsCount({ dataModelIds: [invalidUUID] }),
    ).rejects.toThrow(`${invalidUUID} is not valid uuid`);

    expect(issuedCountPDAMock).toHaveBeenCalled();
  });

  it('issued pdas', async () => {
    const { issuedPDAMock } = PDAMockService(pda);

    const { issuedPDAs } = await pda.getIssuedPDAs();

    expect(issuedPDAs.length).toBeGreaterThanOrEqual(0);
    expect(issuedPDAMock).toHaveBeenCalled();
  });

  it('issued pdas to throw error', async () => {
    const { issuedPDAMock } = PDAMockService(pda);

    expect(
      async () =>
        await pda.getIssuedPDAs({ filter: { dataModelIds: [invalidUUID] } }),
    ).rejects.toThrow(`${invalidUUID} is not valid uuid`);

    expect(issuedPDAMock).toHaveBeenCalled();
  });

  it('update pda', async () => {
    const { updatePDAMock } = PDAMockService(pda);

    const { updatePDA } = await pda.updatePDA({
      data: pdaBodyData({ id: pdaStub().id }),
      did: authStub().did,
      signature: authStub().signature,
    });

    expect(updatePDA.id).toBe(pdaStub().id);
    expect(updatePDAMock).toHaveBeenCalled();
  });

  it('update pda to throw error', async () => {
    const { updatePDAMock } = PDAMockService(pda);

    expect(
      async () =>
        await pda.updatePDA({
          data: pdaBodyData({ id: pdaStub().id }),
          did: authStub({ did: '' }).did,
          signature: authStub().signature,
        }),
    ).rejects.toThrow('');

    expect(updatePDAMock).toHaveBeenCalled();
  });
});
