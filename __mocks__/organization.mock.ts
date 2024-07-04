import { Sdk } from '../gatewaySdk/sources/Gateway';
import { OrganizationRole } from '../src/common/enums';
import {
  memberOrganizationStub,
  organizationStub,
} from '../test/stubs/organization.stub';
import { userStub } from '../test/stubs/user.stub';

export const OrganizationMockService = (sdk: Sdk) => ({
  createOrganizationMock: jest
    .spyOn(sdk, 'createOrganizationMutation')
    .mockResolvedValue({
      createOrganization: organizationStub(),
    }),
  getOrganizationMock: jest.spyOn(sdk, 'organizationQuery').mockResolvedValue({
    organization: organizationStub(),
  }),
  updateOrganizationMock: jest
    .spyOn(sdk, 'updateOrganizationMutation')
    .mockResolvedValue({
      updateOrganization: organizationStub({
        description: 'updated description',
      }),
    }),
  getOrganizationsMock: jest
    .spyOn(sdk, 'organizationsQuery')
    .mockResolvedValue({
      organizations: [organizationStub()],
    }),
  addMemberToOrganizationMock: jest
    .spyOn(sdk, 'addMemberToOrganizationMutation')
    .mockResolvedValue({
      addMemberToOrganization: memberOrganizationStub(),
    }),
  changeMemberRoleMock: jest
    .spyOn(sdk, 'changeMemberRoleMutation')
    .mockResolvedValue({
      changeMemberRole: memberOrganizationStub({
        role: OrganizationRole.ADMIN,
      }),
    }),
  removeMemberFromOrganizationMock: jest
    .spyOn(sdk, 'removeMemberFromOrganizationMutation')
    .mockResolvedValue({
      removeMemberFromOrganization: true,
    }),
  transferOwnershipOrganizationMock: jest
    .spyOn(sdk, 'transferOwnershipMutation')
    .mockResolvedValue({
      transferOwnership: {
        organization: organizationStub(),
        user: userStub(),
        id: userStub().id,
        role: 'ADMIN',
      },
    }),
});
