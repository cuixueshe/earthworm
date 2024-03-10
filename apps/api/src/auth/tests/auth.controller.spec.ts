import { Test } from '@nestjs/testing';
import { testImportModules } from '../../../test/helper/utils';
import { AuthService } from '../auth.service';
import { UserService } from '../../user/user.service';
import { AuthController } from '../auth.controller';
import { createUser } from '../../../test/fixture/user';
import * as argon2 from 'argon2';

const user = createUser();
const mockUserService = {
  findWithPhone: jest.fn(),
  createUser: jest.fn().mockResolvedValue({ id: 1, name: 'test' }),
};
describe('auth controller', () => {
  let authService: AuthService;
  let authController: AuthController;

  beforeEach(async () => {
    const testHelper = await setupTesting();
    authService = testHelper.authService;
    authController = testHelper.authController;
  });

  afterEach(async () => {
    jest.clearAllMocks();
  });

  it('should can login', async () => {
    const password = 'test';
    mockUserService.findWithPhone.mockResolvedValue({
      id: user.userId,
      name: user.username,
      password: await argon2.hash(password),
      phone: user.phone,
    });
    const res = await authController.login({
      phone: user.phone,
      password,
    });

    expect(authService.login).toHaveBeenCalledWith({
      phone: user.phone,
      password,
    });
    expect(res).toEqual(
      expect.objectContaining({
        user,
      }),
    );
  });

  it('should can signup', async () => {
    const res = await authController.signup({
      phone: user.phone,
      password: 'test',
      name: user.username,
    });

    expect(authService.signup).toHaveBeenCalledWith({
      phone: user.phone,
      password: 'test',
      name: user.username,
    });
    expect(res).toEqual(
      expect.objectContaining({
        user,
      }),
    );
  });
});

async function setupTesting() {
  const mockAuthService = {
    login: jest.fn((dto) => ({ user })),
    signup: jest.fn((dto) => ({ user })),
  };
  const moduleRef = await Test.createTestingModule({
    imports: testImportModules,
    providers: [
      { provide: AuthService, useValue: mockAuthService },
      { provide: UserService, useValue: mockUserService },
    ],
    controllers: [AuthController],
  }).compile();

  return {
    authService: moduleRef.get<AuthService>(AuthService),
    authController: moduleRef.get<AuthController>(AuthController),
  };
}
