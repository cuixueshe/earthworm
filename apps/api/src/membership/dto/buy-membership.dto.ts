import { IsEnum, IsInt, IsString, Min } from "class-validator";

export enum MembershipPeriod {
  MONTH = "month",
  YEAR = "year",
}

export class BuyMembershipDto {
  userId: string;
  duration: number;
  period: MembershipPeriod;
}
