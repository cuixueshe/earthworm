import { HttpException, Inject, Injectable } from "@nestjs/common";
import { eq } from "drizzle-orm";

import { course, coursePack } from "@earthworm/schema";
import { DB, DbType } from "../global/providers/db.provider";
import { LogtoService } from "../logto/logto.service";
import { UserCourseProgressService } from "../user-course-progress/user-course-progress.service";
import { UserEntity } from "../user/user.decorators";
import { UpdateUserDto } from "./model/user.dto";

@Injectable()
export class UserService {
  constructor(
    @Inject(DB) private db: DbType,
    private readonly logtoService: LogtoService,
    private readonly userCourseProgressService: UserCourseProgressService,
  ) {}

  async findUser(uId: string) {
    try {
      const { data } = await this.logtoService.logtoApi.get(`/api/users/${uId}`);
      return data;
    } catch (error) {
      return undefined;
    }
  }
  async updateUser(user: UserEntity, dto: UpdateUserDto) {
    try {
      const { data } = await this.logtoService.logtoApi.patch(`/api/users/${user.userId}`, dto);
      return { data };
    } catch (e) {
      throw new HttpException(e.response.data.message, e.response.status);
    }
  }

  async setup(user: UserEntity, dto: { username: string; avatar: string }) {
    if (!dto.avatar) {
      dto.avatar = this.getAvatarUrl();
    }
    const result = await this.updateUser(user, { username: dto.username, avatar: dto.avatar });

    const { id, courses } = await this.db.query.coursePack.findFirst({
      where: eq(coursePack.order, 1),
      with: {
        courses: {
          where: eq(course.order, 1),
        },
      },
    });

    await this.userCourseProgressService.upsert(user.userId, id, courses.at(0).id, 0);
    return result;
  }

  private getAvatarUrl() {
    const order = this.getRandomNumber();

    return `https://earthworm-prod-1312884695.cos.ap-beijing.myqcloud.com/avatars/avatar${order}.png`;
  }

  private getRandomNumber() {
    return Math.floor(Math.random() * 9) + 1;
  }

  async getUserCustomData(userId: string) {
    try {
      const { data } = await this.logtoService.logtoApi.get(`/api/users/${userId}/custom-data`);
      return { data };
    } catch (e) {
      throw new HttpException(e.response.data.message, e.response.status);
    }
  }

  async updateUserCustomData(userId: string, data: Record<PropertyKey, any>) {
    try {
      const { data: res } = await this.logtoService.logtoApi.patch(
        `/api/users/${userId}/custom-data`,
        data,
      );
      return { data: res };
    } catch (e) {
      throw new HttpException(e.response.data.message, e.response.status);
    }
  }
}
