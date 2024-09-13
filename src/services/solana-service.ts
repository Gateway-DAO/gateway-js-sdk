import { PublicKey } from '@solana/web3.js';
import { ethers } from 'ethers';
import { sign } from 'tweetnacl';

export class SolanaService {
  public async verifyMessage(
    message: string,
    signature: string,
    publicKey: string,
  ) {
    return sign.detached.verify(
      new TextEncoder().encode(message),
      ethers.utils.base58.decode(signature),
      ethers.utils.base58.decode(publicKey),
    );
  }

  public validateWallet(wallet: string) {
    const key = new PublicKey(wallet);
    if (PublicKey.isOnCurve(key.toBytes())) {
      return key.toBase58();
    }
    throw new Error('Invalid wallet address');
  }
}
