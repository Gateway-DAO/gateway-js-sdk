import {
  CreateOrganizationInput,
  MemberInput,
  Organization,
} from '../../gatewaySdk';
import { OrganizationRole } from '../../src/types';
import { userStub } from './user.stub';

export const organizationStub = (
  overrideOrganization?: Partial<Organization>,
): Organization => ({
  id: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
  createdAt: new Date('2021-01-01T12:00:00Z'),
  updatedAt: new Date('2021-01-01T12:00:00Z'),
  description: 'test',
  name: 'test',
  dataRequestTemplates: [],
  usernameUpdatedAt: new Date('2021-01-01T12:00:00Z'),
  verified: true,
  verifierDataRequests: [],
  ...overrideOrganization,
});

export const organizationCreateStub = (
  overrideOrganization?: any,
): CreateOrganizationInput => ({
  username: 'test_for_sdk_2',
  name: 'test org sdk 2',
  description: 'test organization',
  ...overrideOrganization,
});

export const memberOrganizationStub = (overrideMember?: any) => ({
  user: userStub(),
  role: OrganizationRole.Member,
  id: organizationStub().id,
  organization: organizationStub(),
  ...overrideMember,
});
