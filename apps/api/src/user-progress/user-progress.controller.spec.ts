import { cleanupMockDb } from '../utils/helpers/cleanupDb';
import { mockDb } from '../utils/helpers/mockDb';
import { UserProgressController } from './user-progress.controller';
import { UserProgressService } from './user-progress.service';
import { createSignInfo } from '../utils/helpers/user';

describe('UserProgress', () => {
  let userProgressController: UserProgressController;
  let userProgressService: UserProgressService;
  let userInfo: Awaited<ReturnType<typeof createSignInfo>>;

  beforeAll(async () => {
    userInfo = await createSignInfo();
    userProgressService = new UserProgressService(mockDb);
    userProgressController = new UserProgressController(userProgressService);
  });

  afterAll(async () => {
    await cleanupMockDb();
  });

  it('happy path', () => {
    expect(userProgressController).toBeDefined();
    expect(userProgressService).toBeDefined();
  });

  it('should create a user progress', async () => {
    const res = await userProgressController.create(userInfo.user, {
      courseId: 1,
    });
    expect(res.courseId).toBeDefined();
  });

  it('should not create a user progress with same user and course', async () => {
    expect(
      userProgressController.create(userInfo.user, {
        courseId: 1,
      }),
    ).rejects.toThrow();
  });

  it('should can find userProgress with userId', async () => {
    const res = await userProgressController.findOne(userInfo.user);
    expect(res).toMatchObject({
      courseId: 1,
    });
  });

  it('should can update userProgress with userId', async () => {
    const res = await userProgressController.updateOne(userInfo.user, {
      courseId: 2,
    });
    expect(res).toMatchObject({
      courseId: 2,
    });
  });
});
