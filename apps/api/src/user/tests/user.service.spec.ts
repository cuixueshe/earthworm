import { user } from '@earthworm/shared';
import { Test } from '@nestjs/testing';
import * as argon2 from 'argon2';
import { createUser } from '../../../test/fixture/user';
import {
  cleanDB,
  startDB,
  testImportModules,
} from '../../../test/helper/utils';
import { endDB } from '../../common/db';
import { DB, DbType } from '../../global/providers/db.provider';
import { UserService } from '../user.service';

let userData = createUser();
let password = '123456';
describe('user service', () => {
  let db: DbType;
  let userService: UserService;

  beforeAll(async () => {
    const testHelper = await setupTesting();
    await setupDatabaseData(testHelper.db);

    db = testHelper.db;
    userService = testHelper.userService;
  });

  afterAll(async () => {
    await cleanDB(db);
    await endDB();
  });

  beforeEach(async () => {
    await startDB(db);
  });

  it('should create user', async () => {
    const { id } = await userService.createUser({
      name: 'testuser',
      password: 'testpass',
      phone: '13813832181',
    });

    expect(id).toBeGreaterThan(0);
  });

  it('should find user with phone', async () => {
    const user = await userService.findWithPhone({
      phone: userData.phone,
    });
    expect(user).toEqual(
      expect.objectContaining({
        name: userData.username,
        phone: userData.phone,
      }),
    );
  });
});

async function setupDatabaseData(db: DbType) {
  await cleanDB(db);
  await setupDBData(db);
}
async function setupTesting() {
  const moduleRef = await Test.createTestingModule({
    imports: testImportModules,
    providers: [UserService],
  }).compile();

  return {
    db: moduleRef.get<DbType>(DB),
    userService: moduleRef.get<UserService>(UserService),
  };
}

async function setupDBData(db: DbType) {
  await db.insert(user).values({
    name: userData.username,
    phone: userData.phone,
    password: await argon2.hash(password),
  });
}
