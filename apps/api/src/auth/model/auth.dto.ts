import '@nestjs/common';
import { PickType } from '@nestjs/swagger';
import { CreateUserDto } from '../../user/model/user.dto';

export class SignDto extends PickType(CreateUserDto, ['phone', 'password']) {}
