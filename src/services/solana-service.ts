import { Keypair } from '@solana/web3.js';
import { ethers } from 'ethers';
import nacl from 'tweetnacl';
import { decodeUTF8 } from 'tweetnacl-util';
import { WalletSignMessageType } from '../common/types';

export class SolanaService {
  private walletPrivateKey;
  private wallet;

  constructor(walletPrivateKey: string) {
    this.walletPrivateKey = walletPrivateKey;
    this.wallet = this.getKeyPair();
  }

  /**
   * The function `getKeyPair` retrieves a key pair from a wallet private key encoded in base58 format.
   * @returns A Keypair object is being returned.
   */
  private getKeyPair(): Keypair {
    let key = this.walletPrivateKey;
    if (typeof key !== 'string') {
      key = ethers.utils.base58.encode(Buffer.from(key));
    }
    return Keypair.fromSecretKey(ethers.utils.base58.decode(key));
  }

  /**
   * The function `signMessage` signs a message using a secret key and returns the signature along with
   * the public key.
   * @param {string} message - The `message` parameter is a string that represents the message that
   * needs to be signed by the wallet using its secret key.
   * @returns The `signMessage` function returns an object of type `WalletSignMessageType`, which
   * contains two properties:
   * 1. `signature`: The signature of the message, encoded in base58 format.
   * 2. `signingKey`: The public key of the wallet used to sign the message, converted to a string.
   */
  public async signMessage(message: string): Promise<WalletSignMessageType> {
    const signedMessage = nacl.sign.detached(
      decodeUTF8(message),
      this.wallet.secretKey,
    );
    const signature = await ethers.utils.base58.encode(signedMessage);

    return { signature, signingKey: this.wallet.publicKey.toString() };
  }
}
