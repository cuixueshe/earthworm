import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { mockDb } from '../utils/helpers/mockDb';
import { user } from '@earthworm/shared';
import { AuthController } from './auth.controller';
import { AuthGuard } from './auth.guard';
import { cleanupMockDb } from '../utils/helpers/cleanupDb';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;
  let jwtService: JwtService;
  let userService: UserService;
  let token = '';

  const newUser = {
    name: 'test',
    phone: '12345678901',
    password: 'password',
  };

  beforeAll(async () => {
    userService = new UserService(mockDb);
    jwtService = new JwtService({
      secret: process.env.SECRET,
      signOptions: { expiresIn: '7d' },
    });
    authService = new AuthService(userService, jwtService);
    authController = new AuthController(authService);

    await cleanupMockDb();
  });
  afterAll(async () => {
    await cleanupMockDb();
  });
  it('should signup', async () => {
    const res = await authController.signup(newUser);
    expect(res.token).toBeDefined();
  });
  it('should not signup with same phone', async () => {
    expect(authController.signup(newUser)).rejects.toThrow();
  });
  it('should login', async () => {
    const res = await authController.login(newUser);
    token = res.token;
    expect(res.token).toBeDefined();
  });
  it('should get user info', async () => {
    const authGuard = new AuthGuard(jwtService);
    const userInfo = await authGuard.parseToken(token);
    expect(userInfo).toMatchObject({
      username: newUser.name,
      phone: newUser.phone,
    });
  });
});
