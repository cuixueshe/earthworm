import { JwtModule } from '@nestjs/jwt';
import { RankService } from '../rank/rank.service';
import { UserProgressService } from '../user-progress/user-progress.service';
import { cleanupMockDb } from '../utils/helpers/cleanupDb';
import { MockDBModule } from '../utils/helpers/mockDb';
import { Test } from '@nestjs/testing';
import { MockRedisModule } from '../utils/helpers/mockRedis';
import { createSignInfo } from '../utils/helpers/user';
import { CourseService } from '../course/course.service';
import { GameController } from './game.controller';
import { GameService } from './game.service';

describe('Game', () => {
  let gameController: GameController;
  let userProgressService: UserProgressService;

  let userInfo: Awaited<ReturnType<typeof createSignInfo>>;
  beforeAll(async () => {
    userInfo = await createSignInfo();
    const moduleRef = await Test.createTestingModule({
      imports: [
        MockDBModule,
        MockRedisModule,
        JwtModule.register({
          secret: process.env.SECRET,
          signOptions: { expiresIn: '7d' },
        }),
      ],
      providers: [GameService, CourseService, UserProgressService, RankService],
      controllers: [GameController],
    }).compile();

    gameController = moduleRef.get<GameController>(GameController);
    userProgressService =
      moduleRef.get<UserProgressService>(UserProgressService);
  });
  afterAll(async () => {
    await cleanupMockDb();
  });

  it('happy path', () => {
    expect(userInfo).toBeDefined();
  });

  it('should return first courseId', async () => {
    const res = await gameController.startGame(userInfo.user);
    expect(res.cId).toBe(1);
  });

  it('should return userProgress courseId', async () => {
    await userProgressService.update(userInfo.user.userId, 3);
    const res = await gameController.startGame(userInfo.user);
    expect(res.cId).toBe(3);
  });
});
