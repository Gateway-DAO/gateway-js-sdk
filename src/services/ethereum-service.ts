import { ethers, Wallet } from 'ethers';
import { WalletSignMessageType } from '../common/types';

export class EtherumService {
  private walletPrivateKey;
  private wallet: Wallet;

  constructor(walletPrivateKey: string) {
    this.walletPrivateKey = walletPrivateKey;
    this.wallet = this.generateNewEtherumWalletUsingPrivateKey(
      this.walletPrivateKey,
    );
  }

  /**
   * The function generates a new Ethereum wallet using a provided private key.
   * @param {string} privateKey - The `privateKey` parameter is a string that represents the private
   * key used to generate a new Ethereum wallet.
   * @returns A new Ethereum wallet is being returned, created using the provided private key.
   */
  private generateNewEtherumWalletUsingPrivateKey(
    privateKey: string,
  ): ethers.Wallet {
    return new ethers.Wallet(privateKey);
  }

  /**
   * The function `signMessage` asynchronously signs a message using a wallet and returns the signature
   * along with the signing key.
   * @param {string} message - The `message` parameter is a string that represents the message that
   * needs to be signed by the wallet.
   * @returns The `signMessage` function returns a Promise that resolves to an object of type
   * `WalletSignMessageType`, which contains the `signature` and `signingKey` properties.
   */
  public async signMessage(message: string): Promise<WalletSignMessageType> {
    const signature = await this.wallet.signMessage(message);
    const signingKey = await this.wallet.getAddress();
    return { signature, signingKey };
  }
}
