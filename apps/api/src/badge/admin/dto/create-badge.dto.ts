import {
  IsBoolean,
  IsEnum,
  IsHexColor,
  IsOptional,
  IsString,
  IsUrl,
  Matches,
} from "class-validator";

export class CreateBadgeDto {
  @IsString()
  @Matches(/^[A-Z0-9_]+$/, {
    message: "code must contain only uppercase letters, numbers, and underscores",
  })
  code: string;

  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsEnum(["static", "dynamic"])
  @IsOptional()
  type?: "static" | "dynamic" = "static";

  @IsHexColor()
  @IsOptional()
  primaryColor?: string = "#fff";

  @IsHexColor()
  @IsOptional()
  secondaryColor?: string = "#000";

  @IsHexColor()
  @IsOptional()
  tertiaryColor?: string = "#fff";

  @IsString()
  @IsUrl()
  content: string;

  @IsBoolean()
  @IsOptional()
  wearable?: boolean = false;

  @IsBoolean()
  @IsOptional()
  enable?: boolean = false;
}

export class UpdateBadgeDto extends CreateBadgeDto {
  @IsString()
  @IsOptional()
  id?: string;
}
