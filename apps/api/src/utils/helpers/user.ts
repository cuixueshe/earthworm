import { JwtService } from '@nestjs/jwt';
import { AuthService } from '../../auth/auth.service';
import { UserService } from '../../user/user.service';
import { mockDb } from './mockDb';

// only use this in test
// 测试是并行的，phone 不能重复
export async function createSignInfo() {
  let userService = new UserService(mockDb);
  let jwtService = new JwtService({
    secret: process.env.SECRET,
    signOptions: { expiresIn: '7d' },
  });
  let authService = new AuthService(userService, jwtService);
  const newUser = {
    name: 'test',
    phone: generateRandomPhone(),
    password: 'password',
  };
  const res = await authService.signup(newUser);
  return res;
}

// 随机生成 11 位数的手机号
function generateRandomPhone(): string {
  let phone = '1'; // 手机号以1开头
  for (let i = 0; i < 10; i++) {
    phone += Math.floor(Math.random() * 10); // 生成0-9的随机数
  }
  return phone;
}
