import { GraphQLClient } from 'graphql-request';
import { getSdk } from '../../gatewaySdk/sources/GatewayV3';
import { Organization } from '../../src/v3/organization/organization';
import { OrganizationMockService } from '../../__mocks__/v3/organization.mock';
import {
  organizationCreateStub,
  organizationStub,
} from '../stubs/v3/organization.stub';
import {
  OrganizationIdentifierTypeV3,
  OrganizationRoleV3,
  UserIdentifierTypeV3,
} from '../../src/types';
import { authStub } from '../stubs/v3/auth.stub';
import { userStub } from '../stubs/v3/user.stub';

let organization: Organization;

beforeAll(() => {
  organization = new Organization(getSdk(new GraphQLClient('')));
});

afterAll(() => {
  jest.resetAllMocks();
});

describe('ORGANIZATION SERVICE TESTING', () => {
  it('organization create', async () => {
    const { createOrganizationMock } = OrganizationMockService(organization);

    const { createOrganization } = await organization.createOrganization(
      organizationCreateStub(),
    );

    expect(createOrganization.name).toEqual(organizationStub().name);
    expect(createOrganizationMock).toHaveBeenCalled();
  });

  it('organization create to throw error', async () => {
    const { createOrganizationMock } = OrganizationMockService(organization);

    expect(
      async () =>
        await organization.createOrganization(
          organizationCreateStub({ data: { username: '' } }),
        ),
    ).rejects.toThrow(' should be atleast 2 length');

    expect(createOrganizationMock).toHaveBeenCalled();
  });

  it('organization create to throw wallet error', async () => {
    const { createOrganizationMock } = OrganizationMockService(organization);

    expect(
      async () =>
        await organization.createOrganization(
          organizationCreateStub({ signingCipher: 'ED25519' }),
        ),
    ).rejects.toThrow('');

    expect(createOrganizationMock).toHaveBeenCalled();
  });

  it('get single organization', async () => {
    const { getOrganizationMock } = OrganizationMockService(organization);

    const res = await organization.getOrganization(
      OrganizationIdentifierTypeV3.ORG_DID,
      organizationStub().did,
    );

    expect(res.organization?.did).toEqual(organizationStub().did);
    expect(getOrganizationMock).toHaveBeenCalled();
  });

  it('get single organization to throw error', async () => {
    const { getOrganizationMock } = OrganizationMockService(organization);

    expect(
      async () =>
        await organization.getOrganization(
          OrganizationIdentifierTypeV3.ORG_DID,
          organizationStub({ did: '' }).did,
        ),
    ).rejects.toThrow('');

    expect(getOrganizationMock).toHaveBeenCalled();
  });

  it('update organization', async () => {
    const { updateOrganizationMock } = OrganizationMockService(organization);

    let updatedOrgObj = {
      description: 'updated description',
      did: organizationStub().did,
    };
    const { updateOrganization } = await organization.updateOrganization({
      data: updatedOrgObj,
      signature: authStub().signature,
      signingKey: authStub().wallet,
    });

    expect(updateOrganization.description).toEqual(updatedOrgObj.description);
    expect(updateOrganizationMock).toHaveBeenCalled();
  });

  it('update organization to throw error', async () => {
    const { updateOrganizationMock } = OrganizationMockService(organization);

    let updatedOrgObj = {
      description: 'updated description',
      did: organizationStub({ did: '' }).did,
    };
    expect(
      async () =>
        await organization.updateOrganization({
          data: updatedOrgObj,
          signature: authStub().signature,
          signingKey: authStub().wallet,
        }),
    ).rejects.toThrow('');

    expect(updateOrganizationMock).toHaveBeenCalled();
  });

  it('update organization to throw wallet error', async () => {
    const { updateOrganizationMock } = OrganizationMockService(organization);

    let updatedOrgObj = {
      description: 'updated description',
      did: organizationStub().did,
    };
    expect(
      async () =>
        await organization.updateOrganization({
          data: updatedOrgObj,
          signature: authStub().signature,
          signingKey: authStub().wallet,
          signingCipher: 'ED25519',
        }),
    ).rejects.toThrow('');

    expect(updateOrganizationMock).toHaveBeenCalled();
  });

  // it('member crud organization', async () => {
  //   const {
  //     addMemberToOrganizationMock,
  //     changeMemberRoleMock,
  //     removeMemberFromOrganizationMock,
  //   } = OrganizationMockService(organization);

  //   let addMemberObj = {
  //     data: {
  //       organization: {
  //         type: OrganizationIdentifierTypeV3.ORG_DID,
  //         value: organizationStub().did,
  //       },
  //       user: { type: UserIdentifierTypeV3.USER_ID, value: 'testing_sdk' },
  //     },
  //     signature: '',
  //     signingKey: '',
  //   };
  //   let changeMemberRoleObj = {
  //     ...addMemberObj,
  //     role: OrganizationRoleV3.ADMIN,
  //   };
  //   const { addMemberToOrganization } =
  //     await organization.addMemberToOrganization(addMemberObj);

  //   expect(addMemberToOrganization).toBeDefined();
  //   expect(addMemberToOrganizationMock).toHaveBeenCalled();

  //   const { changeMemberRole } =
  //     await organization.changeMemberRole(changeMemberRoleObj);

  //   expect(changeMemberRole.role).toBe(OrganizationRoleV3.ADMIN);
  //   expect(changeMemberRoleMock).toHaveBeenCalled();

  //   const { removeMemberFromOrganization } =
  //     await organization.removeMemberFromOrganization(addMemberObj);

  //   expect(removeMemberFromOrganization).toBeTruthy();
  //   expect(removeMemberFromOrganizationMock).toHaveBeenCalled();
  // });

  // it('trasfer ownership', async () => {
  //   const { transferOwnershipOrganizationMock } =
  //     OrganizationMockService(organization);

  //   const { transferOwnership } = await organization.transferOwnership({
  //     data: {
  //       organization: {
  //         type: OrganizationIdentifierTypeV3.ORG_DID,
  //         value: organizationStub().did,
  //       },
  //       user: { type: UserIdentifierTypeV3.USER_ID, value: 'testing_sdk' },
  //     },
  //     signature: '',
  //     signingKey: '',
  //   });

  //   expect(transferOwnership.user.did).toBe(userStub().did);
  //   expect(transferOwnershipOrganizationMock).toHaveBeenCalled();
  // });

  it('organizations', async () => {
    const { getOrganizationsMock } = OrganizationMockService(organization);

    const { organizations } = await organization.getOrganizations({
      skip: 0,
      take: 10,
    });

    expect(organizations.length).toBeGreaterThanOrEqual(0);
    expect(getOrganizationsMock).toHaveBeenCalled();
  });
});
