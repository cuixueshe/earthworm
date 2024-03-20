import { Test } from '@nestjs/testing';
import * as argon2 from 'argon2';
import {
  cleanDB,
  startDB,
  testImportModules,
} from '../../../test/helper/utils';
import { endDB } from '../../common/db';
import { DB, DbType } from '../../global/providers/db.provider';
import { UserService } from '../../user/user.service';
import { AuthService } from '../auth.service';

const mockUserService = {
  findWithPhone: jest.fn(),
  createUser: jest.fn().mockResolvedValue({ id: 1, name: 'test' }),
};
describe('auth service', () => {
  let db: DbType;
  let authService: AuthService;
  let userService: UserService;

  beforeAll(async () => {
    const testHelper = await setupTesting();
    db = testHelper.db;
    authService = testHelper.authService;
    userService = testHelper.userService;
  });

  afterAll(async () => {
    await cleanDB(db);
    await endDB();
  });

  beforeEach(async () => {
    await startDB(db);
  });

  afterEach(async () => {
    jest.clearAllMocks();
  });

  it('should return signup user', async () => {
    const phone = '01012345678';
    const { token, user } = await authService.signup({
      phone,
      name: 'test',
      password: 'test',
    });

    expect(token).toBeDefined();
    expect(user).toEqual({
      userId: 1,
      username: 'test',
      phone,
    });
    expect(userService.createUser).toHaveBeenCalledWith({
      phone,
      name: 'test',
      password: 'test',
    });
  });

  it('should can login', async () => {
    const phone = '01012345678';
    mockUserService.findWithPhone.mockResolvedValue({
      id: 1,
      name: 'test',
      password: await argon2.hash('test'),
      phone,
    });
    const { token, user } = await authService.login({
      phone,
      password: 'test',
    });

    expect(token).toBeDefined();
    expect(user).toEqual({
      userId: 1,
      username: 'test',
      phone,
    });
  });
});

async function setupTesting() {
  const moduleRef = await Test.createTestingModule({
    imports: testImportModules,
    providers: [
      AuthService,
      { provide: UserService, useValue: mockUserService },
    ],
  }).compile();

  return {
    authService: moduleRef.get<AuthService>(AuthService),
    userService: moduleRef.get<UserService>(UserService),
    db: moduleRef.get<DbType>(DB),
    moduleRef,
  };
}
