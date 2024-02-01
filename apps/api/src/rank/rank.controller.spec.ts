import { mockRedis } from '../utils/helpers/mockRedis';
import { cleanupMockDb } from '../utils/helpers/cleanupDb';
import { createSignInfo } from '../utils/helpers/user';
import { RankController } from './rank.controller';
import { RankService } from './rank.service';

describe('Rank', () => {
  let rankController: RankController;
  let rankService: RankService;
  let userInfo: Awaited<ReturnType<typeof createSignInfo>>;

  beforeAll(async () => {
    userInfo = await createSignInfo();
    rankService = new RankService(mockRedis);
    rankController = new RankController(rankService);
  });

  afterAll(async () => {
    await mockRedis.flushall();
    await cleanupMockDb();
  });

  it('happy end', () => {
    expect(userInfo).toBeDefined();
  });

  it('should user finish a course', async () => {
    const count = await rankService.userFinishCourse(
      userInfo.user.userId,
      userInfo.user.username,
    );
    expect(count).toBe('1');
  });

  it('should update count when user finish a course again', async () => {
    const count = await rankService.userFinishCourse(
      userInfo.user.userId,
      userInfo.user.username,
    );
    expect(count).toBe('2');
  });

  it('should get rank', async () => {
    const res = await rankController.getRankList(userInfo.user);
    expect(res.list).toContainEqual({
      username: userInfo.user.username,
      count: '2',
    });
    expect(res.self).toEqual({
      username: userInfo.user.username,
      count: '2',
      rank: 0,
    });
  });

  it('should strive to achieve a high ranking among numerous participants', async () => {
    await rankService.userFinishCourse(2, 'xiaoming');
    await rankService.userFinishCourse(3, 'xiaoli');
    const res = await rankController.getRankList(userInfo.user);
    expect(res.list).toContainEqual({
      username: 'xiaoming',
      count: '1',
    });
    expect(res.list.length).toBe(3);
  });
});
