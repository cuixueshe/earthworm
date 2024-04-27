import { IsString } from "class-validator";

export class CheckMembershipStatusDto {
  @IsString()
  userId: string;
}
