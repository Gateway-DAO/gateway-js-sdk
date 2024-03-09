import { PDAStatus } from '../src/types';
import { PDA } from '../src/pda/pda';
import { getSdk } from '../gatewaySdk';
import { pdaCreateStub, pdaStub } from './stubs/pda.stub';
import { PDAMockService } from '../__mocks__/pda.mock';
import { GraphQLClient } from 'graphql-request';

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
      async () => await pda.createPDA(pdaCreateStub({ title: '' })),
    ).rejects.toThrow(' should be atleast 2 length');

    expect(createPDAMutationMock).toHaveBeenCalled();
  });

  it('pda update status', async () => {
    const { changePDAStatusMock } = PDAMockService(pda);

    const { changePDAStatus } = await pda.changePDAStatus({
      id: pdaStub().id,
      status: PDAStatus.Suspended,
    });

    expect(changePDAStatus.status).toEqual(PDAStatus.Suspended);
    expect(changePDAStatusMock).toHaveBeenCalled();
  });

  it('pda update status to throw error', async () => {
    const { changePDAStatusMock } = PDAMockService(pda);

    expect(
      async () =>
        await pda.changePDAStatus({
          id: pdaStub({ id: 'f17ac10b-58cc-4372-a567' }).id,
          status: PDAStatus.Suspended,
        }),
    ).rejects.toThrow('');

    expect(changePDAStatusMock).toHaveBeenCalled();
  });

  it('get pda', async () => {
    const { getPDAMock } = PDAMockService(pda);

    const { PDA } = await pda.getPDA(pdaStub().id);

    expect(PDA?.dataAsset?.title).toEqual(pdaStub().dataAsset?.title);
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

  it('pdas', async () => {
    const { pdasMock } = PDAMockService(pda);

    const { PDAs } = await pda.getPDAs({
      filter: { dataModelIds: [pdaCreateStub().dataModelId] },
      skip: 0,
      take: 10,
    });

    expect(PDAs.length).toBeGreaterThanOrEqual(0);
    expect(pdasMock).toHaveBeenCalled();
  });

  it('issued pdas count', async () => {
    const { issuedCountPDAMock } = PDAMockService(pda);

    const count = await pda.getIssuedPDAsCount();

    expect(count).toBeGreaterThanOrEqual(0);
    expect(issuedCountPDAMock).toHaveBeenCalled();
  });

  it('issued pdas', async () => {
    const { issuedPDAMock } = PDAMockService(pda);

    const { issuedPDAs } = await pda.getIssuedPDAs();

    expect(issuedPDAs.length).toBeGreaterThanOrEqual(0);
    expect(issuedPDAMock).toHaveBeenCalled();
  });

  it('update pda', async () => {
    const { updatePDAMock } = PDAMockService(pda);

    const { updatePDA } = await pda.updatePDA({
      id: pdaStub().id,
      title: pdaStub().dataAsset?.title,
    });

    expect(updatePDA.dataAsset?.title).toBe(pdaStub().dataAsset?.title);
    expect(updatePDAMock).toHaveBeenCalled();
  });

  it('update pda to throw error', async () => {
    const { updatePDAMock } = PDAMockService(pda);

    expect(
      async () =>
        await pda.updatePDA({
          id: pdaStub().id,
          title: pdaCreateStub({ title: '' }).title,
        }),
    ).rejects.toThrow('');

    expect(updatePDAMock).toHaveBeenCalled();
  });
});
