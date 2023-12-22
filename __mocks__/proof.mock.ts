import { Proof } from '../src/proof/proof';
import { proofStub, createProofMessage } from '../test/stubs/proof.stub';

export const ProofMockService = (proof: Proof) => ({
  getProofMock: jest.spyOn(proof.sdk, 'proof_query').mockResolvedValue({
    proof: proofStub(),
  }),

  createProofMock: jest
    .spyOn(proof.sdk, 'createProof_mutation')
    .mockResolvedValue({
      createProof: proofStub(),
    }),

  createProofMessageMock: jest
    .spyOn(proof.sdk, 'createProofMessage_mutation')
    .mockResolvedValue({
      createProofMessage: createProofMessage,
    }),

  getProofs: jest.spyOn(proof.sdk, 'proofs_query').mockResolvedValue({
    proofs: [proofStub()],
  }),

  getProofsByPDAIds: jest
    .spyOn(proof.sdk, 'proofsByPDAIds_query')
    .mockResolvedValue({
      proofsByPDAIds: [proofStub()],
    }),

  getReceivedProofs: jest
    .spyOn(proof.sdk, 'receivedProofs_query')
    .mockResolvedValue({
      receivedProofs: [proofStub()],
    }),

  getReceivedProofsCount: jest
    .spyOn(proof.sdk, 'receivedProofsCount_query')
    .mockResolvedValue({
      receivedProofsCount: 10,
    }),

  getSentProofs: jest.spyOn(proof.sdk, 'sentProofs_query').mockResolvedValue({
    sentProofs: [proofStub()],
  }),

  getSentProofsCount: jest
    .spyOn(proof.sdk, 'sentProofsCount_query')
    .mockResolvedValue({
      sentProofsCount: 10,
    }),
});
