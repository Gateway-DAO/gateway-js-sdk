import { Organization } from '../src/organization/organization';
import { User } from '../src/user/user';
import { organizationStub } from '../test/stubs/organization.stub';
import { userStub } from '../test/stubs/user.stub';

export const UserMockService = (user: User) => ({
  meMock: jest.spyOn(user.sdk, 'me_query').mockResolvedValue({
    me: userStub(),
  }),
  getSingleUserMock: jest.spyOn(user.sdk, 'user_query').mockResolvedValue({
    user: userStub(),
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
