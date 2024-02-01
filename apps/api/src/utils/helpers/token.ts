import { user } from '@earthworm/shared';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from '../../auth/auth.service';
import { UserService } from '../../user/user.service';
import { resetDb } from './resetDb';
import { testDb } from './test-db';

async function createToken() {
  let userService = new UserService(testDb);
  let jwtService = new JwtService({
    secret: process.env.SECRET,
    signOptions: { expiresIn: '7d' },
  });
  let authService = new AuthService(userService, jwtService);
  const newUser = {
    name: 'test',
    phone: '12345678901',
    password: 'password',
  };
  const res = await authService.signup(newUser);
  return res.token;
}

async function clearToken() {
  await resetDb(user);
}
