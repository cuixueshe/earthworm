import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateUserProgressDto {
  @ApiProperty()
  @IsNotEmpty({ message: '课程不能为空' })
  courseId: number;
}

export class UpdateUserProgressDto {
  @ApiProperty()
  @IsNotEmpty({ message: '课程不能为空' })
  courseId: number;
}
