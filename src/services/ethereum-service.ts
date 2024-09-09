import { ethers } from 'ethers';

export class EtherumService {
  public async verifyMessage(
    signature: string,
    message: string,
    walletAddress: string,
  ): Promise<boolean> {
    const recoveredAddress = ethers.utils.verifyMessage(message, signature);
    return recoveredAddress === walletAddress;
  }

  public validateWallet(wallet: string) {
    return ethers.utils.isAddress(wallet);
  }
}
