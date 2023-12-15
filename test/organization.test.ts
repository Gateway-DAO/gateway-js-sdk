import { getMeshSDK } from '../.mesh';
import { OrganizationMockService } from '../__mocks__/organization.mock';
import { Organization } from '../src/organization/organization';
import {
  OrganizationIdentifierType,
  OrganizationRole,
  UserIdentifierType,
} from '../src/types';
import {
  organizationCreateStub,
  organizationStub,
} from './stubs/organization.stub';

let organization: Organization;

beforeAll(() => {
  organization = new Organization(getMeshSDK());
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

  it('get single organization', async () => {
    const { getOrganizationMock } = OrganizationMockService(organization);

    const res = await organization.getOrganization(
      OrganizationIdentifierType.ORG_ID,
      organizationStub().id,
    );

    expect(res.organization?.id).toEqual(organizationStub().id);
    expect(getOrganizationMock).toHaveBeenCalled();
  });

  it('update organization', async () => {
    const { updateOrganizationMock } = OrganizationMockService(organization);

    let updatedOrgObj = {
      description: 'updated description',
      id: organizationStub().id,
    };
    const { updateOrganization } =
      await organization.updateOrganization(updatedOrgObj);

    expect(updateOrganization.description).toEqual(updatedOrgObj.description);
    expect(updateOrganizationMock).toHaveBeenCalled();
  });

  it('member crud organization', async () => {
    const {
      addMemberToOrganizationMock,
      changeMemberRoleMock,
      removeMemberFromOrganizationMock,
    } = OrganizationMockService(organization);

    let addMemberObj = {
      organization: {
        type: OrganizationIdentifierType.ORG_ID,
        value: process.env.ORGAINZATION_ID!,
      },
      user: { type: UserIdentifierType.GATEWAY_ID, value: 'testing_sdk' },
    };
    let changeMemberRoleObj = {
      ...addMemberObj,
      role: OrganizationRole.Admin,
    };
    const { addMemberToOrganization } =
      await organization.addMemberToOrganization(addMemberObj);

    expect(addMemberToOrganization).toBeDefined();
    expect(addMemberToOrganizationMock).toHaveBeenCalled();

    const { changeMemberRole } =
      await organization.changeMemberRole(changeMemberRoleObj);

    expect(changeMemberRole.role).toBe(OrganizationRole.Admin);
    expect(changeMemberRoleMock).toHaveBeenCalled();

    const { removeMemberFromOrganization } =
      await organization.removeMemberFromOrganization(addMemberObj);

    expect(removeMemberFromOrganization).toBeTruthy();
    expect(removeMemberFromOrganizationMock).toHaveBeenCalled();
  });

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
