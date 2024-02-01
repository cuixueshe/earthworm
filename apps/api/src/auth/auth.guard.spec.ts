import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  let jwtService: JwtService;
  beforeAll(async () => {
    jwtService = new JwtService({
      secret: process.env.SECRET,
      signOptions: { expiresIn: '7d' },
    });
  });

  it('should not get user info with invalid token', async () => {
    const authGuard = new AuthGuard(jwtService);
    expect(authGuard.parseToken('invalid token')).rejects.toThrow();
  });
  it('should no error when uncheck', async () => {
    const authGuard = new AuthGuard(jwtService);
    const userInfo = await authGuard.parseToken('', true);
    expect(userInfo).toBeUndefined();
  });
});
