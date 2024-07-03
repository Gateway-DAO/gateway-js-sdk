import { ethers, Wallet } from 'ethers';

export class EtherumService {
  private walletPrivateKey;
  private wallet: Wallet;

  constructor(walletPrivateKey: string) {
    this.walletPrivateKey = walletPrivateKey;
    this.wallet = this.generateNewEtherumWalletUsingPrivateKey(
      this.walletPrivateKey,
    );
  }

  private generateNewEtherumWalletUsingPrivateKey = (
    privateKey: string,
  ): ethers.Wallet => {
    return new ethers.Wallet(privateKey);
  };

  signMessage = async (
    message: string,
  ): Promise<{ signature: string; signingKey: string }> => {
    const signature = await this.wallet.signMessage(message);
    const signingKey = await this.wallet.getAddress();
    return { signature, signingKey };
  };
}
