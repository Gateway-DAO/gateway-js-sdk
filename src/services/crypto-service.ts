import forge from 'node-forge';
import {
  AESCIPHERSTRATERGY,
  ENCODING,
  ENCRYPTIONSCHEME,
} from '../common/constants';
import { EncryptedAESCipher } from '../common/enums';

export const hashMethod = forge.md.sha256;

export class CryptoService {
  /* The `generateDID` function is generating a Decentralized Identifier (DID) based on the provided
  `publicKey` and an optional `domain` parameter. */
  generateDID = (publicKey: string, domain?: string) => {
    const sha256 = forge.md.sha256.create();
    sha256.update(publicKey, 'utf8');
    if (domain) return `did:gatewayId:${domain}:${sha256.digest().toHex()}`;
    return `did:gatewayId:${sha256.digest().toHex()}`;
  };

  /* The `generateRSAKeyPair` function is responsible for generating a new RSA key pair with a key size
  of 4096 bits. It then converts the public and private keys to PEM format and encodes them in
  base64 before returning them as an object. */
  generateRSAKeyPair = () => {
    const keypair = forge.pki.rsa.generateKeyPair({ bits: 4096 });
    const publicPem = forge.pki.publicKeyToPem(keypair.publicKey);
    const privatePem = forge.pki.privateKeyToPem(keypair.privateKey);

    return {
      privateKey: forge.util.encode64(privatePem),
      publicPem: forge.util.encode64(publicPem),
    };
  };

  /* The `sharedEncryptWithPKI` function in the `CryptoService` class is responsible for encrypting
  data using AES-GCM encryption with a shared key that is encrypted with multiple public keys
  provided in the `accesses` parameter. Here's a breakdown of what the function does: */
  sharedEncryptWithPKI = (
    data: string,
    ...accesses: { did: string; publicPem: string }[]
  ) => {
    const { cipher, key, iv } = this.generateAESCipher();

    cipher.update(
      forge.util.createBuffer(Buffer.from(data).toString(ENCODING)),
    );
    cipher.finish();

    const aesBlob = cipher.output.getBytes();
    const tag = cipher.mode.tag.getBytes();

    const keyBlobs: Record<string, string> = {};
    accesses.map((access) => {
      if (access?.did && access?.publicPem) {
        const publicPem = access.publicPem;
        const issuePubKey = forge.pki.publicKeyFromPem(
          forge.util.decode64(publicPem),
        );
        const keyBlob = issuePubKey.encrypt(key, ENCRYPTIONSCHEME, {
          md: hashMethod.create(),
        });

        keyBlobs[access.did] = forge.util.encode64(keyBlob);
      }
    });

    return {
      aesBlob: forge.util.encode64(aesBlob),
      keyBlobs,
      iv: forge.util.encode64(iv),
      tag: forge.util.encode64(tag),
    };
  };

  /* The `encryptWithPKI` function in the `CryptoService` class is a wrapper function that takes in
  `data` to be encrypted, a `publicPem` key for encryption, and a `did` identifier. It then calls
  the `sharedEncryptWithPKI` function with the provided parameters structured as an object
  containing the `did` and `publicPem` key. This function essentially simplifies the encryption
  process by abstracting the details of how the encryption is handled with multiple public keys and
  shared key encryption using AES-GCM. */
  encryptWithPKI = (data: string, publicPem: string, did: string) => {
    return this.sharedEncryptWithPKI(data, {
      did,
      publicPem,
    });
  };

  /* The `generateAESCipher` function is responsible for generating a new AES cipher for encryption.
   */
  generateAESCipher = () => {
    const key = forge.random.getBytesSync(32);
    const iv = forge.random.getBytesSync(12);

    const cipher = forge.cipher.createCipher(AESCIPHERSTRATERGY, key);
    cipher.start({ iv });

    return { cipher, key, iv };
  };

  /* The `decryptWithPKI` function in the `CryptoService` class is responsible for decrypting data that
  was encrypted using AES-GCM encryption with a shared key that was encrypted with multiple public
  keys. Here's a breakdown of what the function does: */
  decryptWithPKI = async (
    cipher: EncryptedAESCipher,
    did: string,
    privatePem: string,
  ): Promise<string> => {
    const aesBlob = forge.util.decode64(cipher.aesBlob);
    const keyBlob = forge.util.decode64(cipher.keyBlobs[did]);
    const iv = forge.util.decode64(cipher.iv);
    const tag = forge.util.decode64(cipher.tag);

    const privateKey = forge.pki.privateKeyFromPem(privatePem);

    const key = privateKey.decrypt(keyBlob, ENCRYPTIONSCHEME, {
      md: hashMethod.create(),
    });

    const decipher = forge.cipher.createDecipher(AESCIPHERSTRATERGY, key);
    decipher.start({
      iv,
      tag: forge.util.createBuffer(tag),
    });
    decipher.update(forge.util.createBuffer(aesBlob));

    if (decipher.finish()) {
      return Buffer.from(decipher.output.toString(), ENCODING).toString();
    } else {
      throw Error('AES-GCM decryption failed.');
    }
  };
}
