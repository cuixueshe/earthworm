import { ApiProperty, PickType } from "@nestjs/swagger";
import { IsNotEmpty, Length } from "class-validator";

export class CreateUserDto {
  @ApiProperty({
    example: "admin",
    description: "用户名不能为空,长度为2-20位",
  })
  @IsNotEmpty({ message: "用户名不能为空" })
  @Length(2, 20, { message: "用户名长度为2-20位" })
  username: string;

  @ApiProperty({
    example: "15512345678",
    description: "手机号码不能为空,长度应在6-20位之间",
  })
  @IsNotEmpty({ message: "手机号码不能为空" })
  @Length(6, 20, { message: "手机号码长度应在6到20位之间" })
  phone: string;

  @ApiProperty({
    example: "123456",
    description: "密码不能为空,长度应在6-20位之间",
  })
  @IsNotEmpty({ message: "密码不能为空" })
  @Length(6, 20, { message: "密码长度为6-20位" })
  password: string;

  avatar: string;
}

export class FindUserDto {
  @ApiProperty()
  @IsNotEmpty({ message: "手机号码不能为空" })
  @Length(6, 20, { message: "手机号码长度应在6到20位之间" })
  phone: string;
}

export class UpdateUserDto extends PickType(CreateUserDto, ["username", "avatar"]) {}
