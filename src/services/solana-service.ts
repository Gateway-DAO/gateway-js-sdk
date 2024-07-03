import { Keypair } from '@solana/web3.js';
import { ethers } from 'ethers';
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
      key = ethers.utils.base58.encode(Buffer.from(key));
    }
    return Keypair.fromSecretKey(ethers.utils.base58.decode(key));
  }

  async signMessage(
    message: string,
  ): Promise<{ signature: string; signingKey: string }> {
    const signedMessage = nacl.sign.detached(
      decodeUTF8(message),
      this.wallet.secretKey,
    );
    const signature = await ethers.utils.base58.encode(signedMessage);

    return { signature, signingKey: this.wallet.publicKey.toString() };
  }
}
