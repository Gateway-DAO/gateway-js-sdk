import { Proof } from '../src/proof/proof';
import { getMeshSDK } from '../.mesh';
import {
  proofStub,
  createProofMessage,
  createProofStub,
  requestId,
} from './stubs/proof.stub';
import { ProofMockService } from '../__mocks__/proof.mock';
import { pdaStub } from './stubs/pda.stub';

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

  it('get proof', async () => {
    const { getProofMock } = ProofMockService(proof);
    const { proof: resultProof } = await proof.getProof(proofStub().id);
    expect(resultProof.id).toBe(proofStub().id);
    expect(getProofMock).toHaveBeenCalled();
  });

  it('get proofs', async () => {
    const { getProofsMock } = ProofMockService(proof);
    const { proofs: resultProofs } = await proof.getProofs();
    expect(resultProofs?.length).toBeGreaterThan(0);
    expect(getProofsMock).toHaveBeenCalled();
  });

  it('create proof message', async () => {
    const { createProofMessageMock } = ProofMockService(proof);
    const { createProofMessage: resultMessage } =
      await proof.createProofMessage(requestId);
    expect(resultMessage).toEqual(createProofMessage);
    expect(createProofMessageMock).toHaveBeenCalled();
  });

  it('get proofs by pda ids', async () => {
    const { getProofsByPDAIdsMock } = ProofMockService(proof);
    const { proofsByPDAIds } = await proof.getProofsByPDAIds({
      pdaIds: [pdaStub().id],
    });

    expect(proofsByPDAIds.length).toBeGreaterThan(0);
    expect(getProofsByPDAIdsMock).toHaveBeenCalled();
  });

  it('get received proofs', async () => {
    const { getReceivedProofsMock } = ProofMockService(proof);
    const { receivedProofs } = await proof.getReceivedProofs();
    expect(receivedProofs.length).toBeGreaterThan(0);
    expect(getReceivedProofsMock).toHaveBeenCalled();
  });

  it('get received proofs count', async () => {
    const { getReceivedProofsCountMock } = ProofMockService(proof);
    const { receivedProofsCount } = await proof.getReceivedProofsCount();
    expect(receivedProofsCount).toBeGreaterThanOrEqual(0);
    expect(getReceivedProofsCountMock).toHaveBeenCalled();
  });

  it('get sent proofs', async () => {
    const { getSentProofsMock } = ProofMockService(proof);
    const { sentProofs } = await proof.getSentProofs();
    expect(sentProofs.length).toBeGreaterThanOrEqual(0);
    expect(getSentProofsMock).toHaveBeenCalled();
  });

  it('get sent proofs count', async () => {
    const { getSentProofsCountMock } = ProofMockService(proof);
    const { sentProofsCount } = await proof.getSentProofsCount();
    expect(sentProofsCount).toBeGreaterThanOrEqual(0);
    expect(getSentProofsCountMock).toHaveBeenCalled();
  });
});
