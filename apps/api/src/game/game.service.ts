import { Inject, Injectable } from '@nestjs/common';
import { CourseService } from 'src/course/course.service';
import { DB, DbType } from 'src/global/providers/db.provider';
import { UserProgressService } from 'src/user-progress/user-progress.service';
import { UserEntity } from 'src/user/user.decorators';

@Injectable()
export class GameService {
  constructor(
    @Inject(DB) private db: DbType,
    private readonly courseService: CourseService,
    private readonly userProgressService: UserProgressService,
  ) {}

  async startGame(user: UserEntity) {
    const { courseId } = await this.userProgressService.findOne(user.userId);
    const { id } = await this.courseService.getFirstCourse();

    if (!courseId) {
      await this.userProgressService.create(user.userId, id);
      return {
        cId: id,
      };
    }

    return { cId: courseId };
  }
}
