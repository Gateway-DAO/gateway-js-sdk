import { PDAStatus } from '../src/types';
import { PDA } from '../src/pda/pda';
import { getMeshSDK } from '../.mesh';
import { pdaCreateStub, pdaStub } from './stubs/pda.stub';

let pda: PDA;

beforeAll(() => {
  pda = new PDA(getMeshSDK());
});

afterAll(() => {
  jest.resetAllMocks();
});

describe('PDA SERVICE TESTING', () => {
  it('pda crud', async () => {
    const createPDAMutationMock = jest.spyOn(pda.sdk, 'createPDA_mutation');
    createPDAMutationMock.mockResolvedValue({
      createPDA: pdaStub(),
    });

    const { createPDA } = await pda.createPDA(pdaCreateStub());

    const changePDAStatusMock = jest.spyOn(pda.sdk, 'changePDAStatus_mutation');
    changePDAStatusMock.mockResolvedValue({
      changePDAStatus: pdaStub({ status: 'Suspended' }),
    });
    const { changePDAStatus } = await pda.changePDAStatus({
      id: createPDA.id,
      status: PDAStatus.Suspended,
    });
    expect(changePDAStatus.status).toEqual(PDAStatus.Suspended);

    const getPDAMock = jest.spyOn(pda.sdk, 'PDA_query');
    getPDAMock.mockResolvedValue({
      PDA: pdaStub(),
    });
    const { PDA } = await pda.getPDA(createPDA.id);
    expect(PDA?.dataAsset?.title).toEqual('test');
    expect(getPDAMock).toHaveBeenCalled();
  });

  // it('pda count', async () => {
  //   const count = await pda.getPDACount();
  //   expect(count).toBeGreaterThanOrEqual(0);
  // });

  // it('pdas', async () => {
  //   const { PDAs } = await pda.getPDAs({
  //     filter: { dataModelIds: [process.env.DATAMODEL_ID!] },
  //     skip: 0,
  //     take: 10,
  //   });
  //   expect(PDAs.length).toBeGreaterThanOrEqual(0);
  // });

  // it('issued pdas count', async () => {
  //   const count = await pda.getIssuedPDAsCount();
  //   expect(count).toBeGreaterThanOrEqual(0);
  // });
});
