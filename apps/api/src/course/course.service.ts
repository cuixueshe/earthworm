import { DB, DbType } from '../global/providers/db.provider';
import { eq, asc, gt } from 'drizzle-orm';
import { statement, course } from '@earthworm/shared';
import {
  Injectable,
  Inject,
  HttpException,
  HttpStatus,
  forwardRef,
} from '@nestjs/common';
import { UserEntity } from 'src/user/user.decorators';
import { GameService } from '../game/game.service';

@Injectable()
export class CourseService {
  constructor(
    @Inject(DB) private db: DbType,
    @Inject(forwardRef(() => GameService))
    private readonly gameService: GameService,
  ) {}

  async tryCourse() {
    const firstCourse = await this.getFirstCourse();

    const statementsResult = await this.findStatements(firstCourse.id);

    return {
      ...firstCourse,
      statements: statementsResult,
    };
  }

  async findNext(courseId: number) {
    const result = await this.db
      .select({ id: course.id, title: course.title })
      .from(course)
      .where(gt(course.id, courseId))
      .orderBy(asc(course.id));

    if (result.length <= 0) {
      throw new HttpException(
        'There is no next course',
        HttpStatus.BAD_REQUEST,
      );
    }

    return result[0];
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

  async getFirstCourse() {
    const courses = await this.findAll();
    return courses[0];
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

  async completeCourse(user: UserEntity, courseId: number) {
    return await this.gameService.completeGame(user, courseId);
  }
}
