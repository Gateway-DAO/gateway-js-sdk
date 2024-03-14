import { Chain, UserIdentifierType } from '../src/types';
import { errorHandler } from '../src/utils/errorHandler';
import {
  isDateValid,
  isEmailValid,
  isStringValid,
  isUUIDValid,
  isValidUrl,
  isWalletAddressvalid,
  validateEtherumWallet,
  validateObjectProperties,
  validateSolanaWallet,
} from '../src/utils/validators';
import { authStub } from './stubs/auth.stub';

describe('UTILS TESTING', () => {
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
    const result = isWalletAddressvalid(
      '9aohAjd3okUogzGJT6N2cQUDwBbi2ay7oSzPPaQjQ22s',
      Chain.SOL,
    );
    expect(result).toBeDefined();
    expect(() =>
      isWalletAddressvalid('f17ac10b-58cc-4372-a567-0e02b2c3d479', Chain.SOL),
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
});
