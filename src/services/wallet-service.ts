import { createHash } from 'crypto';
import { SignCipherEnum } from '../common/enums';
import { EtherumService } from './ethereum-service';
import { SolanaService } from './solana-service';
import canonicalize from 'canonicalize';

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

  signMessage = (data: any) => {
    const encodedObject = this.jsonEncoder(data);
    return this.wallet.signMessage(encodedObject);
  };

  /* The `jsonEncoder` function is taking an `object` as input, converting it to a canonicalized string
  representation, hashing it using SHA-256 algorithm, and then returning the hashed result in
  hexadecimal format. Here's a breakdown of what each step does: */
  private jsonEncoder = (object: any): string => {
    return createHash('sha256')
      .update(canonicalize(object) as string)
      .digest('hex');
  };
}
