import { Sdk } from '../gatewaySdk/sources/Gateway';
import { proofStub } from '../test/stubs/proof.stub';

export const ProofMockService = (sdk: Sdk) => ({
  getProofMock: jest.spyOn(sdk, 'proofQuery').mockResolvedValue({
    proof: proofStub(),
  }),

  createProofMock: jest.spyOn(sdk, 'createProofMutation').mockResolvedValue({
    createProof: proofStub(),
  }),

  getProofsMock: jest.spyOn(sdk, 'proofsQuery').mockResolvedValue({
    proofs: [proofStub()],
  }),

  getProofsByPDAIdsMock: jest.spyOn(sdk, 'proofsByPDAQuery').mockResolvedValue({
    proofsByPDA: [proofStub()],
  }),

  getReceivedProofsMock: jest
    .spyOn(sdk, 'receivedProofsQuery')
    .mockResolvedValue({
      receivedProofs: [proofStub()],
    }),

  getReceivedProofsCountMock: jest
    .spyOn(sdk, 'receivedProofsCountQuery')
    .mockResolvedValue({
      receivedProofsCount: 10,
    }),

  getSentProofsMock: jest.spyOn(sdk, 'sentProofsQuery').mockResolvedValue({
    sentProofs: [proofStub()],
  }),

  getSentProofsCountMock: jest
    .spyOn(sdk, 'sentProofsCountQuery')
    .mockResolvedValue({
      sentProofsCount: 10,
    }),
});
