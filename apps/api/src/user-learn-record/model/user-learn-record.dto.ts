import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class GetUserLearnRecordDto {
  @ApiPropertyOptional({ description: '起始日期' })
  @IsString()
  @IsOptional()
  startDate?: string;

  @ApiPropertyOptional({ description: '截止日期' })
  @IsString()
  @IsOptional()
  endDate?: string;
}
