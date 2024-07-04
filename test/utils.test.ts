import forge from 'node-forge';
import { errorHandler } from '../src/helpers/helper';
import { UserIdentifierType } from '../src/common/enums';
import { ValidationService } from '../src/services/validator-service';
import { authStub } from './stubs/auth.stub';
import { CryptoService } from '../src/services/crypto-service';

let validationService: ValidationService;
let cryptoService: CryptoService;

beforeAll(() => {
  validationService = new ValidationService();
  cryptoService = new CryptoService();
});

afterAll(() => {
  jest.resetAllMocks();
});

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
    const result = validationService.validateEmail('test@gmail.com');
    expect(result).toBeDefined();
    expect(() => validationService.validateEmail('wrong-email.com')).toThrow(
      'wrong-email.com is not valid',
    );
  });

  it('uuid validator', () => {
    const result = validationService.validateUUID(
      'f17ac10b-58cc-4372-a567-0e02b2c3d479',
    );
    expect(result).toBeDefined();
    expect(() =>
      validationService.validateUUID('f17ac10b-58cc-4372-a567'),
    ).toThrow('f17ac10b-58cc-4372-a567 is not valid');
  });

  it('url validator', () => {
    const result = validationService.validateURL('https://fake-url.com');
    expect(result).toBeDefined();
    expect(() =>
      validationService.validateURL('f17ac10b-58cc-4372-a567'),
    ).toThrow('f17ac10b-58cc-4372-a567 is not valid');
  });

  it('string validator', () => {
    const result = validationService.validateString('test pda');
    expect(result).toBeDefined();
    expect(() => validationService.validateString('')).toThrow(
      ' should be atleast 2 length',
    );
  });

  it('etherum validator', () => {
    const result = validationService.validateEtherumWallet(authStub().wallet);
    expect(result).toBeDefined();
    expect(() =>
      validationService.validateEtherumWallet(
        'f17ac10b-58cc-4372-a567-0e02b2c3d479',
      ),
    ).toThrow('f17ac10b-58cc-4372-a567-0e02b2c3d479 is invalid');
  });

  it('solana validator', () => {
    const result = validationService.validateSolanaWallet(
      '9aohAjd3okUogzGJT6N2cQUDwBbi2ay7oSzPPaQjQ22s',
    );
    expect(result).toBeDefined();
    expect(() =>
      validationService.validateSolanaWallet(
        'f17ac10b-58cc-4372-a567-0e02b2c3d479',
      ),
    ).toThrow('Non-base58 character');
  });

  it('date validator', () => {
    const result = validationService.validateDate(new Date().toDateString());
    expect(result).toBeDefined();
    expect(() =>
      validationService.validateDate('f17ac10b-58cc-4372-a567-0e02b2c3d479'),
    ).toThrow('f17ac10b-58cc-4372-a567-0e02b2c3d479 is not valid');
  });

  it('validate object', () => {
    let sampleObject = {
      dataModelId: 'f17ac10b-58cc-4372-a567-0e02b2c3d479',
      description: 'test',
      title: 'test',
      dateTest: new Date(),
      owner: {
        type: UserIdentifierType.USER_DID,
        value: 'test',
      },
    };
    const result = validationService.validateObjectProperties(sampleObject);
    expect(result).toBeUndefined();
  });

  it('validate v3 pda filter data model filter', async () => {
    let samplePDAFilter = {
      dataModelIds: ['111'],
    };
    expect(
      async () => await validationService.validatePDAFilter(samplePDAFilter),
    ).rejects.toThrow('111 is not valid uuid');
  });
});

describe('UTILS CRYPTO V3 TESTING', () => {
  it('generate did', () => {
    const result = cryptoService.generateDID('test');
    expect(result).toBeDefined();
  });

  it('generate RSA primary key', () => {
    const result = cryptoService.generateRSAKeyPair();
    expect(result).toBeDefined();
  });

  it('whole encryption/decryption flow', async () => {
    const { privateKey, publicPem } = cryptoService.generateRSAKeyPair();
    const did = cryptoService.generateDID('test');
    const result = cryptoService.sharedEncryptWithPKI('hello', {
      did,
      publicPem: publicPem,
    });

    const result2 = cryptoService.encryptWithPKI('hello ser', publicPem, did);
    const decryptedData = await cryptoService.decryptWithPKI(
      result,
      did,
      forge.util.decode64(privateKey),
    );
    expect(result).toBeDefined();
    expect(result2).toBeDefined();
    expect(decryptedData).toBeDefined();
    expect(decryptedData).toBe('hello');
  });
});
