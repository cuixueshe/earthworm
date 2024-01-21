import { DB, DbType } from '../global/providers/db.provider';
import { eq, asc } from 'drizzle-orm';
import { statement, course } from '@earthwrom/shared';
import { Injectable, Inject } from '@nestjs/common';

@Injectable()
export class CourseService {
  constructor(@Inject(DB) private db: DbType) {}

  async find(courseId: number) {
    const courseResult = await this.db
      .select({
        id: course.id,
        title: course.title,
      })
      .from(course)
      .where(eq(course.id, courseId));

    const statementsResult = await this.db
      .select({
        id: statement.id,
        chinese: statement.chinese,
        english: statement.english,
        soundmark: statement.soundmark,
      })
      .from(statement)
      .where(eq(statement.courseId, courseId))
      .orderBy(asc(statement.order));

    const finalResult = {
      id: courseResult[0].id,
      title: courseResult[0].title,
      statements: statementsResult,
    };

    return finalResult;
  }
}
