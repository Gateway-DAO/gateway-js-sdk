import { Organization } from '../src/organization/organization';
import { OrganizationRole } from '../src/types';
import {
  memberOrganizationStub,
  organizationStub,
} from '../test/stubs/organization.stub';
import { userStub } from '../test/stubs/user.stub';

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
});
