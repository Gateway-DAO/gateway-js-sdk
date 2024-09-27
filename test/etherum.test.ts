import { ethers } from 'ethers';
import { EtherumService } from '../src/services/ethereum-service';
import { WalletSignMessageType } from '../src/common/types';

jest.mock('ethers', () => ({
  ethers: {
    Wallet: jest.fn(() => ({
      signMessage: jest.fn(),
      getAddress: jest.fn(),
    })),
    utils: {
      verifyMessage: jest.fn(),
      isAddress: jest.fn(),
    },
  },
}));

describe('EtherumService', () => {
  let service: EtherumService;
  const mockPrivateKey = 'mockPrivateKey';
  const mockWalletAddress = 'mockWalletAddress';
  const mockSignature = 'mockSignature';
  const mockMessage = 'mockMessage';

  beforeEach(() => {
    service = new EtherumService(mockPrivateKey);

    (service['wallet'].signMessage as jest.Mock).mockResolvedValue(
      mockSignature,
    );
    (service['wallet'].getAddress as jest.Mock).mockResolvedValue(
      mockWalletAddress,
    );
  });

  describe('constructor', () => {
    it('should generate a new wallet using the provided private key', () => {
      expect(ethers.Wallet).toHaveBeenCalledWith(mockPrivateKey);
    });
  });

  describe('signMessage', () => {
    it('should sign a message and return the signature and signing key', async () => {
      const result: WalletSignMessageType =
        await service.signMessage(mockMessage);

      expect(service['wallet'].signMessage).toHaveBeenCalledWith(mockMessage);
      expect(service['wallet'].getAddress).toHaveBeenCalled();
      expect(result).toEqual({
        signature: mockSignature,
        signingKey: mockWalletAddress,
      });
    });
  });

  describe('verifyMessage', () => {
    it('should verify a signed message with the wallet address', async () => {
      (ethers.utils.verifyMessage as jest.Mock).mockReturnValue(
        mockWalletAddress,
      );

      const isValid = await EtherumService.verifyMessage(
        mockSignature,
        mockMessage,
        mockWalletAddress,
      );

      expect(ethers.utils.verifyMessage).toHaveBeenCalledWith(
        mockMessage,
        mockSignature,
      );
      expect(isValid).toBe(true);
    });

    it('should return false if the recovered address does not match the wallet address', async () => {
      (ethers.utils.verifyMessage as jest.Mock).mockReturnValue(
        'differentWalletAddress',
      );

      const isValid = await EtherumService.verifyMessage(
        mockSignature,
        mockMessage,
        mockWalletAddress,
      );

      expect(isValid).toBe(false);
    });
  });

  describe('validateWallet', () => {
    it('should validate a wallet address', () => {
      (ethers.utils.isAddress as jest.Mock).mockReturnValue(true);

      const isValid = EtherumService.validateWallet(mockWalletAddress);

      expect(ethers.utils.isAddress).toHaveBeenCalledWith(mockWalletAddress);
      expect(isValid).toBe(true);
    });

    it('should return false for an invalid wallet address', () => {
      (ethers.utils.isAddress as jest.Mock).mockReturnValue(false);

      const isValid = EtherumService.validateWallet('invalidWallet');

      expect(isValid).toBe(false);
    });
  });
});
