import { ValidationService } from '../src/services/validator-service';
import { authDetails } from './stubs/common.stub';
import mime from 'mime-types';

let validationService: ValidationService;

beforeAll(() => {
  validationService = new ValidationService();
});

afterAll(() => {
  jest.resetAllMocks();
});

describe('UTILS VALIDATORS TESTING', () => {
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
    const result = validationService.validateEtherumWallet(
      authDetails().wallet_address,
    );
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
        type: 'USER_DID',
        value: 'test',
      },
    };
    const result = validationService.validateObjectProperties(sampleObject);
    expect(result).toBeUndefined();
  });

  it('should return true for a valid DID', () => {
    const validDID = 'did:gatewayid:example123';

    const result = validationService.validateDID(validDID);

    expect(result).toBe(true);
  });

  it('should throw an error for an invalid DID', () => {
    const invalidDID = 'invalidDID';

    expect(() => validationService.validateDID(invalidDID)).toThrow(
      `${invalidDID} is not valid did`,
    );
  });

  it('should throw an error if DID does not start with "did:gatewayid:"', () => {
    const wrongPrefixDID = 'did:otherid:example123';

    expect(() => validationService.validateDID(wrongPrefixDID)).toThrow(
      `${wrongPrefixDID} is not valid did`,
    );
  });

  it('should return name and extension for a valid file name', () => {
    const fileName = 'example.txt';

    const mockMimeContentType = jest
      .spyOn(mime, 'contentType')
      .mockReturnValue('text/plain');

    const result = validationService.validateFileName(fileName);

    expect(result).toEqual({
      name: 'example',
      extension: 'text/plain',
    });

    expect(mockMimeContentType).toHaveBeenCalledWith('txt');
  });

  it('should return default mime type for unknown extension', () => {
    const fileName = 'example.unknown';

    const mockMimeContentType = jest
      .spyOn(mime, 'contentType')
      .mockReturnValue(false);

    const result = validationService.validateFileName(fileName);

    expect(result).toEqual({
      name: 'example',
      extension: 'application/octet-stream',
    });

    expect(mockMimeContentType).toHaveBeenCalledWith('unknown');
  });

  it('should throw an error if file name does not contain an extension', () => {
    const fileName = 'example';

    expect(() => validationService.validateFileName(fileName)).toThrow(
      'Invalid file name. File name or extension is missing.',
    );
  });

  it('should throw an error if the file name or extension is empty', () => {
    const fileName = '.txt';

    expect(() => validationService.validateFileName(fileName)).toThrow(
      'Invalid file name. Name or extension is missing.',
    );
  });
});

describe('validateObjectProperties', () => {
  beforeEach(() => {
    validationService = new ValidationService();

    jest.spyOn(validationService, 'validateDID').mockImplementation(jest.fn());
    jest.spyOn(validationService, 'validateUUID').mockImplementation(jest.fn());
    jest.spyOn(validationService, 'validateDate').mockImplementation(jest.fn());
    jest
      .spyOn(validationService, 'validateString')
      .mockImplementation(jest.fn());
  });

  it('should call validateDID when key is "did"', () => {
    const obj = { did: 'did:gatewayid:example123' };

    validationService.validateObjectProperties(obj);

    expect(validationService.validateDID).toHaveBeenCalledWith(
      'did:gatewayid:example123',
    );
  });

  it('should call validateUUID when key contains "id"', () => {
    const obj = { assetId: '123e4567-e89b-12d3-a456-426614174000' };

    validationService.validateObjectProperties(obj);

    expect(validationService.validateUUID).toHaveBeenCalledWith(
      '123e4567-e89b-12d3-a456-426614174000',
    );
  });

  it('should call validateDate when key contains "date"', () => {
    const obj = { createdDate: '2024-01-01T00:00:00Z' };

    validationService.validateObjectProperties(obj);

    expect(validationService.validateDate).toHaveBeenCalledWith(
      '2024-01-01T00:00:00Z',
    );
  });

  it('should call validateString for other string keys', () => {
    const obj = { name: 'John Doe' };

    validationService.validateObjectProperties(obj);

    expect(validationService.validateString).toHaveBeenCalledWith('John Doe');
  });

  it('should skip non-string properties', () => {
    const obj = { count: 10, active: true };

    validationService.validateObjectProperties(obj);

    expect(validationService.validateDID).not.toHaveBeenCalled();
    expect(validationService.validateUUID).not.toHaveBeenCalled();
    expect(validationService.validateDate).not.toHaveBeenCalled();
    expect(validationService.validateString).not.toHaveBeenCalled();
  });

  it('should throw an error if validation fails', () => {
    const obj = { did: 'invalidDID' };

    // Spy on the validateDID method and make it throw an error
    jest.spyOn(validationService, 'validateDID').mockImplementation(() => {
      throw new Error('Invalid DID');
    });

    expect(() => validationService.validateObjectProperties(obj)).toThrow(
      'Invalid DID',
    );
  });
});
