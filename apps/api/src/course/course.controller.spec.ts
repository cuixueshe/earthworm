import { JwtModule } from '@nestjs/jwt';
import { RankService } from '../rank/rank.service';
import { UserProgressService } from '../user-progress/user-progress.service';
import { MockDBModule } from '../../tests/helper/mockDb';
import { CourseController } from './course.controller';
import { CourseService } from './course.service';
import { Test } from '@nestjs/testing';
import { MockRedisModule } from '../../tests/helper/mockRedis';
import { createUser } from '../../tests/fixture/user';
import { createFirstCourse } from '../../tests/fixture/course';

const user = createUser();
const course = createFirstCourse();

describe('Course', () => {
  let courseController: CourseController;
  let courseService: CourseService;

  beforeAll(async () => {
    const testHelper = await setupTesting();
    courseController = testHelper.courseController;
    courseService = testHelper.courseService;
  });

  it('should return first course statements', async () => {
    const res = await courseController.findOne(1);

    expect(res).toEqual(course);
    expect(courseService.find).toHaveBeenCalled();
  });

  it('should return all courses', async () => {
    const res = await courseController.findAll();

    expect(res.length).toBeGreaterThan(0);
    expect(courseService.findAll).toHaveBeenCalled();
  });

  it('should return next course for findNext', async () => {
    const res = await courseController.findNext(1);

    expect(res).toEqual({ id: 2 });
    expect(courseService.findNext).toHaveBeenCalledWith(1);
  });

  it('should call completeCourse on service when completeCourse is called', async () => {
    const res = await courseController.completeCourse(user, 1);

    expect(res).toEqual({ id: 2 });
    expect(courseService.completeCourse).toHaveBeenCalledWith(user, 1);
  });
});

async function setupTesting() {
  const mockCourseService = {
    find: jest.fn(() => course),
    findAll: jest.fn(() => [{}, {}]), // 假设有两个课程
    findNext: jest.fn((id) => ({ id: id + 1 })),
    completeCourse: jest.fn((user, id) => ({
      id: id + 1,
    })),
    startCourse: jest.fn(),
  };

  const moduleRef = await Test.createTestingModule({
    imports: [
      MockDBModule,
      MockRedisModule,
      JwtModule.register({
        secret: process.env.SECRET,
        signOptions: { expiresIn: '7d' },
      }),
    ],
    providers: [
      { provide: CourseService, useValue: mockCourseService },
      UserProgressService,
      RankService,
    ],
    controllers: [CourseController],
  }).compile();

  return {
    courseController: moduleRef.get<CourseController>(CourseController),
    courseService: moduleRef.get<CourseService>(CourseService),
  };
}
