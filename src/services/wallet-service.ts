import { createHash } from 'crypto';
import { SignCipherEnum } from '../common/enums';
import { EtherumService } from './ethereum-service';
import { SolanaService } from './solana-service';
import canonicalize from 'canonicalize';
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
    walletType?: SignCipherEnum | undefined;
  }) {
    this.walletPrivateKey = walletPrivateKey;
    this.walletType = walletType ? walletType : SignCipherEnum.SECP256K1;
    this.wallet =
      this.walletType === SignCipherEnum.SECP256K1
        ? new EtherumService(this.walletPrivateKey)
        : new SolanaService(this.walletPrivateKey);
  }

  /**
   * The function `signMessage` takes data, encodes it, and then signs the encoded data using a wallet.
   * @param {any} data - The `data` parameter in the `signMessage` function is the message or data that
   * you want to sign using the wallet. This data can be of any type, as indicated by the `any` type
   * annotation in the function signature. Before signing the message, the `data` is encoded using sha 256
   * @returns The `signMessage` function returns a `Promise` that resolves to a
   * `WalletSignMessageType`.
   *  contains two properties:
   * 1. `signature`: The signature of the message, encoded in base58 format.
   * 2. `signingKey`: The public key of the wallet used to sign the message, converted to a string.
   */
  public signMessage(data: any): Promise<WalletSignMessageType> {
    const encodedObject = this.jsonEncoder(data);
    return this.wallet.signMessage(encodedObject);
  }

  /**
   * The function `jsonEncoder` takes an object, converts it to a canonical string representation,
   * hashes it using SHA-256 algorithm, and returns the hexadecimal digest.
   * @param {any} object - The `object` parameter in the `jsonEncoder` function is the data that you
   * want to encode into a JSON string. This data can be of any type, such as an object, array, string,
   * number, boolean, etc. The function will convert this data into a JSON string representation and
   * @returns The `jsonEncoder` function is returning a SHA-256 hash of the canonicalized JSON
   * representation of the input `object` as a hexadecimal string.
   */
  private jsonEncoder(object: any): string {
    return createHash('sha256')
      .update(canonicalize(object) as string)
      .digest('hex');
  }
}
