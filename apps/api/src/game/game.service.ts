import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { CourseService } from '../course/course.service';
import { DB, DbType } from '../global/providers/db.provider';
import { UserProgressService } from '../user-progress/user-progress.service';
import { UserEntity } from '../user/user.decorators';
import { RankService } from '../rank/rank.service';
import { CourseHistoryService } from '../course-history/course-history.service';

@Injectable()
export class GameService {
  constructor(
    @Inject(DB) private db: DbType,
    @Inject(forwardRef(() => CourseService))
    private readonly courseService: CourseService,
    private readonly userProgressService: UserProgressService,
    private readonly rankService: RankService,
    private readonly courseHistoryService: CourseHistoryService,
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

  async completeGame(user: UserEntity, courseId: number) {
    const nextCourse = await this.courseService.findNext(courseId);
    await this.userProgressService.update(user.userId, nextCourse.id);
    await this.rankService.userFinishCourse(user.userId, user.username);
    await this.courseHistoryService.setCompletionCount(user.userId, courseId);
    return nextCourse;
  }
}
