import { Proof } from '../../src/v3/proof/proof';
import { getSdk } from '../../gatewaySdk/sources/GatewayV3';
import { proofStub, createProofStub } from '../stubs/v3/proof.stub';
import { ProofMockService } from '../../__mocks__/v3/proof.mock';
import { pdaStub } from '../stubs/v3/pda.stub';
import { GraphQLClient } from 'graphql-request';

let proof: Proof;

beforeAll(() => {
  proof = new Proof(getSdk(new GraphQLClient('')));
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

  it('get proof -> throw error', async () => {
    const { getProofMock } = ProofMockService(proof);
    expect(async () => await proof.getProof('324324324')).rejects.toThrow(
      '324324324 is not valid',
    );
    expect(getProofMock).toHaveBeenCalled();
  });

  it('get proofs', async () => {
    const { getProofsMock } = ProofMockService(proof);
    const { proofs: resultProofs } = await proof.getProofs();
    expect(resultProofs?.length).toBeGreaterThan(0);
    expect(getProofsMock).toHaveBeenCalled();
  });

  it('get proofs by pda ids', async () => {
    const { getProofsByPDAIdsMock } = ProofMockService(proof);
    const { proofsByPDAIds } = await proof.getProofsByPDAIds({
      pdaIds: [pdaStub().id],
    });

    expect(proofsByPDAIds.length).toBeGreaterThan(0);
    expect(getProofsByPDAIdsMock).toHaveBeenCalled();
  });

  it('get proofs by pda ids -> single id', async () => {
    const { getProofsByPDAIdsMock } = ProofMockService(proof);
    const { proofsByPDAIds } = await proof.getProofsByPDAIds({
      pdaIds: pdaStub().id,
    });

    expect(proofsByPDAIds.length).toBeGreaterThan(0);
    expect(getProofsByPDAIdsMock).toHaveBeenCalled();
  });

  it('get proofs by pda ids -> throw error message', async () => {
    const { getProofsByPDAIdsMock } = ProofMockService(proof);

    expect(
      async () =>
        await proof.getProofsByPDAIds({
          pdaIds: 'pdaStub().id,',
        }),
    ).rejects.toThrow('');

    expect(getProofsByPDAIdsMock).toHaveBeenCalled();
  });

  it('get received proofs', async () => {
    const { getReceivedProofsMock } = ProofMockService(proof);
    const { receivedProofs } = await proof.getReceivedProofs();

    expect(receivedProofs.length).toBeGreaterThan(0);
    expect(getReceivedProofsMock).toHaveBeenCalled();
  });

  it('get received proofs -> single id', async () => {
    const { getReceivedProofsMock } = ProofMockService(proof);
    const { receivedProofs } = await proof.getReceivedProofs({
      organizationId: pdaStub().id,
    });

    expect(receivedProofs.length).toBeGreaterThan(0);
    expect(getReceivedProofsMock).toHaveBeenCalled();
  });

  it('get received proofs -> throw single error message', async () => {
    const { getReceivedProofsMock } = ProofMockService(proof);
    expect(
      async () =>
        await proof.getReceivedProofs({
          organizationId: 'pdaStub().id',
        }),
    ).rejects.toThrow('');

    expect(getReceivedProofsMock).toHaveBeenCalled();
  });

  it('get received proofs count', async () => {
    const { getReceivedProofsCountMock } = ProofMockService(proof);
    const { receivedProofsCount } = await proof.getReceivedProofsCount();
    expect(receivedProofsCount).toBeGreaterThanOrEqual(0);

    expect(getReceivedProofsCountMock).toHaveBeenCalled();
  });

  it('get received proofs count --> single id', async () => {
    const { getReceivedProofsCountMock } = ProofMockService(proof);
    const { receivedProofsCount } = await proof.getReceivedProofsCount(
      pdaStub().id,
    );
    expect(receivedProofsCount).toBeGreaterThanOrEqual(0);

    expect(getReceivedProofsCountMock).toHaveBeenCalled();
  });

  it('get received proofs count -->  throw error single id', async () => {
    const { getReceivedProofsCountMock } = ProofMockService(proof);
    expect(
      async () => await proof.getReceivedProofsCount('pdaStub().id'),
    ).rejects.toThrow('');

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
