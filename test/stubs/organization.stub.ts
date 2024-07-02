import {
  CreateOrganizationInput,
  Organization,
} from '../../../gatewaySdk/sources/GatewayV3';
import { OrganizationRole } from '../../../src/types';
import { userStub } from '../v2/user.stub';
import { authStub } from './auth.stub';

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
  did: 'did:gatewayid:org123',
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
): CreateOrganizationInput => ({
  data: organizationBodyStub(),
  signature: authStub().signature,
  signingKey: authStub().wallet,
  ...overrideOrganization,
});

export const memberOrganizationStub = (overrideMember?: any) => ({
  user: userStub(),
  role: OrganizationRole.Member,
  did: organizationStub().did,
  organization: organizationStub(),
  ...overrideMember,
});
