import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateUserProgressDto {
  @ApiProperty()
  @IsNotEmpty({ message: "Khóa học không được để trống" })
  courseId: string;
}

export class UpsertUserProgressDto {
  @ApiProperty()
  @IsNotEmpty({ message: "Khóa học không được để trống" })
  courseId: string;

  @ApiProperty()
  @IsNotEmpty({ message: "Gói bài học không được để trống" })
  coursePackId: string;

  @ApiProperty()
  @IsNotEmpty({ message: "Tiến độ khóa học không được để trống" })
  statementIndex: number;
}
