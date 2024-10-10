import { Ed25519Keypair } from '@mysten/sui/keypairs/ed25519';
import { verifyPersonalMessageSignature } from '@mysten/sui/verify';
import { isValidSuiAddress } from '@mysten/sui/utils';
import { SuiService } from '../src/services/sui-service';

jest.mock('@mysten/sui/keypairs/ed25519');
jest.mock('@mysten/sui/verify');
jest.mock('@mysten/sui/utils');

describe('SuiService', () => {
  let mockPrivateKey: string;
  let mockKeyPair: any;
  let mockPublicKey: any;

  beforeEach(() => {
    mockPrivateKey = 'mock-private-key';

    // Mock the Ed25519Keypair and public key functionality
    mockPublicKey = {
      toSuiAddress: jest.fn().mockReturnValue('mock-sui-address'),
    };

    mockKeyPair = {
      getPublicKey: jest.fn().mockReturnValue(mockPublicKey),
      signPersonalMessage: jest.fn().mockResolvedValue({
        signature: 'mock-signature',
      }),
    };

    (Ed25519Keypair.fromSecretKey as jest.Mock).mockReturnValue(mockKeyPair);
  });

  describe('signMessage', () => {
    it('should sign a message and return the signature and signing key', async () => {
      const message = 'test-message';
      const suiService = new SuiService(mockPrivateKey);

      const result = await suiService.signMessage(message);

      // Verify that the keypair was created from the secret key
      expect(Ed25519Keypair.fromSecretKey).toHaveBeenCalledWith(mockPrivateKey);

      // Verify that the message was signed
      expect(mockKeyPair.signPersonalMessage).toHaveBeenCalledWith(
        new TextEncoder().encode(message),
      );

      // Verify the return value
      expect(result).toEqual({
        signature: 'mock-signature',
        signingKey: 'mock-sui-address',
      });
    });
  });

  describe('verifyMessage', () => {
    it('should return true if the signature matches the Sui address', async () => {
      const message = 'test-message';
      const signature = 'mock-signature';
      const suiAddress = 'mock-sui-address';

      (verifyPersonalMessageSignature as jest.Mock).mockResolvedValue(
        mockPublicKey,
      );

      const result = await SuiService.verifyMessage(
        message,
        signature,
        suiAddress,
      );

      expect(verifyPersonalMessageSignature).toHaveBeenCalledWith(
        new TextEncoder().encode(message),
        signature,
      );
      expect(result).toBe(true);
    });

    it('should return false if the signature does not match the Sui address', async () => {
      const message = 'test-message';
      const signature = 'mock-signature';
      const suiAddress = 'another-sui-address';

      (verifyPersonalMessageSignature as jest.Mock).mockResolvedValue(
        mockPublicKey,
      );

      const result = await SuiService.verifyMessage(
        message,
        signature,
        suiAddress,
      );

      expect(verifyPersonalMessageSignature).toHaveBeenCalledWith(
        new TextEncoder().encode(message),
        signature,
      );
      expect(result).toBe(false);
    });
  });

  describe('validateWallet', () => {
    it('should validate if the wallet is a valid Sui address', () => {
      const wallet = 'valid-sui-address';
      (isValidSuiAddress as unknown as jest.Mock).mockReturnValue(true);

      const result = SuiService.validateWallet(wallet);

      expect(isValidSuiAddress).toHaveBeenCalledWith(wallet);
      expect(result).toBe(true);
    });

    it('should return false for an invalid Sui address', () => {
      const wallet = 'invalid-sui-address';
      (isValidSuiAddress as unknown as jest.Mock).mockReturnValue(false);

      const result = SuiService.validateWallet(wallet);

      expect(isValidSuiAddress).toHaveBeenCalledWith(wallet);
      expect(result).toBe(false);
    });
  });
});
