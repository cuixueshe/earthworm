import { user } from '@earthworm/shared';
import { testDb } from '../utils/helpers/test-db';
import { UserService } from './user.service';
import { resetDb } from '../utils/helpers/resetDb';

describe('UserService', () => {
  let userService: UserService;

  const newUser = {
    name: 'test',
    phone: '12345678901',
    password: 'password',
  };
  beforeAll(async () => {
    await resetDb(user);
    userService = new UserService(testDb);
  });
  afterAll(async () => {
    await resetDb(user);
  });

  it('should create a user', async () => {
    const res = await userService.createUser(newUser);
    expect(res.id).toBeDefined();
  });

  it('should not create a user with same phone', async () => {
    expect(userService.createUser(newUser)).rejects.toThrow();
  });

  it('should find a user with phone', async () => {
    const res = await userService.findWithPhone(newUser);
    expect(res).toMatchObject({
      name: newUser.name,
      phone: newUser.phone,
    });
  });
});
