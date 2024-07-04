import {
  clientTimingWrapper,
  getSignCipher,
  parameterChecker,
} from '../src/helpers/helper';
import { SignCipherEnum } from '../src/common/enums';

beforeAll(() => {
  jest.useFakeTimers();
});

afterAll(() => {
  jest.useRealTimers();
});

describe('HELPERS VALIDATORS TESTING', () => {
  it('should throw an error if no apiKey is provided', () => {
    expect(() => {
      parameterChecker(
        '',
        'someToken',
        'https://protocol.mygateway.xyz/graphql',
      );
    }).toThrow('No api Key found!');
  });

  it('should throw an error if no token is provided', () => {
    expect(() => {
      parameterChecker(
        'someApiKey',
        '',
        'https://protocol.mygateway.xyz/graphql',
      );
    }).toThrow('No token found!');
  });

  it('should throw an error if no url is provided', () => {
    expect(() => {
      parameterChecker('someApiKey', 'someToken', '');
    }).toThrow('No url found!.Use either sandbox or production url');
  });

  it('should return true for a valid url', () => {
    const validUrls = [
      'https://protocol.mygateway.xyz/graphql',
      'https://sandbox.protocol.mygateway.xyz/graphql',
      'https://develop.protocol.mygateway.xyz/graphql',
      'https://v3-dev.protocol.mygateway.xyz/graphql',
    ];

    validUrls.forEach((url) => {
      expect(parameterChecker('someApiKey', 'someToken', url)).toBe(true);
    });
  });

  it('should throw an error for an invalid url', () => {
    expect(() => {
      parameterChecker(
        'someApiKey',
        'someToken',
        'https://invalid.url/graphql',
      );
    }).toThrow('No valid url found!. Use sandbox or production url');
  });

  it('should return SignCipherEnum.ED25519 when signingCipher is SignCipherEnum.ED25519', () => {
    expect(getSignCipher(SignCipherEnum.ED25519)).toBe(SignCipherEnum.ED25519);
  });

  it('should return SignCipherEnum.SECP256K1 when signingCipher is undefined', () => {
    expect(getSignCipher(undefined)).toBe(SignCipherEnum.SECP256K1);
  });

  it('should return SignCipherEnum.SECP256K1 when signingCipher is SignCipherEnum.SECP256K1', () => {
    expect(getSignCipher(SignCipherEnum.SECP256K1)).toBe(
      SignCipherEnum.SECP256K1,
    );
  });

  it('should log the correct operation time and return the result', async () => {
    const action = jest.fn().mockResolvedValue({ data: 'test' });
    const operationName = 'TestOperation';
    const operationType = 'query';

    const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

    jest.setSystemTime(new Date('2023-01-01T00:00:00Z').getTime());

    const result = await clientTimingWrapper(
      action,
      operationName,
      operationType,
    );

    jest.setSystemTime(new Date('2023-01-01T00:00:01Z').getTime()); // Move time by 1 second

    expect(result).toEqual({ data: 'test' });
    expect(logSpy).toHaveBeenCalledWith(
      `Gateway_SDK data ${operationType} took 0 (ms)`,
    );

    logSpy.mockRestore();
  });

  it('should handle actions with different result structures', async () => {
    const action = jest.fn().mockResolvedValue({ result: 'test' });
    const operationName = 'AnotherTestOperation';
    const operationType = 'mutation';

    const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

    jest.setSystemTime(new Date('2023-01-01T00:00:00Z').getTime());
    const startTime = new Date();

    const result = await clientTimingWrapper(
      action,
      operationName,
      operationType,
    );

    jest.setSystemTime(new Date('2023-01-01T00:00:01Z').getTime()); // Move time by 1 second

    expect(result).toEqual({ result: 'test' });
    expect(logSpy).toHaveBeenCalledWith(
      `Gateway_SDK result ${operationType} took 0 (ms)`,
    );

    logSpy.mockRestore();
  });

  it('should handle actions with empty results', async () => {
    const action = jest.fn().mockResolvedValue({});
    const operationName = 'EmptyTestOperation';
    const operationType = 'subscription';

    const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

    jest.setSystemTime(new Date('2023-01-01T00:00:00Z').getTime());

    const result = await clientTimingWrapper(
      action,
      operationName,
      operationType,
    );

    jest.setSystemTime(new Date('2023-01-01T00:00:01Z').getTime()); // Move time by 1 second

    expect(result).toEqual({});
    expect(logSpy).toHaveBeenCalledWith(
      `Gateway_SDK undefined subscription took 0 (ms)`,
    );

    logSpy.mockRestore();
  });
});
