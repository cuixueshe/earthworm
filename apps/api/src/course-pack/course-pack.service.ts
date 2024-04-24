import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { eq } from "drizzle-orm";
import { CourseHistoryService } from "src/course-history/course-history.service";
import { CourseService } from "src/course/course.service";

import { coursePack } from "@earthworm/schema";
import { DB, DbType } from "../global/providers/db.provider";
import { UserEntity } from "../user/user.decorators";
import { CreateCoursePackDto } from "./dto/create-course-pack.dto";

@Injectable()
export class CoursePackService {
  constructor(
    @Inject(DB) private db: DbType,
    private readonly courseService: CourseService,
    private readonly courseHistoryService: CourseHistoryService,
  ) {}

  async findAll() {
    return await this.db.query.coursePack.findMany();
  }

  async findOne(coursePackId: number) {
    const result = await this.db.query.coursePack.findFirst({
      where: eq(coursePack.id, coursePackId),
    });

    if (!result) {
      throw new NotFoundException(`CoursePack with ID ${coursePackId} not found`);
    }

    return result;
  }

  async findOneWithCourses(user: UserEntity, coursePackId: number) {
    const coursePackWithCourses = await this.findCoursePackWithCourses(coursePackId);

    if (user.userId) {
      coursePackWithCourses.courses = await this.addCompletionCountsToCourses(
        user.userId,
        coursePackWithCourses.courses,
        coursePackId,
      );
    }

    return coursePackWithCourses;
  }

  private async findCoursePackWithCourses(coursePackId: number) {
    const coursePackWithCourses = await this.db.query.coursePack.findFirst({
      where: eq(coursePack.id, coursePackId),
      with: {
        courses: true,
      },
    });

    if (!coursePackWithCourses) {
      throw new NotFoundException(`CoursePack with ID ${coursePackId} not found`);
    }

    return coursePackWithCourses;
  }

  private async addCompletionCountsToCourses(userId: string, courses: any[], coursePackId: number) {
    return await Promise.all(
      courses.map(async (course) => {
        const completionCount = await this.courseHistoryService.findCompletionCount(
          userId,
          coursePackId,
          course.id,
        );
        return {
          ...course,
          completionCount,
        };
      }),
    );
  }

  async create(createCoursePackDto: CreateCoursePackDto) {
    await this.db.insert(coursePack).values({
      title: createCoursePackDto.title,
      description: createCoursePackDto.description,
      isFree: createCoursePackDto.isFree || true,
    });
  }

  async findCourse(user: UserEntity, coursePackId: number, courseId: number) {
    if (user.userId) {
      return await this.courseService.findWithUserProgress(coursePackId, courseId, user.userId);
    } else {
      return await this.courseService.find(coursePackId, courseId);
    }
  }

  async findNextCourse(coursePackId: number, courseId: number) {
    return await this.courseService.findNext(coursePackId, courseId);
  }

  async completeCourse(user: UserEntity, coursePackId: number, courseId: number) {
    return await this.courseService.completeCourse(user, coursePackId, courseId);
  }
}
