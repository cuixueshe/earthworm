import { Type } from "class-transformer";
import { IsNotEmpty, IsObject, ValidateNested } from "class-validator";

class ElementDto {
  @IsNotEmpty()
  english: string;
}

export class AddMasteredElementDto {
  @IsObject()
  @ValidateNested()
  @Type(() => ElementDto)
  element: ElementDto;
}
