import {
  CreateOrganizationInput,
  Organization,
  OrganizationBody,
} from '../../gatewaySdk/sources/Gateway';
import { OrganizationRole } from '../../src/common/enums';
import { authStub } from './auth.stub';
import { userStub } from './user.stub';

export const organizationStub = (
  overrideOrganization?: Partial<Organization>,
): Organization => ({
  createdAt: new Date('2021-01-01T12:00:00Z'),
  updatedAt: new Date('2021-01-01T12:00:00Z'),
  description: 'test',
  name: 'test',
  usernameUpdatedAt: new Date('2021-01-01T12:00:00Z'),
  verified: true,
  verifierDataRequests: [],
  did: 'did:gatewayid:mygateway:513368cb5b989f801197782fec032d8fe19e93029845fd65d5c55c3b23a825f0',
  ...overrideOrganization,
});

export const organizationBodyStub = (overrideData?: any): any => ({
  username: 'test_for_sdk_2',
  name: 'test org sdk 2',
  description: 'test organization',
  ...overrideData,
});

export const organizationCreateStub = (
  overrideOrganization?: any,
): OrganizationBody => ({
  ...organizationBodyStub(),

  ...overrideOrganization,
});

export const memberOrganizationStub = (overrideMember?: any) => ({
  user: userStub(),
  role: OrganizationRole.MEMBER,
  did: organizationStub().did,
  organization: organizationStub(),
  ...overrideMember,
});
