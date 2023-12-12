import { Organization } from '../src/organization/organization';
import { organizationStub } from '../test/stubs/organization.stub';

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
});
