import forge from 'node-forge';
import {
  AESCIPHERSTRATERGY,
  ENCODING,
  ENCRYPTIONSCHEME,
} from '../common/constants';
import { EncryptedAESCipher } from '../common/enums';
import { ethers } from 'ethers';
import { Keypair } from '@solana/web3.js';

export const hashMethod = forge.md.sha256;

export class CryptoService {
  /**
   * The function generates a Decentralized Identifier (DID) based on a public key and an optional
   * domain.
   * @param {string} publicKey - The `publicKey` parameter is a string that represents a public key
   * used for generating a Decentralized Identifier (DID).
   * @param {string} [domain] - The `domain` parameter in the `generateDID` function is an optional
   * parameter. It represents the domain associated with the DID (Decentralized Identifier) being
   * generated. If provided, it will be included in the generated DID string.
   * @returns The function `generateDID` returns a Decentralized Identifier (DID) based on the provided
   * public key and optional domain. If a domain is provided, the function returns a DID in the format
   * `did:gatewayId::`. If no domain is provided, the function returns a DID
   * in the format `did:gatewayId:mygateway:${sha256_digest}
   */
  public generateDID(publicKey: string, domain?: string) {
    const sha256 = forge.md.sha256.create();
    sha256.update(publicKey, 'utf8');

    if (domain) return `did:gatewayId:${domain}:${sha256.digest().toHex()}`;
    return `did:gatewayId:mygateway:${sha256.digest().toHex()}`;
  }

  /**
   * The function generates an RSA key pair with a 4096-bit length and returns the private and public
   * keys encoded in base64 format.
   * @returns The `generateRSAKeyPair` function returns an object with two properties: `privateKey` and
   * `publicPem`. The `privateKey` property contains the private key encoded in base64 format, and the
   * `publicPem` property contains the public key encoded in base64 format.
   */
  public generateRSAKeyPair() {
    const keypair = forge.pki.rsa.generateKeyPair({ bits: 4096 });
    const publicPem = forge.pki.publicKeyToPem(keypair.publicKey);
    const privatePem = forge.pki.privateKeyToPem(keypair.privateKey);

    return {
      privateKey: forge.util.encode64(privatePem),
      publicPem: forge.util.encode64(publicPem),
    };
  }

  /**
   * The function generates a new Ethereum wallet using ethers.js.
   * @returns An Ethereum wallet created randomly using the ethers.js library.
   */
  public generateNewEtherumWallet(): ethers.Wallet {
    return ethers.Wallet.createRandom();
  }

  /**
   * The function generates a new Solana key pair using TypeScript.
   * @returns A new Solana key pair is being returned.
   */
  public generateNewSolanaKeyPair(): Keypair {
    return Keypair.generate();
  }

  /**
   * The function `sharedEncryptWithPKI` encrypts data using AES encryption and multiple public keys
   * provided by different accessors.
   * @param {string} data - The `data` parameter in the `sharedEncryptWithPKI` function is a string
   * that represents the data you want to encrypt using public key infrastructure (PKI) encryption.
   * @param {{ did: string; publicPem: string }[]} accesses - The `accesses` parameter in the
   * `sharedEncryptWithPKI` function is a rest parameter that allows you to pass multiple objects
   * containing the `did` (Decentralized Identifier) and `publicPem` (public key in PEM format)
   * properties. These objects represent the access information for
   * @returns The `sharedEncryptWithPKI` function returns an object with the following properties:
   * - `aesBlob`: The encrypted data in Base64 format
   * - `keyBlobs`: An object containing encrypted AES keys for each access entry, where the key is the
   * DID and the value is the encrypted key in Base64 format
   * - `iv`: The initialization vector used for encryption in Base64 format
   */
  public sharedEncryptWithPKI(
    data: string,
    ...accesses: { did: string; publicPem: string }[]
  ) {
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
  }

  /**
   * The function `encryptWithPKI` encrypts data using a public key and a specified DID.
   * @param {string} data - The `data` parameter is the string that you want to encrypt using the
   * public key provided in the `publicPem` parameter.
   * @param {string} publicPem - The `publicPem` parameter in the `encryptWithPKI` function is a string
   * that represents the public key in PEM format. This public key is used for encrypting the data
   * before sending it securely.
   * @param {string} did - The `did` parameter in the `encryptWithPKI` function likely stands for
   * Decentralized Identifier. It is a unique identifier that is used to represent a digital identity
   * on a decentralized network or blockchain.
   * @returns The `encryptWithPKI` function is returning the result of calling the
   * `sharedEncryptWithPKI` function with the `data` and an object containing the `did` and `publicPem`
   * properties.
   */
  public encryptWithPKI(data: string, publicPem: string, did: string) {
    return this.sharedEncryptWithPKI(data, {
      did,
      publicPem,
    });
  }

  /**
   * The function generates a random AES cipher key and initialization vector using the Forge library
   * in TypeScript.
   * @returns An object is being returned with three properties: `cipher`, `key`, and `iv`. The
   * `cipher` property contains the AES cipher created using the specified key and initialization
   * vector (iv). The `key` property contains the randomly generated key used for encryption. The `iv`
   * property contains the randomly generated initialization vector used for encryption.
   */
  public generateAESCipher() {
    const key = forge.random.getBytesSync(32);
    const iv = forge.random.getBytesSync(12);

    const cipher = forge.cipher.createCipher(AESCIPHERSTRATERGY, key);
    cipher.start({ iv });

    return { cipher, key, iv };
  }

  /**
   * This TypeScript function decrypts an AES cipher using a private key from a PKI infrastructure.
   * @param {EncryptedAESCipher} cipher - The `cipher` parameter in the `decryptWithPKI` function is an
   * object that contains the following properties:
   * @param {string} did - The `did` parameter in the `decryptWithPKI` function stands for
   * Decentralized Identifier. It is a unique identifier that represents a digital identity. In the
   * context of the function, the `did` parameter is used to retrieve the specific key blob needed for
   * decryption from the `Encrypted
   * @param {string} privatePem - The `privatePem` parameter in the `decryptWithPKI` function is a
   * string that represents the private key in PEM format. This private key is used to decrypt the key
   * blob that was encrypted with the public key corresponding to this private key. The decrypted key
   * is then used to decrypt the
   * @returns The `decryptWithPKI` function returns a Promise that resolves to a decrypted string after
   * decrypting the provided AES cipher using the private key associated with the given DID
   * (Decentralized Identifier) and the private PEM key.
   */
  public async decryptWithPKI(
    cipher: EncryptedAESCipher,
    did: string,
    privatePem: string,
  ): Promise<string> {
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
  }
}
