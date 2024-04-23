import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { and, eq } from "drizzle-orm";
import { CourseService } from "src/course/course.service";

import { courseHistory, coursePack } from "@earthworm/schema";
import { DB, DbType } from "../global/providers/db.provider";
import { UserEntity } from "../user/user.decorators";
import { CreateCoursePackDto } from "./dto/create-course-pack.dto";

@Injectable()
export class CoursePackService {
  constructor(
    @Inject(DB) private db: DbType,
    private readonly courseService: CourseService,
  ) {}

  async findAll() {
    return await this.db.query.coursePack.findMany();
  }

  private async findCompletionCount(userId: string, coursePackId: number, courseId: number) {
    const record = await this.db.query.courseHistory.findFirst({
      where: and(
        eq(courseHistory.userId, userId),
        eq(courseHistory.coursePackId, coursePackId),
        eq(courseHistory.courseId, courseId),
      ),
    });

    return record ? record.completionCount : 0;
  }

  async findOne(coursePackId: number, userId?: string) {
    const result = await this.db.query.coursePack.findFirst({
      where: eq(coursePack.id, coursePackId),
      with: {
        courses: true,
      },
    });

    if (!result) {
      throw new NotFoundException(`CoursePack with ID ${coursePackId} not found`);
    }

    const newCourses = await Promise.all(
      result.courses.map(async (course) => {
        const completionCount = userId
          ? await this.findCompletionCount(userId, coursePackId, course.id)
          : 0;

        return {
          ...course,
          completionCount,
        };
      }),
    );

    result.courses = newCourses;

    return result;
  }

  async create(createCoursePackDto: CreateCoursePackDto) {
    await this.db.insert(coursePack).values({
      title: createCoursePackDto.title,
      description: createCoursePackDto.description,
      isFree: createCoursePackDto.isFree || true,
    });
  }

  async findCourse(coursePackId: number, courseId: number, userId?: string) {
    return await this.courseService.find(coursePackId, courseId, userId);
  }

  async findNextCourse(coursePackId: number, courseId: number) {
    return await this.courseService.findNext(coursePackId, courseId);
  }

  async completeCourse(user: UserEntity, coursePackId: number, courseId: number) {
    return await this.courseService.completeCourse(user, coursePackId, courseId);
  }
}
