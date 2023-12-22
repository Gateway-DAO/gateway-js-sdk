//   it('get pda', async () => {
//     const { getPDAMock } = PDAMockService(pda);

//     const { PDA } = await pda.getPDA(pdaStub().id);

//     expect(PDA?.dataAsset?.title).toEqual(pdaStub().dataAsset?.title);
//     expect(getPDAMock).toHaveBeenCalled();
//   });

//   it('pda count', async () => {
//     const { pdaCountMock } = PDAMockService(pda);

//     const count = await pda.getPDACount();

//     expect(count).toBeGreaterThanOrEqual(0);
//     expect(pdaCountMock).toHaveBeenCalled();
//   });

//   it('pdas', async () => {
//     const { pdasMock } = PDAMockService(pda);

//     const { PDAs } = await pda.getPDAs({
//       filter: { dataModelIds: [pdaCreateStub().dataModelId] },
//       skip: 0,
//       take: 10,
//     });

//     expect(PDAs.length).toBeGreaterThanOrEqual(0);
//     expect(pdasMock).toHaveBeenCalled();
//   });

//   it('issued pdas count', async () => {
//     const { issuedPDAMock } = PDAMockService(pda);

//     const count = await pda.getIssuedPDAsCount();

//     expect(count).toBeGreaterThanOrEqual(0);
//     expect(issuedPDAMock).toHaveBeenCalled();
//   });
// });

import { Proof } from '../src/proof/proof';
import { getMeshSDK } from '../.mesh';
import {
  proofStub,
  createProofMessage,
  createProofStub,
} from './stubs/proof.stub';
import { ProofMockService } from '../__mocks__/proof.mock';

let proof: Proof;

beforeAll(() => {
  proof = new Proof(getMeshSDK());
});

afterAll(() => {
  jest.resetAllMocks();
});

describe('PROOF SERVICE TESTING', () => {
  it('proof create', async () => {
    const { createProofMock } = ProofMockService(proof);
    const { createProof } = await proof.createProof(createProofStub());

    expect(createProof.id).toBe(proofStub().id);
    expect(createProofMock).toHaveBeenCalled();
  });
});
