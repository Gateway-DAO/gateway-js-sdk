import { Gateway } from '../src/Gateway';
let api: Gateway;

beforeAll(() => {
  const apiKey = process.env.API_KEY;
  const token = process.env.BEARER_TOKEN;

  if (!apiKey || !token) {
    throw new Error(
      'APIKEY or TOKEN is not defined in the environment variables.',
    );
  }

  api = new Gateway({
    apiKey: apiKey,
    token: token,
  });
});

describe('proofs related test', () => {
  it('create proof', async () => {
    const {} = await api.proof.createProof({});
  });

  it('get proof using data model id', async () => {
    const { proof } = await api.proof.getProof(process.env.PROOF_ID as string);
    expect(proof.id).toEqual(process.env.PROOF_ID);
  }, 8000);

  it('get proofs', async () => {
    const { proofs } = await api.proof.getProofs();
    expect(proofs.length).toBeGreaterThanOrEqual(0);
  });

  it('get proofs by pda id', async () => {
    const { proofsByPDAIds } = await api.proof.getProofsByPDAIds({
      pdaIds: [process.env.PDA_ID as string],
    });

    expect(proofsByPDAIds.length).toBeGreaterThanOrEqual(0);
  });

  it('get received proofs for user', async () => {
    const { receivedProofs } = await api.proof.getReceivedProofs();

    expect(receivedProofs.length).toBeGreaterThanOrEqual(0);
  });

  it('get received proof count', async () => {
    const { receivedProofsCount } = await api.proof.getReceivedProofsCount();
    expect(receivedProofsCount).toBeGreaterThanOrEqual(0);
  });

  it('get sent proofs', async () => {
    const { sentProofs } = await api.proof.getSentProofs();
    expect(sentProofs.length).toBeGreaterThanOrEqual(0);
  });

  it('get sent proofs count', async () => {
    const { sentProofsCount } = await api.proof.getSentProofsCount();
    expect(sentProofsCount).toBeGreaterThanOrEqual(0);
  });
});
