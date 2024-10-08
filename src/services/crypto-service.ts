import { EtherumService } from './ethereum-service';
import { SolanaService } from './solana-service';
import { SuiService } from './sui-service';

export class CryptoService {
  constructor() {}

  public async verifyMessage(
    signature: string,
    message: string,
    walletAddress: string,
  ) {
    let result = false;

    if (EtherumService.validateWallet(walletAddress)) {
      result = await EtherumService.verifyMessage(
        signature,
        message,
        walletAddress,
      );
    } else if (SuiService.validateWallet(walletAddress)) {
      result = await SuiService.verifyMessage(
        message,
        signature,
        walletAddress,
      );
    } else if (SolanaService.validateWallet(walletAddress)) {
      result = await SolanaService.verifyMessage(
        message,
        signature,
        walletAddress,
      );
    } else {
      throw new Error(`${walletAddress} is invalid`);
    }
    if (!result) throw new Error('invalid signature');
  }
}
