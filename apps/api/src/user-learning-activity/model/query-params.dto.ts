import { IsDateString, IsOptional, IsString } from "class-validator";

export class QueryParamsDto {
  @IsString()
  activityType: string;

  @IsDateString()
  @IsOptional()
  startDate?: string;

  @IsDateString()
  @IsOptional()
  endDate?: string;
}
