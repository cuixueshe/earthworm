import { MembershipType } from "../models/membership";

export interface SetupUserApiResponse {
  avatar: string;
  username: string;
}

export interface UserApiResponse {
  applicationId: string;
  avatar: string;
  createdAt: number;
  customData: Record<string, any>;
  id: string;
  identities: Record<string, any>;
  isSuspended: boolean;
  lastSignInAt: number;
  membership: {
    details: {
      endDate: string;
      type: MembershipType;
      startDate: string;
    } | null;
    isMember: boolean;
  };
  name: string | null;
  primaryEmail: string;
  primaryPhone: string | null;
  username: string;
}
