import { WalletTypeEnum } from '../common/types';
import { EtherumService } from './ethereum-service';
import { SolanaService } from './solana-service';
import { WalletSignMessageType } from '../common/types';

export class WalletService {
  private walletPrivateKey;
  private walletType;
  private wallet: EtherumService | SolanaService;

  constructor({
    walletPrivateKey,
    walletType,
  }: {
    walletPrivateKey: string;
    walletType?: WalletTypeEnum | undefined;
  }) {
    this.walletPrivateKey = walletPrivateKey;
    this.walletType = walletType ? walletType : WalletTypeEnum.Etherum;
    this.wallet =
      this.walletType === WalletTypeEnum.Etherum
        ? new EtherumService(this.walletPrivateKey)
        : new SolanaService(this.walletPrivateKey);
  }

  /**
   * The function `signMessage` takes data, encodes it, and then signs the encoded data using a wallet.
   * @param {string} data - The `data` parameter in the `signMessage` function is the message or data that
   * you want to sign using the wallet. This data can be of string type, as indicated by the `string` type
   * annotation in the function signature. Before signing the message, the `data` is encoded using sha 256
   * @returns The `signMessage` function returns a `Promise` that resolves to a
   * `WalletSignMessageType`.
   *  contains two properties:
   * 1. `signature`: The signature of the message, encoded in base58 format.
   * 2. `signingKey`: The public key of the wallet used to sign the message, converted to a string.
   */
  public signMessage(data: string): Promise<WalletSignMessageType> {
    return this.wallet.signMessage(data);
  }
}
