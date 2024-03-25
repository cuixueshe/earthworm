import { Test } from '@nestjs/testing';
import { createUser } from '../../../test/fixture/user';
import { testImportModules } from '../../../test/helper/utils';
import { UserService } from '../../user/user.service';
import { AuthController } from '../auth.controller';
import { AuthService } from '../auth.service';

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
    const dto = {
      phone: user.phone,
      password: 'test',
    };
    const res = await authController.login(dto);

    expect(authService.login).toHaveBeenCalledWith(dto);

    expect(res).toEqual(
      expect.objectContaining({
        user,
      }),
    );
  });

  it('should can signup', async () => {
    const dto = {
      phone: user.phone,
      password: 'test',
      name: user.username,
    };
    const res = await authController.signup(dto);

    expect(authService.signup).toHaveBeenCalledWith(dto);

    expect(res).toEqual(
      expect.objectContaining({
        user,
      }),
    );
  });
});

async function setupTesting() {
  const mockAuthService = {
    login: jest.fn().mockReturnValue({ user }),
    signup: jest.fn().mockReturnValue({ user }),
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
