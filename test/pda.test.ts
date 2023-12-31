import { PDAStatus } from '../src/types';
import { PDA } from '../src/pda/pda';
import { getMeshSDK } from '../.mesh';
import { pdaCreateStub, pdaStub } from './stubs/pda.stub';
import { PDAMockService } from '../__mocks__/pda.mock';

let pda: PDA;

beforeAll(() => {
  pda = new PDA(getMeshSDK());
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

  it('pda update status', async () => {
    const { changePDAStatusMock } = PDAMockService(pda);

    const { changePDAStatus } = await pda.changePDAStatus({
      id: pdaStub().id,
      status: PDAStatus.Suspended,
    });

    expect(changePDAStatus.status).toEqual(PDAStatus.Suspended);
    expect(changePDAStatusMock).toHaveBeenCalled();
  });

  it('get pda', async () => {
    const { getPDAMock } = PDAMockService(pda);

    const { PDA } = await pda.getPDA(pdaStub().id);

    expect(PDA?.dataAsset?.title).toEqual(pdaStub().dataAsset?.title);
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
    const { issuedPDAMock } = PDAMockService(pda);

    const count = await pda.getIssuedPDAsCount();

    expect(count).toBeGreaterThanOrEqual(0);
    expect(issuedPDAMock).toHaveBeenCalled();
  });
});
