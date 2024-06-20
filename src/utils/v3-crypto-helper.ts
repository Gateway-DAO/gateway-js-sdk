import forge from 'node-forge';
import { EncryptedAESCipher } from '../types';
import { AESCIPHERSTRATERGY, ENCODING, ENCRYPTIONSCHEME } from './constants';

export const hashMethod = forge.md.sha256;

// generate did based on Gateway V3 Protocol
export const generateDID = (publicKey: string, domain?: string) => {
  const sha256 = forge.md.sha256.create();
  sha256.update(publicKey, 'utf8');
  if (domain) return `did:gatewayId:${domain}:${sha256.digest().toHex()}`;
  return `did:gatewayId:${sha256.digest().toHex()}`;
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
  ...accesses: ({ did: string; publicPem: string } | undefined)[]
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

  if (!privatePem) {
    throw Error('Private key is required for decryption.');
  }

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

export const sharedDecryptWithPKI = async (
  cipher: EncryptedAESCipher,
  privatePem: string,
  did: string,
): Promise<string> => {
  const aesBlob = forge.util.decode64(cipher.aesBlob);
  const keyBlob = forge.util.decode64(cipher.keyBlobs[did]);
  const iv = forge.util.decode64(cipher.iv);
  const tag = forge.util.decode64(cipher.tag);

  if (!privatePem) {
    throw Error('Private key is required for decryption.');
  }

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
