import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { and, asc, eq, or } from "drizzle-orm";

import { course, coursePack } from "@earthworm/schema";
import { CourseHistoryService } from "../course-history/course-history.service";
import { CourseService } from "../course/course.service";
import { DB, DbType } from "../global/providers/db.provider";

@Injectable()
export class CoursePackService {
  constructor(
    @Inject(DB) private db: DbType,
    private readonly courseService: CourseService,
    private readonly courseHistoryService: CourseHistoryService,
  ) {}

  async findAll(userId?: string) {
    const userIdOwnedCoursePacks = userId ? await this.findAllForUser(userId) : [];
    const publicCoursePacks = await this.findAllPublicCoursePacks();

    return [...userIdOwnedCoursePacks, ...publicCoursePacks];
  }

  async findAllForUser(userId: string) {
    const userIdOwnedCoursePacks = await this.db.query.coursePack.findMany({
      orderBy: asc(coursePack.order),
      where: and(eq(coursePack.creatorId, userId), eq(coursePack.shareLevel, "private")),
    });

    return userIdOwnedCoursePacks;
  }

  async findAllPublicCoursePacks() {
    return await this.db.query.coursePack.findMany({
      orderBy: asc(coursePack.order),
      where: eq(coursePack.shareLevel, "public"),
    });
  }

  async findOne(coursePackId: string) {
    const result = await this.db.query.coursePack.findFirst({
      where: eq(coursePack.id, coursePackId),
    });

    if (!result) {
      throw new NotFoundException(`CoursePack with ID ${coursePackId} not found`);
    }

    return result;
  }

  async findOneWithCourses(userId: string, coursePackId: string) {
    const coursePackWithCourses = await this.findCoursePackWithCourses(coursePackId, userId);

    if (userId) {
      coursePackWithCourses.courses = await this.addCompletionCountsToCourses(
        userId,
        coursePackWithCourses.courses,
        coursePackId,
      );
    }

    return coursePackWithCourses;
  }

  private async findCoursePackWithCourses(coursePackId: string, userId: string) {
    const coursePackWithCourses = await this.db.query.coursePack.findFirst({
      where: and(
        eq(coursePack.id, coursePackId),
        or(eq(coursePack.shareLevel, "public"), eq(coursePack.creatorId, userId)),
      ),
      with: {
        courses: {
          orderBy: asc(course.order),
        },
      },
    });

    if (!coursePackWithCourses) {
      throw new NotFoundException(`CoursePack with ID ${coursePackId} not found`);
    }

    return coursePackWithCourses;
  }

  private async addCompletionCountsToCourses(userId: string, courses: any[], coursePackId: string) {
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

  async findCourse(userId: string, coursePackId: string, courseId: string) {
    if (userId) {
      return await this.courseService.findWithUserProgress(coursePackId, courseId, userId);
    } else {
      return await this.courseService.find(coursePackId, courseId);
    }
  }

  async findNextCourse(coursePackId: string, courseId: string) {
    return await this.courseService.findNext(coursePackId, courseId);
  }

  async completeCourse(userId: string, coursePackId: string, courseId: string) {
    return await this.courseService.completeCourse(userId, coursePackId, courseId);
  }
}
