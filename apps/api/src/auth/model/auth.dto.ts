import { PickType } from '@nestjs/swagger';
import '@nestjs/common';
import { CreateUserDto } from '../../user/model/user.dto';

export class SignDto extends PickType(CreateUserDto, ['phone', 'password']) {}
