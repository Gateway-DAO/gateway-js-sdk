import { EtherumService } from './ethereum-service';
import { SolanaService } from './solana-service';

export class CryptoService {
  private etherumService: EtherumService;
  private solanaService: SolanaService;

  constructor() {
    this.etherumService = new EtherumService();
    this.solanaService = new SolanaService();
  }

  public async verifyMessage(
    signature: string,
    message: string,
    walletAddress: string,
  ) {
    let result = false;
    if (this.etherumService.validateWallet(walletAddress)) {
      result = await this.etherumService.verifyMessage(
        signature,
        message,
        walletAddress,
      );
    } else if (this.solanaService.validateWallet(walletAddress)) {
      result = await this.solanaService.verifyMessage(
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
