import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { and, asc, eq, gt } from "drizzle-orm";

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

  async findWithUserProgress(coursePackId: number, courseId: number, userId: string) {
    const courseEntity = await this.find(coursePackId, courseId);

    const statementIndex = await this.userCourseProgressService.findStatement(
      userId,
      coursePackId,
      courseId,
    );

    return { ...courseEntity, statementIndex };
  }

  async findNext(coursePackId: number, courseId: number) {
    const result = await this._findNext(coursePackId, courseId);

    if (!result) {
      throw new NotFoundException(
        `Can't find the next course -> coursePackId: ${coursePackId} courseId: ${courseId}`,
      );
    }

    return result;
  }

  private async _findNext(coursePackId: number, courseId: number) {
    const nextCourse = await this.db.query.course.findFirst({
      where: and(gt(course.id, courseId), eq(course.coursePackId, coursePackId)),
    });

    return nextCourse;
  }

  async completeCourse(userId: string, coursePackId: number, courseId: number) {
    if (userId) {
      await this.rankService.userFinishCourse(userId);
      await this.courseHistoryService.upsert(userId, coursePackId, courseId);
      await this.userLearnRecordService.upsert(userId);
    }

    return {
      nextCourse: await this._findNext(coursePackId, courseId),
    };
  }
}
