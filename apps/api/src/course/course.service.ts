import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { and, asc, eq, gt } from "drizzle-orm";

import { course, statement } from "@earthworm/schema";
import { CourseHistoryService } from "../course-history/course-history.service";
import { DB, DbType } from "../global/providers/db.provider";
import { RankService } from "../rank/rank.service";
import { UserCourseProgressService } from "../user-course-progress/user-course-progress.service";

@Injectable()
export class CourseService {
  constructor(
    @Inject(DB) private db: DbType,
    private readonly rankService: RankService,
    private readonly courseHistoryService: CourseHistoryService,
    private readonly userCourseProgressService: UserCourseProgressService,
  ) {}

  async find(coursePackId: string, courseId: string) {
    const courseEntity = await this.db.query.course.findFirst({
      where: and(eq(course.id, courseId), eq(course.coursePackId, coursePackId)),
      with: {
        statements: {
          columns: {
            id: false,
          },
          orderBy: [asc(statement.order)],
        },
      },
    });

    if (!courseEntity) {
      throw new NotFoundException(
        `CoursePack with ID ${coursePackId} and CourseId with ID ${courseId} not found`,
      );
    }

    return courseEntity;
  }

  async findWithUserProgress(coursePackId: string, courseId: string, userId: string) {
    const courseEntity = await this.find(coursePackId, courseId);

    const statementIndex = await this.userCourseProgressService.findStatement(
      userId,
      coursePackId,
      courseId,
    );

    return { ...courseEntity, statementIndex };
  }

  async findNext(coursePackId: string, courseId: string) {
    const result = await this._findNext(coursePackId, courseId);

    if (!result) {
      throw new NotFoundException(
        `Can't find the next course -> coursePackId: ${coursePackId} courseId: ${courseId}`,
      );
    }

    return result;
  }

  private async _findNext(coursePackId: string, courseId: string) {
    const { order } = await this.db.query.course.findFirst({
      where: eq(course.id, courseId),
    });

    const nextCourse = await this.db.query.course.findFirst({
      where: and(eq(course.coursePackId, coursePackId), eq(course.order, order + 1)),
    });

    return nextCourse;
  }

  async completeCourse(userId: string, coursePackId: string, courseId: string) {
    const nextCourse = await this._findNext(coursePackId, courseId);

    if (userId) {
      await this.rankService.userFinishCourse(userId);
      await this.courseHistoryService.upsert(userId, coursePackId, courseId);
      nextCourse &&
        (await this.userCourseProgressService.upsert(userId, coursePackId, nextCourse.id, 0));
    }

    return {
      nextCourse: await this._findNext(coursePackId, courseId),
    };
  }
}
