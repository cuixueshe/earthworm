import { IsNotEmpty, IsString } from "class-validator";

export class RemoveMasteredElementDto {
  @IsNotEmpty()
  @IsString()
  elementId: string;
}
