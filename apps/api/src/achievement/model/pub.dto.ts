import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length } from 'class-validator';

export class publishAchievementDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'secretKey不能为空' })
  secretKey: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'userID不能为空' })
  userID: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'choiceAchievement不能为空' })
  // choiceAchievement: number;
  choiceAchievement: number[];
}
export class FindUserDto {
  @ApiProperty()
  @IsNotEmpty({ message: '手机号码不能为空' })
  @Length(6, 20, { message: '手机号码长度应在6到20位之间' })
  phone: string;
}
export class UserAchievementDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'userID不能为空' })
  userID: number;
}
export class setAchievementDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'userID不能为空' })
  userID: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'achievementID不能为空' })
  achievementID: number;
}
