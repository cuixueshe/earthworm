import { course, user, userProgress } from '@earthworm/schema';
import { Test } from '@nestjs/testing';
import * as argon2 from 'argon2';
import {
  createFirstCourse,
  createSecondCourse,
} from '../../../test/fixture/course';
import { createUser } from '../../../test/fixture/user';
import {
  cleanDB,
  startDB,
  testImportModules,
} from '../../../test/helper/utils';
import { endDB } from '../../common/db';
import { DB, DbType } from '../../global/providers/db.provider';
import { UserProgressService } from '../user-progress.service';

const userData = createUser();
const password = '123456';

const firstCourse = createFirstCourse();
const secondCourse = createSecondCourse();
describe('user-progress service', () => {
  let userProgressService: UserProgressService;
  let db: DbType;

  beforeAll(async () => {
    const testHelper = await setupTesting();
    await setupDatabaseData(testHelper.db);

    db = testHelper.db;
    userProgressService = testHelper.userProgressService;
  });

  afterAll(async () => {
    await cleanDB(db);
    await endDB();
  });

  beforeEach(async () => {
    await startDB(db);
  });

  it('should create user progress', async () => {
    const data = await userProgressService.create(
      userData.userId,
      firstCourse.id,
    );
    expect(data.courseId).toBe(firstCourse.id);
  });

  it('should find user progress', async () => {
    const data = await userProgressService.findOne(userData.userId);
    expect(data.courseId).toBe(firstCourse.id);
  });

  it('should update user progress', async () => {
    const data = await userProgressService.update(
      userData.userId,
      secondCourse.id,
    );
    expect(data.courseId).toBe(secondCourse.id);
  });
});

async function setupDatabaseData(db: DbType) {
  await cleanDB(db);
  await setupDBData(db);
}
async function setupTesting() {
  const moduleRef = await Test.createTestingModule({
    imports: testImportModules,
    providers: [UserProgressService],
  }).compile();

  return {
    db: moduleRef.get<DbType>(DB),
    userProgressService:
      moduleRef.get<UserProgressService>(UserProgressService),
  };
}

async function setupDBData(db: DbType) {
  // create user data
  const [res] = await db.insert(user).values({
    name: userData.username,
    phone: userData.phone,
    password: await argon2.hash(password),
  });

  const userId = res.insertId;
  // create course data
  await db.insert(course).values(firstCourse);
  await db.insert(course).values(secondCourse);

  // create user progress data
  await db.insert(userProgress).values({
    courseId: firstCourse.id,
    userId: userId,
  });
}
