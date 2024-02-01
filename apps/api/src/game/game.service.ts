import { Injectable } from '@nestjs/common';
import { CourseService } from '../course/course.service';
import { UserProgressService } from '../user-progress/user-progress.service';
import { UserEntity } from '../user/user.decorators';

@Injectable()
export class GameService {
  constructor(
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
