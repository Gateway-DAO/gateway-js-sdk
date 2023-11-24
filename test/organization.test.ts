import dotenv from 'dotenv';
import { Gateway } from '../src/Gateway';
import {
  OrganizationIdentifierType,
  OrganizationRole,
  UserIdentifierType,
} from '../src/types';
dotenv.config();
const DEFAULT_TIMEOUT = 10000;

let api: Gateway;

beforeAll(() => {
  api = new Gateway({
    apiKey: process.env.API_KEY!,
    token: process.env.BEARER_TOKEN!,
  });
});

describe('ORGANIZATION SERVICE TESTING', () => {
  it(
    'organization crud',
    async () => {
      let obj = {
        username: 'test_for_sdk_2',
        name: 'test org sdk 2',
        description: 'test organization',
      };
      const { createOrganization } =
        await api.organization.createOrganization(obj);
      const { organization } = await api.organization.getOrganization(
        OrganizationIdentifierType.ORG_ID,
        createOrganization.id,
      );
      expect(organization?.id).toEqual(createOrganization.id);
      let updatedOrgObj = {
        description: 'changed description for organization',
        id: createOrganization.id,
      };
      const { updateOrganization } =
        await api.organization.updateOrganization(updatedOrgObj);
      expect(updateOrganization.description).toEqual(updatedOrgObj.description);
    },
    DEFAULT_TIMEOUT,
  );

  it(
    'member crud organization',
    async () => {
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
        await api.organization.addMemberToOrganization(addMemberObj);
      expect(addMemberToOrganization).toBeDefined();
      const { changeMemberRole } =
        await api.organization.changeMemberRole(changeMemberRoleObj);
      expect(changeMemberRole).toBeDefined();
      const { removeMemberFromOrganization } =
        await api.organization.removeMemberFromOrganization(addMemberObj);
      expect(removeMemberFromOrganization).toBeDefined();
    },
    DEFAULT_TIMEOUT,
  );

  it(
    'organizations',
    async () => {
      const { organizations } = await api.organization.getOrganizations({
        filter: { verified: false },
        skip: 0,
        take: 10,
      });
      expect(organizations.length).toBeGreaterThanOrEqual(0);
    },
    DEFAULT_TIMEOUT,
  );
});
