export interface MembershipDetails {
  startDate: Date;
  endDate: Date;
  type: string;
}

export enum MembershipType {
  REGULAR = "regular", // 普通会员
  FOUNDER = "founder", // 创始会员
}
