import { Test } from '@nestjs/testing';
import {
  cleanDB,
  startDB,
  testImportModules,
} from '../../../test/helper/utils';
import { GameService } from '../game.service';
import { UserProgressService } from '../../user-progress/user-progress.service';
import { CourseService } from '../../course/course.service';
import { DB, DbType } from '../../global/providers/db.provider';
import { endDB } from '../../common/db';
import { createUser } from '../../../test/fixture/user';

const user = createUser();
const mockProgressService = {
  findOne: jest.fn((userId) => {
    return {
      courseId: 1,
    };
  }),
  create: jest.fn(),
};

describe('game service', () => {
  let db: DbType;
  let gameService: GameService;
  let userProgress: UserProgressService;
  let courseService: CourseService;

  beforeAll(async () => {
    const testHelper = await setupTesting();
    db = testHelper.db;
    gameService = testHelper.gameService;
    userProgress = testHelper.userProgressService;
    courseService = testHelper.courseService;
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

  it('should start game', async () => {
    const { cId } = await gameService.startGame(user);
    expect(userProgress.findOne).toHaveBeenCalledWith(user.userId);
    expect(cId).toBe(1);
  });

  it('should start game in user progress is null', async () => {
    mockProgressService.findOne = jest.fn((userId) => ({ courseId: null }));
    const { cId } = await gameService.startGame(user);
    expect(userProgress.create).toHaveBeenCalled();
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
    courseService: moduleRef.get<CourseService>(CourseService),
    db: moduleRef.get<DbType>(DB),
  };
}
