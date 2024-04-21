import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { eq } from "drizzle-orm";
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
  ) {}

  async findAll() {
    return await this.db.query.coursePack.findMany({
      columns: {
        progress: false,
      },
    });
  }

  async findOne(id: number) {
    const result = await this.db.query.coursePack.findFirst({
      where: eq(coursePack.id, id),
      with: {
        courses: {
          columns: {
            id: false,
          },
        },
      },
    });

    if (!result) {
      throw new NotFoundException(`CoursePack with ID ${id} not found`);
    }

    return result;
  }

  async create(createCoursePackDto: CreateCoursePackDto) {
    await this.db.insert(coursePack).values({
      title: createCoursePackDto.title,
      description: createCoursePackDto.description,
      progress: 0,
      isFree: createCoursePackDto.isFree || true,
    });
  }

  async findCourse(coursePackId: number, courseId: number) {
    return await this.courseService.find(coursePackId, courseId);
  }

  async findNextCourse(coursePackId: number, courseId: number) {
    return await this.courseService.findNext(coursePackId, courseId);
  }

  async completeCourse(user: UserEntity, coursePackId: number, courseId: number) {
    return await this.courseService.completeCourse(user, coursePackId, courseId);
  }
}
