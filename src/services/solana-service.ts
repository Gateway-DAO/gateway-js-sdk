import solanaWeb3, { Keypair, Signer } from '@solana/web3.js';
import bs58 from 'bs58';
import nacl from 'tweetnacl';
import { decodeUTF8 } from 'tweetnacl-util';

export class SolanaService {
  private walletPrivateKey;
  private wallet;

  constructor(walletPrivateKey: string) {
    this.walletPrivateKey = walletPrivateKey;
    this.wallet = this.getKeyPair();
  }

  private getKeyPair(): Keypair {
    let key = this.walletPrivateKey;
    if (typeof key !== 'string') {
      key = bs58.encode(Buffer.from(key));
    }
    return Keypair.fromSecretKey(bs58.decode(key));
  }

  async signMessage(
    message: string,
  ): Promise<{ signature: string; signingKey: string }> {
    const t = nacl.sign.detached(decodeUTF8(message), this.wallet.secretKey);
    const signature = await Buffer.from(t.buffer).toString();

    return { signature, signingKey: this.wallet.publicKey.toString() };
  }
}
