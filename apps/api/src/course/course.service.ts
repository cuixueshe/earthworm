import { DB, DbType } from '../global/providers/db.provider';
import { eq, asc, gt } from 'drizzle-orm';
import { statement, course } from '@earthwrom/shared';
import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class CourseService {
  constructor(@Inject(DB) private db: DbType) {}

  async findNext(courseId: number) {
    const result = await this.db
      .select({ id: course.id, title: course.title })
      .from(course)
      .where(gt(course.id, courseId))
      .orderBy(asc(course.id));

    if (result.length < 0) {
      throw new HttpException(
        'There is no next course',
        HttpStatus.BAD_REQUEST,
      );
    }

    const nextCourse = result[0];

    const statementsResult = await this.findStatements(nextCourse.id);

    const finalResult = {
      id: nextCourse.id,
      title: nextCourse.title,
      statements: statementsResult,
    };

    return finalResult;
  }

  async findAll() {
    const courseResult = await this.db
      .select({
        id: course.id,
        title: course.title,
      })
      .from(course);

    return courseResult;
  }

  async find(courseId: number) {
    const courseResult = await this.db
      .select({
        id: course.id,
        title: course.title,
      })
      .from(course)
      .where(eq(course.id, courseId));

    const statementsResult = await this.findStatements(courseId);

    const finalResult = {
      id: courseResult[0].id,
      title: courseResult[0].title,
      statements: statementsResult,
    };

    return finalResult;
  }

  private async findStatements(courseId) {
    return await this.db
      .select({
        id: statement.id,
        chinese: statement.chinese,
        english: statement.english,
        soundmark: statement.soundmark,
      })
      .from(statement)
      .where(eq(statement.courseId, courseId))
      .orderBy(asc(statement.order));
  }
}
