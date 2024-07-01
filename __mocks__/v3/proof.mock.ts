import { Proof } from '../../src/v3/proof/proof';
import { proofStub } from '../../test/stubs/v3/proof.stub';

export const ProofMockService = (proof: Proof) => ({
  getProofMock: jest.spyOn(proof.sdk, 'proof_query').mockResolvedValue({
    proof: proofStub(),
  }),

  createProofMock: jest
    .spyOn(proof.sdk, 'createProof_mutation')
    .mockResolvedValue({
      createProof: proofStub(),
    }),

  getProofsMock: jest.spyOn(proof.sdk, 'proofs_query').mockResolvedValue({
    proofs: [proofStub()],
  }),

  getProofsByPDAIdsMock: jest
    .spyOn(proof.sdk, 'proofsByPDA_query')
    .mockResolvedValue({
      proofsByPDA: [proofStub()],
    }),

  getReceivedProofsMock: jest
    .spyOn(proof.sdk, 'receivedProofs_query')
    .mockResolvedValue({
      receivedProofs: [proofStub()],
    }),

  getReceivedProofsCountMock: jest
    .spyOn(proof.sdk, 'receivedProofsCount_query')
    .mockResolvedValue({
      receivedProofsCount: 10,
    }),

  getSentProofsMock: jest
    .spyOn(proof.sdk, 'sentProofs_query')
    .mockResolvedValue({
      sentProofs: [proofStub()],
    }),

  getSentProofsCountMock: jest
    .spyOn(proof.sdk, 'sentProofsCount_query')
    .mockResolvedValue({
      sentProofsCount: 10,
    }),
});
