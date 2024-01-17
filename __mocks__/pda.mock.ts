import { PDA } from '../src/pda/pda';
import { pdaStub } from '../test/stubs/pda.stub';

export const PDAMockService = (pda: PDA) => ({
  createPDAMock: jest.spyOn(pda.sdk, 'createPDA_mutation').mockResolvedValue({
    createPDA: pdaStub(),
  }),
  changePDAStatusMock: jest
    .spyOn(pda.sdk, 'changePDAStatus_mutation')
    .mockResolvedValue({
      changePDAStatus: pdaStub({ status: 'Suspended' }),
    }),
  pdaCountMock: jest
    .spyOn(pda.sdk, 'PDACount_query')
    .mockResolvedValue({ PDACount: 10 }),
  getPDAMock: jest.spyOn(pda.sdk, 'PDA_query').mockResolvedValue({
    PDA: pdaStub(),
  }),
  pdasMock: jest
    .spyOn(pda.sdk, 'PDAs_query')
    .mockResolvedValue({ PDAs: [pdaStub()] }),
  issuedCountPDAMock: jest
    .spyOn(pda.sdk, 'issuedPDAsCount_query')
    .mockResolvedValue({ issuedPDAsCount: 10 }),
  issuedPDAMock: jest
    .spyOn(pda.sdk, 'issuedPDAs_query')
    .mockResolvedValue({ issuedPDAs: [pdaStub()] }),
  updatePDAMock: jest
    .spyOn(pda.sdk, 'updatePDA_mutation')
    .mockResolvedValue({ updatePDA: pdaStub() }),
});
