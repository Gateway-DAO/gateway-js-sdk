import { OrganizationRole } from '../../src/types';
import { Organization } from '../../src/v3/organization/organization';
import { userStub } from '../../test/stubs/v3/user.stub';
import {
  memberOrganizationStub,
  organizationStub,
} from '../../test/stubs/v3/organization.stub';

export const OrganizationMockService = (organization: Organization) => ({
  createOrganizationMock: jest
    .spyOn(organization.sdk, 'createOrganization_mutation')
    .mockResolvedValue({
      createOrganization: organizationStub(),
    }),
  getOrganizationMock: jest
    .spyOn(organization.sdk, 'organization_query')
    .mockResolvedValue({
      organization: organizationStub(),
    }),
  updateOrganizationMock: jest
    .spyOn(organization.sdk, 'updateOrganization_mutation')
    .mockResolvedValue({
      updateOrganization: organizationStub({
        description: 'updated description',
      }),
    }),
  getOrganizationsMock: jest
    .spyOn(organization.sdk, 'organizations_query')
    .mockResolvedValue({
      organizations: [organizationStub()],
    }),
  addMemberToOrganizationMock: jest
    .spyOn(organization.sdk, 'addMemberToOrganization_mutation')
    .mockResolvedValue({
      addMemberToOrganization: memberOrganizationStub(),
    }),
  changeMemberRoleMock: jest
    .spyOn(organization.sdk, 'changeMemberRole_mutation')
    .mockResolvedValue({
      changeMemberRole: memberOrganizationStub({
        role: OrganizationRole.Admin,
      }),
    }),
  removeMemberFromOrganizationMock: jest
    .spyOn(organization.sdk, 'removeMemberFromOrganization_mutation')
    .mockResolvedValue({
      removeMemberFromOrganization: true,
    }),
  transferOwnershipOrganizationMock: jest
    .spyOn(organization.sdk, 'transferOwnership_mutation')
    .mockResolvedValue({
      transferOwnership: {
        organization: organizationStub(),
        user: userStub(),
        id: userStub().id,
        role: 'Admin',
      },
    }),
});
