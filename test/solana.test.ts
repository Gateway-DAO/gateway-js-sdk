import { PublicKey, Keypair } from '@solana/web3.js';
import { ethers } from 'ethers';
import nacl from 'tweetnacl';
import { decodeUTF8 } from 'tweetnacl-util';
import { SolanaService } from '../src/services/solana-service';
import { WalletSignMessageType } from '../src/common/types';

jest.mock('@solana/web3.js', () => ({
  PublicKey: jest.fn().mockImplementation((key) => ({
    toBase58: jest.fn().mockReturnValue('mockPublicKeyBase58'),
    toBytes: jest.fn().mockReturnValue(new Uint8Array(32)),
  })),
  Keypair: {
    fromSecretKey: jest.fn(),
  },
}));

(jest.mocked(PublicKey).isOnCurve as jest.Mock) = jest
  .fn()
  .mockReturnValue(true);

jest.mock('ethers', () => ({
  ethers: {
    utils: {
      base58: {
        encode: jest.fn(),
        decode: jest.fn(),
      },
    },
  },
}));

jest.mock('tweetnacl', () => ({
  sign: {
    detached: {
      verify: jest.fn(),
    },
  },
}));

jest.mock('tweetnacl-util', () => ({
  decodeUTF8: jest.fn(),
}));

describe('SolanaService', () => {
  let service: SolanaService;
  const mockPrivateKey = 'mockPrivateKey';
  const mockSignature = 'mockSignature';
  const mockPublicKey = 'mockPublicKey';
  const mockMessage = 'mockMessage';

  beforeEach(() => {
    service = new SolanaService(mockPrivateKey);
    (ethers.utils.base58.encode as jest.Mock).mockReturnValue(
      'mockEncodedSignature',
    );
    (ethers.utils.base58.decode as jest.Mock).mockReturnValue(
      new Uint8Array(32),
    );
  });

  describe('constructor', () => {
    it('should create a Keypair using the provided private key', () => {
      expect(Keypair.fromSecretKey).toHaveBeenCalled();
    });
  });

  describe('getKeyPair', () => {
    it('should return a keypair when provided a private key', () => {
      const keypair = service['getKeyPair']();
      expect(Keypair.fromSecretKey).toHaveBeenCalledWith(
        expect.any(Uint8Array),
      );
    });
  });

  describe('verifyMessage', () => {
    it('should verify a signed message with the public key', async () => {
      (nacl.sign.detached.verify as jest.Mock).mockImplementation(() => true);

      const isValid = await SolanaService.verifyMessage(
        mockMessage,
        mockSignature,
        mockPublicKey,
      );
      expect(ethers.utils.base58.decode).toHaveBeenCalledWith(mockSignature);
      expect(ethers.utils.base58.decode).toHaveBeenCalledWith(mockPublicKey);
      expect(nacl.sign.detached.verify).toHaveBeenCalledWith(
        expect.any(Uint8Array),
        expect.any(Uint8Array),
        expect.any(Uint8Array),
      );
      expect(isValid).toBe(true);
    });

    it('should return false if the verification fails', async () => {
      (nacl.sign.detached.verify as jest.Mock).mockImplementation(() => false);

      const isValid = await SolanaService.verifyMessage(
        mockMessage,
        mockSignature,
        mockPublicKey,
      );
      expect(isValid).toBe(false);
    });
  });

  describe('validateWallet', () => {
    it('should validate a wallet address', () => {
      const result = SolanaService.validateWallet(mockPublicKey);
      expect(PublicKey).toHaveBeenCalledWith(mockPublicKey);
      expect(PublicKey.isOnCurve).toHaveBeenCalled();
      expect(result).toBe('mockPublicKeyBase58');
    });

    it('should throw an error for an invalid wallet address', () => {
      (PublicKey.isOnCurve as jest.Mock).mockReturnValueOnce(false);
      expect(() => SolanaService.validateWallet('invalidPublicKey')).toThrow(
        'Invalid wallet address',
      );
      expect(PublicKey.isOnCurve).toHaveBeenCalled();
    });
  });
});
