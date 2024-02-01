import { JwtModule } from '@nestjs/jwt';
import { RankService } from '../rank/rank.service';
import { UserProgressService } from '../user-progress/user-progress.service';
import { cleanupMockDb } from '../utils/helpers/cleanupDb';
import { MockDBModule } from '../utils/helpers/mockDb';
import { CourseController } from './course.controller';
import { CourseService } from './course.service';
import { Test } from '@nestjs/testing';
import { MockRedisModule } from '../utils/helpers/mockRedis';
import { createSignInfo } from '../utils/helpers/user';

describe('Course', () => {
  let courseController: CourseController;
  let courseService: CourseService;
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
      providers: [CourseService, UserProgressService, RankService],
      controllers: [CourseController],
    }).compile();
    courseController = moduleRef.get<CourseController>(CourseController);
    courseService = moduleRef.get<CourseService>(CourseService);
    userProgressService =
      moduleRef.get<UserProgressService>(UserProgressService);
  });
  afterAll(async () => {
    await cleanupMockDb();
  });

  it('should return first course statements', async () => {
    const res = await courseController.findOne(1);
    expect(res.statements).toBeDefined();
    expect(res.statements.length).toBeGreaterThan(0);
  });

  it('should return all courses', async () => {
    const res = await courseController.findAll();
    expect(res.length).toBeGreaterThan(0);
  });

  it('should return next course data', async () => {
    const res = await courseController.findNext(1);
    expect(res.id).toBe(2);
  });

  it('should user complete a course', async () => {
    const res = await courseController.completeCourse(userInfo.user, 1);
    expect(res.id).toBe(2);
  });

  it('should startCourse is first course', async () => {
    const res = await courseController.startCourse(userInfo.user);
    expect(res.cId).toBe(1);
  });

  it('should startCourse is userProgress', async () => {
    await userProgressService.update(userInfo.user.userId, 2);
    const res = await courseController.startCourse(userInfo.user);
    expect(res.cId).toBe(2);
  });
});
