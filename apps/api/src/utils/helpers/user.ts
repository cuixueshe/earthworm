import { user } from '@earthworm/shared';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from '../../auth/auth.service';
import { UserService } from '../../user/user.service';
import { cleanupMockDb } from './cleanupDb';
import { mockDb } from './mockDb';

// only use this in test
export async function createSignInfo() {
  let userService = new UserService(mockDb);
  let jwtService = new JwtService({
    secret: process.env.SECRET,
    signOptions: { expiresIn: '7d' },
  });
  let authService = new AuthService(userService, jwtService);
  const newUser = {
    name: 'test',
    phone: '1550211222',
    password: 'password',
  };
  const res = await authService.signup(newUser);
  return res;
}
