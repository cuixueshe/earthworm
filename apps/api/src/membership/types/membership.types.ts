export interface MembershipDetails {
  startDate: Date;
  endDate: Date;
  type: string;
}

export enum MembershipType {
  REGULAR = "regular", // Thành viên thường
  FOUNDER = "founder", // Thành viên sáng lập
}
