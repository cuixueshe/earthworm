import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty({ message: ' 用户名不能为空' })
  @Length(2, 20, { message: '用户名长度为2-20位' })
  name: string;

  @ApiProperty()
  @IsNotEmpty({ message: '手机号码不能为空' })
  @Length(11, 11, { message: '手机号码长度为11位' })
  phone: string;

  @ApiProperty()
  @IsNotEmpty({ message: '密码不能为空' })
  @Length(6, 20, { message: '密码长度为6-20位' })
  password: string;
}

export class FindUserDto {
  @ApiProperty()
  @IsNotEmpty({ message: '手机号码不能为空' })
  @Length(11, 11, { message: '手机号码长度为11位' })
  phone: string;
}
