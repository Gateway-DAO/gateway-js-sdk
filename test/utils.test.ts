import forge from 'node-forge';
import { Chain, UserIdentifierType } from '../src/types';
import { errorHandler } from '../src/utils/errorHandler';
import {
  isDateValid,
  isEmailValid,
  isStringValid,
  isUUIDValid,
  isValidUrl,
  isWalletAddressValid,
  validateEtherumWallet,
  validateObjectProperties,
  validatePDAFilter,
  validateSolanaWallet,
} from '../src/utils/validators';
import {
  decryptWithPKI,
  encryptWithPKI,
  generateDID,
  generateNewEtherumWallet,
  generateRSAKeyPair,
  jsonEncoder,
  sharedEncryptWithPKI,
} from '../src/utils/v3-crypto-helper';
import { authStub } from './stubs/v2/auth.stub';

describe('UTILS VALIDATORS TESTING', () => {
  it('error handler testing normal', () => {
    const result = errorHandler('Something went wrong');
    expect(result).toBeDefined();
  });

  it('error handler testing array', () => {
    const result = errorHandler([{ message: 'cant acccess pda' }]);
    expect(result).toBeDefined();
  });

  it('error handler testing object', () => {
    const result = errorHandler({ message: 'cant acccess pda' });
    expect(result).toBeDefined();
  });

  it('email validator', () => {
    const result = isEmailValid('test@gmail.com');
    expect(result).toBeDefined();
    expect(() => isEmailValid('wrong-email.com')).toThrow(
      'wrong-email.com is not valid',
    );
  });

  it('uuid validator', () => {
    const result = isUUIDValid('f17ac10b-58cc-4372-a567-0e02b2c3d479');
    expect(result).toBeDefined();
    expect(() => isUUIDValid('f17ac10b-58cc-4372-a567')).toThrow(
      'f17ac10b-58cc-4372-a567 is not valid',
    );
  });

  it('url validator', () => {
    const result = isValidUrl('https://fake-url.com');
    expect(result).toBeDefined();
    expect(() => isValidUrl('f17ac10b-58cc-4372-a567')).toThrow(
      'f17ac10b-58cc-4372-a567 is not valid',
    );
  });

  it('string validator', () => {
    const result = isStringValid('test pda');
    expect(result).toBeDefined();
    expect(() => isStringValid('')).toThrow(' should be atleast 2 length');
  });

  it('etherum validator', () => {
    const result = validateEtherumWallet(authStub().wallet);
    expect(result).toBeDefined();
    expect(() =>
      validateEtherumWallet('f17ac10b-58cc-4372-a567-0e02b2c3d479'),
    ).toThrow('f17ac10b-58cc-4372-a567-0e02b2c3d479 is invalid');
  });

  it('etherum & solana validator', () => {
    const result = isWalletAddressValid(
      '9aohAjd3okUogzGJT6N2cQUDwBbi2ay7oSzPPaQjQ22s',
      Chain.SOL,
    );
    expect(result).toBeDefined();
    expect(() =>
      isWalletAddressValid('f17ac10b-58cc-4372-a567-0e02b2c3d479', Chain.SOL),
    ).toThrow('Non-base58 character');
  });

  it('solana validator', () => {
    const result = validateSolanaWallet(
      '9aohAjd3okUogzGJT6N2cQUDwBbi2ay7oSzPPaQjQ22s',
    );
    expect(result).toBeDefined();
    expect(() =>
      validateSolanaWallet('f17ac10b-58cc-4372-a567-0e02b2c3d479'),
    ).toThrow('Non-base58 character');
  });

  it('date validator', () => {
    const result = isDateValid(new Date().toDateString());
    expect(result).toBeDefined();
    expect(() => isDateValid('f17ac10b-58cc-4372-a567-0e02b2c3d479')).toThrow(
      'f17ac10b-58cc-4372-a567-0e02b2c3d479 is not valid',
    );
  });

  it('validate object', () => {
    let sampleObject = {
      dataModelId: 'f17ac10b-58cc-4372-a567-0e02b2c3d479',
      description: 'test',
      title: 'test',
      dateTest: new Date(),
      owner: {
        type: UserIdentifierType.GATEWAY_ID,
        value: 'test',
      },
    };
    const result = validateObjectProperties(sampleObject);
    expect(result).toBeUndefined();
  });

  it('validate v3 pda filter data model filter', async () => {
    let samplePDAFilter = {
      dataModelIds: ['111'],
    };
    expect(
      async () => await validatePDAFilter(samplePDAFilter),
    ).rejects.toThrow('111 is not valid uuid');
  });

  it('validate v3 pda filter ids filter', async () => {
    let samplePDAFilter = {
      ids: ['111'],
    };
    expect(
      async () => await validatePDAFilter(samplePDAFilter),
    ).rejects.toThrow('111 is not valid uuid');
  });
});

describe('UTILS CRYPTO V3 TESTING', () => {
  it('generate did', () => {
    const result = generateDID('test');
    expect(result).toBeDefined();
  });

  it('generate new etherum wallet', () => {
    const result = generateNewEtherumWallet();
    expect(result).toBeDefined();
  });

  it('generate RSA primary key', () => {
    const result = generateRSAKeyPair();
    expect(result).toBeDefined();
  });

  it('whole encryption/decryption flow', async () => {
    const { privateKey, publicPem } = generateRSAKeyPair();
    const did = generateDID('test');
    const result = sharedEncryptWithPKI('hello', {
      did,
      publicPem: publicPem,
    });

    const result2 = encryptWithPKI('hello ser', publicPem, did);
    const decryptedData = await decryptWithPKI(
      result,
      did,
      forge.util.decode64(privateKey),
    );
    expect(result).toBeDefined();
    expect(result2).toBeDefined();
    expect(decryptedData).toBeDefined();
    expect(decryptedData).toBe('hello');
  });

  it('json encoder', () => {
    let sampleObject = {
      key: 'value',
    };
    const encodedObject = jsonEncoder(sampleObject);
    expect(encodedObject).toBeDefined();
  });
});
