import { Test } from '@nestjs/testing';
import { createUser } from '../../../test/fixture/user';
import { cleanDB, testImportModules } from '../../../test/helper/utils';
import { endDB } from '../../common/db';
import { CourseService } from '../../course/course.service';
import { DB, DbType } from '../../global/providers/db.provider';
import { UserProgressService } from '../../user-progress/user-progress.service';
import { GameService } from '../game.service';

const user = createUser();
const mockProgressService = {
  findOne: jest.fn().mockReturnValue({ courseId: 1 }),
  create: jest.fn(),
};

describe('game service', () => {
  let db: DbType;
  let gameService: GameService;
  let userProgress: UserProgressService;

  beforeAll(async () => {
    const testHelper = await setupTesting();
    db = testHelper.db;
    gameService = testHelper.gameService;
    userProgress = testHelper.userProgressService;
  });

  afterAll(async () => {
    await cleanDB(db);
    await endDB();
  });

  afterEach(async () => {
    jest.clearAllMocks();
  });

  it('should start game', async () => {
    const { cId } = await gameService.startGame(user);

    expect(userProgress.findOne).toHaveBeenCalledWith(user.userId);
    expect(cId).toBe(1);
  });

  it('should start game in user progress is null', async () => {
    mockProgressService.findOne.mockReturnValue({ courseId: null });

    const { cId } = await gameService.startGame(user);

    expect(cId).toBe(1);
  });
});

async function setupTesting() {
  const mockCourseService = {
    getFirstCourse: jest.fn().mockResolvedValue({ id: 1 }),
  };
  const moduleRef = await Test.createTestingModule({
    imports: testImportModules,
    providers: [
      GameService,
      {
        provide: UserProgressService,
        useValue: mockProgressService,
      },
      {
        provide: CourseService,
        useValue: mockCourseService,
      },
    ],
  }).compile();

  return {
    gameService: moduleRef.get<GameService>(GameService),
    userProgressService:
      moduleRef.get<UserProgressService>(UserProgressService),
    db: moduleRef.get<DbType>(DB),
  };
}
