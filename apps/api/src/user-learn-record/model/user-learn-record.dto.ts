import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsDateString, IsOptional, IsString } from "class-validator";

export class GetUserLearnRecordDto {
  @ApiPropertyOptional({ description: "起始日期" })
  @IsDateString()
  @IsOptional()
  startDate?: string;

  @ApiPropertyOptional({ description: "截止日期" })
  @IsDateString()
  @IsOptional()
  endDate?: string;
}
