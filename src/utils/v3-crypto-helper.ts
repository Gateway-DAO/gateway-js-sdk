import forge from 'node-forge';
import canonicalize from 'canonicalize';
import { createHash, createPublicKey, verify } from 'crypto';
import { ethers } from 'ethers';
import { EncryptedAESCipher, SignCipherEnum } from '../types';
import { AESCIPHERSTRATERGY, ENCODING, ENCRYPTIONSCHEME } from './constants';

export const hashMethod = forge.md.sha256;

/**
 * Given a object gives json encoded value and we can use the result to sign in and thus generating signature
 */
export const jsonEncoder = (object: any) => {
  return createHash('sha256')
    .update(canonicalize(object) as string)
    .digest('hex');
};

/**
 * Generates a did based on Gateway V3 Protocol uses users public key
 */
export const generateDID = (publicKey: string, domain?: string) => {
  const sha256 = forge.md.sha256.create();
  sha256.update(publicKey, 'utf8');
  if (domain) return `did:gatewayId:${domain}:${sha256.digest().toHex()}`;
  return `did:gatewayId:${sha256.digest().toHex()}`;
};

/**
 * Validates the signature of the body used to protect the API with invalid signatures
 */
export const validateSignature = ({
  signature,
  signingKey,
  signingCipher,
  data,
}: {
  signature: string;
  signingKey: string;
  signingCipher: SignCipherEnum;
  data: any;
}) => {
  try {
    const bodyHash = jsonEncoder(data);
    let isValid: boolean = false;
    if (signingCipher === SignCipherEnum.ED25519) {
      const publicKey = createPublicKey({
        key: Buffer.from(signingKey, 'hex'),
        format: 'der',
        type: 'spki',
      });
      isValid = verify(
        null,
        Buffer.from(bodyHash),
        publicKey,
        Buffer.from(signingKey, 'hex'),
      );
    } else if (signingCipher === SignCipherEnum.SECP256K1) {
      isValid =
        ethers.utils.getAddress(signingKey) ===
        ethers.utils.verifyMessage(bodyHash, signature);
    } else {
      throw new Error(`Cipher ${signingCipher} not found!`);
    }
    if (!isValid) {
      throw new Error('Invalid signature');
    }
  } catch (error) {
    throw new Error('Invalid signature');
  }
};

export const generateNewEtherumWallet = (privateKey: string) => {
  return new ethers.Wallet(privateKey);
};

export const signMessage = async (
  wallet: ethers.Wallet,
  message: string,
): Promise<string> => {
  return await wallet.signMessage(message);
};

export const generateRSAKeyPair = () => {
  const keypair = forge.pki.rsa.generateKeyPair({ bits: 4096 });
  const publicPem = forge.pki.publicKeyToPem(keypair.publicKey);
  const privatePem = forge.pki.privateKeyToPem(keypair.privateKey);

  return {
    privateKey: forge.util.encode64(privatePem),
    publicPem: forge.util.encode64(publicPem),
  };
};

export const sharedEncryptWithPKI = (
  data: string,
  ...accesses: { did: string; publicPem: string }[]
) => {
  const { cipher, key, iv } = generateAESCipher();

  cipher.update(forge.util.createBuffer(Buffer.from(data).toString(ENCODING)));
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

export const encryptWithPKI = (
  data: string,
  publicPem: string,
  did: string,
) => {
  return sharedEncryptWithPKI(data, {
    did,
    publicPem,
  });
};

export const generateAESCipher = () => {
  const key = forge.random.getBytesSync(32);
  const iv = forge.random.getBytesSync(12);

  const cipher = forge.cipher.createCipher(AESCIPHERSTRATERGY, key);
  cipher.start({ iv });

  return { cipher, key, iv };
};

export const decryptWithPKI = async (
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
