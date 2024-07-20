// 来自 logto 的文档
// https://openapi.logto.io/operation/operation-getuser
export interface LogtoUserInfo {
  id: string;
  username: string;
  primaryEmail: string;
  primaryPhone: string;
  name: string;
  avatar: string;
  customData: Record<string, any>;
  identities: {
    userId: string;
    details: Record<string, any>;
  };
  lastSignInAt: number;
  createdAt: number;
  updatedAt: number;
  profile: {
    familyName?: string;
    givenName?: string;
    middleName?: string;
    nickname?: string;
    preferredUsername?: string;
    profile?: string;
    website?: string;
    gender?: string;
    birthdate?: string;
    zoneinfo?: string;
    locale?: string;
    address?: {
      formatted?: string;
      streetAddress?: string;
      locality?: string;
      region?: string;
      postalCode?: string;
      country?: string;
    };
  };
  applicationId: string;
  isSuspended: boolean;
  hasPassword: boolean;
  ssoIdentities?: Array<{
    tenantId: string;
    id: string;
    userId: string;
    issuer: string;
    identityId: string;
    detail: Record<string, any>;
    createdAt: number;
    ssoConnectorId: string;
  }>;
}
