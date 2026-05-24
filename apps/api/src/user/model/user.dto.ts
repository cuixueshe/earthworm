import { ApiProperty, PickType } from "@nestjs/swagger";
import { IsNotEmpty, Length } from "class-validator";

export class CreateUserDto {
  @ApiProperty({
    example: "admin",
    description: "Tên người dùng không được để trống, độ dài từ 2-20 ký tự",
  })
  @IsNotEmpty({ message: "Tên người dùng không được để trống" })
  @Length(2, 20, { message: "Tên người dùng phải từ 2-20 ký tự" })
  username: string;

  @ApiProperty({
    example: "15512345678",
    description: "Số điện thoại không được để trống, độ dài từ 6-20 ký tự",
  })
  @IsNotEmpty({ message: "Số điện thoại không được để trống" })
  @Length(6, 20, { message: "Số điện thoại phải từ 6 đến 20 ký tự" })
  phone: string;

  @ApiProperty({
    example: "123456",
    description: "Mật khẩu không được để trống, độ dài từ 6-20 ký tự",
  })
  @IsNotEmpty({ message: "Mật khẩu không được để trống" })
  @Length(6, 20, { message: "Mật khẩu phải từ 6-20 ký tự" })
  password: string;

  avatar: string;
}

export class FindUserDto {
  @ApiProperty()
  @IsNotEmpty({ message: "Số điện thoại không được để trống" })
  @Length(6, 20, { message: "Số điện thoại phải từ 6 đến 20 ký tự" })
  phone: string;
}

export class UpdateUserDto extends PickType(CreateUserDto, ["username", "avatar"]) {}
