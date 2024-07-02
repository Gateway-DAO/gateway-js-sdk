import { pdaStub } from '../test/stubs/pda.stub';
import { Sdk } from '../gatewaySdk/sources/Gateway';
import { Gateway } from '../src';

export const PDAMockService = (sdk: Sdk) => ({
  createPDAMock: jest.spyOn(sdk, 'createPDAMutation').mockResolvedValue({
    createPDA: pdaStub(),
  }),
  // changePDAStatusMock: jest
  //   .spyOn(sdk, 'changePDAStatusMutation')
  //   .mockResolvedValue({
  //     changePDAStatus: pdaStub({ status: 'Suspended' }),
  //   }),
  // pdaCountMock: jest
  //   .spyOn(sdk, 'PDACountQuery')
  //   .mockResolvedValue({ PDACount: 10 }),
  // getPDAMock: jest.spyOn(sdk, 'PDAQuery').mockResolvedValue({
  //   PDA: pdaStub(),
  // }),
  // pdasMock: jest
  //   .spyOn(sdk, 'PDAsQuery')
  //   .mockResolvedValue({ PDAs: [pdaStub()] }),
  // issuedCountPDAMock: jest
  //   .spyOn(sdk, 'issuedPDAsCountQuery')
  //   .mockResolvedValue({ issuedPDAsCount: 10 }),
  // issuedPDAMock: jest
  //   .spyOn(sdk, 'issuedPDAsQuery')
  //   .mockResolvedValue({ issuedPDAs: [pdaStub()] }),
  // updatePDAMock: jest
  //   .spyOn(sdk, 'updatePDAMutation')
  //   .mockResolvedValue({ updatePDA: pdaStub() }),
});
