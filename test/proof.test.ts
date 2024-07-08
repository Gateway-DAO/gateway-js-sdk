import { GraphQLClient } from 'graphql-request';
import { getSdk, Sdk } from '../gatewaySdk/sources/Gateway';
import { Proof } from '../src/modules/proof/proof';
import { ProofMockService } from '../__mocks__/proof.mock';
import { ethers } from 'ethers';
import { ValidationService } from '../src/services/validator-service';
import { WalletService } from '../src/services/wallet-service';
import { createProofStub, proofStub } from './stubs/proof.stub';
import { pdaBodyData, pdaStub } from './stubs/pda.stub';

let sdk: Sdk;
let proof: Proof;
let wallet: ethers.Wallet;

beforeAll(() => {
  sdk = getSdk(new GraphQLClient(''));
  wallet = ethers.Wallet.createRandom();
  proof = new Proof(
    sdk,
    new ValidationService(),
    { apiKey: '', token: '', url: '', walletPrivateKey: wallet.privateKey },
    new WalletService({ walletPrivateKey: wallet.privateKey }),
  );
});

afterAll(() => {
  jest.resetAllMocks();
});

describe('PROOF SERVICE TESTING', () => {
  it('proof create', async () => {
    const { createProofMock } = ProofMockService(sdk);

    const { createProof } = await proof.createProof(createProofStub());

    expect(createProof.id).toBe(proofStub().id);
    expect(createProofMock).toHaveBeenCalled();
  });

  it('proof create -> throw error', async () => {
    const { createProofMock } = ProofMockService(sdk);

    expect(
      async () => await proof.createProof(createProofStub({ requestId: '' })),
    ).rejects.toThrow('');

    expect(createProofMock).toHaveBeenCalled();
  });

  it('get proof', async () => {
    const { getProofMock } = ProofMockService(sdk);
    const { proof: resultProof } = await proof.getProof(proofStub().id);
    expect(resultProof.id).toBe(proofStub().id);
    expect(getProofMock).toHaveBeenCalled();
  });

  it('get proof -> throw error', async () => {
    const { getProofMock } = ProofMockService(sdk);
    expect(async () => await proof.getProof('324324324')).rejects.toThrow(
      '324324324 is not valid',
    );
    expect(getProofMock).toHaveBeenCalled();
  });

  it('get proofs', async () => {
    const { getProofsMock } = ProofMockService(sdk);
    const { proofs: resultProofs } = await proof.getProofs();
    expect(resultProofs?.length).toBeGreaterThan(0);
    expect(getProofsMock).toHaveBeenCalled();
  });

  it('get proofs by pda ids', async () => {
    const { getProofsByPDAIdsMock } = ProofMockService(sdk);
    const { proofsByPDA } = await proof.getProofsByPDA({
      pdaIds: [pdaStub().id],
    });

    expect(proofsByPDA.length).toBeGreaterThan(0);
    expect(getProofsByPDAIdsMock).toHaveBeenCalled();
  });

  it('get proofs by pda ids -> single id', async () => {
    const { getProofsByPDAIdsMock } = ProofMockService(sdk);
    const { proofsByPDA } = await proof.getProofsByPDA({
      pdaIds: pdaStub().id,
    });

    expect(proofsByPDA.length).toBeGreaterThan(0);
    expect(getProofsByPDAIdsMock).toHaveBeenCalled();
  });

  it('get received proofs', async () => {
    const { getReceivedProofsMock } = ProofMockService(sdk);
    const { receivedProofs } = await proof.getReceivedProofs();

    expect(receivedProofs.length).toBeGreaterThan(0);
    expect(getReceivedProofsMock).toHaveBeenCalled();
  });

  it('get received proofs -> single id', async () => {
    const { getReceivedProofsMock } = ProofMockService(sdk);
    const { receivedProofs } = await proof.getReceivedProofs({
      organizationId: pdaBodyData().dataModelId,
    });

    expect(receivedProofs.length).toBeGreaterThan(0);
    expect(getReceivedProofsMock).toHaveBeenCalled();
  });

  it('get received proofs -> throw single error message', async () => {
    const { getReceivedProofsMock } = ProofMockService(sdk);
    expect(
      async () =>
        await proof.getReceivedProofs({
          organizationId: 'pdaStub().id',
        }),
    ).rejects.toThrow('');

    expect(getReceivedProofsMock).toHaveBeenCalled();
  });

  it('get received proofs count', async () => {
    const { getReceivedProofsCountMock } = ProofMockService(sdk);
    const { receivedProofsCount } = await proof.getReceivedProofsCount();
    expect(receivedProofsCount).toBeGreaterThanOrEqual(0);

    expect(getReceivedProofsCountMock).toHaveBeenCalled();
  });

  it('get received proofs count --> single id', async () => {
    const { getReceivedProofsCountMock } = ProofMockService(sdk);
    const { receivedProofsCount } = await proof.getReceivedProofsCount(
      pdaBodyData().dataModelId,
    );

    expect(receivedProofsCount).toBeGreaterThanOrEqual(0);
    expect(getReceivedProofsCountMock).toHaveBeenCalled();
  });

  it('get received proofs count -->  throw error single id', async () => {
    const { getReceivedProofsCountMock } = ProofMockService(sdk);
    expect(
      async () => await proof.getReceivedProofsCount('pdaStub().id'),
    ).rejects.toThrow('');

    expect(getReceivedProofsCountMock).toHaveBeenCalled();
  });

  it('get sent proofs', async () => {
    const { getSentProofsMock } = ProofMockService(sdk);
    const { sentProofs } = await proof.getSentProofs();

    expect(sentProofs.length).toBeGreaterThanOrEqual(0);
    expect(getSentProofsMock).toHaveBeenCalled();
  });

  it('get sent proofs count', async () => {
    const { getSentProofsCountMock } = ProofMockService(sdk);
    const { sentProofsCount } = await proof.getSentProofsCount();

    expect(sentProofsCount).toBeGreaterThanOrEqual(0);
    expect(getSentProofsCountMock).toHaveBeenCalled();
  });
});
