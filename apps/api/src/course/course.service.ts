import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { and, asc, eq, gt } from "drizzle-orm";
import { UserEntity } from "src/user/user.decorators";

import { course, statement } from "@earthworm/schema";
import { CourseHistoryService } from "../course-history/course-history.service";
import { DB, DbType } from "../global/providers/db.provider";
import { RankService } from "../rank/rank.service";
import { UserCourseProgressService } from "../user-course-progress/user-course-progress.service";
import { UserLearnRecordService } from "../user-learn-record/user-learn-record.service";

@Injectable()
export class CourseService {
  constructor(
    @Inject(DB) private db: DbType,
    private readonly rankService: RankService,
    private readonly courseHistoryService: CourseHistoryService,
    private readonly userLearnRecordService: UserLearnRecordService,
    private readonly userCourseProgressService: UserCourseProgressService,
  ) {}

  async find(coursePackId: number, courseId: number) {
    const result = await this.db.query.course.findFirst({
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

    if (!result) {
      throw new NotFoundException(
        `CoursePack with ID ${coursePackId} and CourseId with ID ${courseId} not found`,
      );
    }

    return result;
  }

  async findNext(coursePackId: number, courseId: number) {
    const result = this.db.query.course.findFirst({
      where: and(gt(course.id, courseId), eq(course.coursePackId, coursePackId)),
    });

    if (!result) {
      throw new NotFoundException(
        `Can't find the next course -> coursePackId: ${coursePackId} courseId: ${courseId}`,
      );
    }

    return result;
  }

  async completeCourse(user: UserEntity, coursePackId: number, courseId: number) {
    if (user.userId) {
      await this.rankService.userFinishCourse(user.userId);
      await this.courseHistoryService.upsert(user.userId, coursePackId, courseId);
      await this.userLearnRecordService.upsert(user.userId);
    }

    const nextCourse = await this.findNext(coursePackId, courseId);
    if (nextCourse) {
      if (user.userId) {
        await this.userCourseProgressService.upsert(user.userId, coursePackId, nextCourse.id, 1);
      }
    }

    return {
      nextCourse,
    };
  }
}
