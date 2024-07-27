import { Type } from "class-transformer";
import { IsDate, IsInt, IsNotEmpty, IsString, Min } from "class-validator";

export class UpsertActivityDto implements Extracted {
  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  date: Date;

  @IsNotEmpty()
  @IsString()
  activityType: string;

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  duration: number;
}

interface Extracted {
  date: Date;
  activityType: string;
  duration: number;
}
