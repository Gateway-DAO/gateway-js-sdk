import { GraphQLClient } from 'graphql-request';
import {
  organizationCreateStub,
  organizationStub,
} from './stubs/organization.stub';
import { userStub } from './stubs/user.stub';
import { getSdk, Sdk } from '../gatewaySdk/sources/Gateway';
import { ethers } from 'ethers';
import { OrganizationMockService } from '../__mocks__/organization.mock';
import { Organization } from '../src/modules/organization/organization';
import { ValidationService } from '../src/services/validator-service';
import { WalletService } from '../src/services/wallet-service';
import {
  OrganizationIdentifierType,
  OrganizationRole,
  UserIdentifierType,
} from '../src/common/enums';

let sdk: Sdk;
let organization: Organization;
let wallet: ethers.Wallet;

beforeAll(() => {
  sdk = getSdk(new GraphQLClient(''));
  wallet = ethers.Wallet.createRandom();
  organization = new Organization(
    sdk,
    new ValidationService(),
    {
      apiKey: '',
      token: '',
      url: '',
      walletPrivateKey: wallet.privateKey,
    },
    new WalletService({ walletPrivateKey: wallet.privateKey }),
  );
});

afterAll(() => {
  jest.resetAllMocks();
});

describe('ORGANIZATION SERVICE TESTING', () => {
  it('organization create', async () => {
    const { createOrganizationMock } = OrganizationMockService(sdk);

    const { createOrganization } = await organization.createOrganization(
      organizationCreateStub(),
    );

    expect(createOrganization.name).toEqual(organizationStub().name);
    expect(createOrganizationMock).toHaveBeenCalled();
  });

  it('organization create to throw error', async () => {
    const { createOrganizationMock } = OrganizationMockService(sdk);

    expect(
      async () =>
        await organization.createOrganization(
          organizationCreateStub({ username: '' }),
        ),
    ).rejects.toThrow(' should be atleast 2 length');

    expect(createOrganizationMock).toHaveBeenCalled();
  });

  it('get single organization', async () => {
    const { getOrganizationMock } = OrganizationMockService(sdk);

    const res = await organization.getOrganization(
      OrganizationIdentifierType.ORG_DID,
      organizationStub().did,
    );

    expect(res.organization?.did).toEqual(organizationStub().did);
    expect(getOrganizationMock).toHaveBeenCalled();
  });

  it('get single organization to throw error', async () => {
    const { getOrganizationMock } = OrganizationMockService(sdk);

    expect(
      async () =>
        await organization.getOrganization(
          OrganizationIdentifierType.ORG_DID,
          organizationStub({ did: '' }).did,
        ),
    ).rejects.toThrow('');

    expect(getOrganizationMock).toHaveBeenCalled();
  });

  it('update organization', async () => {
    const { updateOrganizationMock } = OrganizationMockService(sdk);

    let updatedOrgObj = {
      description: 'updated description',
      did: organizationStub().did,
    };
    const { updateOrganization } = await organization.updateOrganization({
      ...updatedOrgObj,
    });

    expect(updateOrganization.description).toEqual(updatedOrgObj.description);
    expect(updateOrganizationMock).toHaveBeenCalled();
  });

  it('update organization to throw error', async () => {
    const { updateOrganizationMock } = OrganizationMockService(sdk);

    let updatedOrgObj = {
      description: 'updated description',
      did: organizationStub({ did: '' }).did,
    };
    expect(
      async () =>
        await organization.updateOrganization({
          ...updatedOrgObj,
        }),
    ).rejects.toThrow('');

    expect(updateOrganizationMock).toHaveBeenCalled();
  });

  it('member crud organization', async () => {
    const {
      addMemberToOrganizationMock,
      changeMemberRoleMock,
      removeMemberFromOrganizationMock,
    } = OrganizationMockService(sdk);

    let addMemberObj = {
      organization: {
        type: OrganizationIdentifierType.ORG_DID,
        value: organizationStub().did,
      },
      user: { type: UserIdentifierType.USER_ID, value: 'testing_sdk' },
    };
    let changeMemberRoleObj = {
      ...addMemberObj,
      role: OrganizationRole.ADMIN,
    };
    const { addMemberToOrganization } =
      await organization.addMemberToOrganization(addMemberObj);

    expect(addMemberToOrganization).toBeDefined();
    expect(addMemberToOrganizationMock).toHaveBeenCalled();

    const { changeMemberRole } =
      await organization.changeMemberRole(changeMemberRoleObj);

    expect(changeMemberRole.role).toBe(OrganizationRole.ADMIN);
    expect(changeMemberRoleMock).toHaveBeenCalled();

    const { removeMemberFromOrganization } =
      await organization.removeMemberFromOrganization(addMemberObj);

    expect(removeMemberFromOrganization).toBeTruthy();
    expect(removeMemberFromOrganizationMock).toHaveBeenCalled();
  });

  it('trasfer ownership', async () => {
    const { transferOwnershipOrganizationMock } = OrganizationMockService(sdk);

    const { transferOwnership } = await organization.transferOwnership({
      organization: {
        type: OrganizationIdentifierType.ORG_DID,
        value: organizationStub().did,
      },
      user: { type: UserIdentifierType.USER_ID, value: 'testing_sdk' },
    });

    expect(transferOwnership.user.did).toBe(userStub().did);
    expect(transferOwnershipOrganizationMock).toHaveBeenCalled();
  });

  it('organizations', async () => {
    const { getOrganizationsMock } = OrganizationMockService(sdk);

    const { organizations } = await organization.getOrganizations({
      skip: 0,
      take: 10,
    });

    expect(organizations.length).toBeGreaterThanOrEqual(0);
    expect(getOrganizationsMock).toHaveBeenCalled();
  });
});
