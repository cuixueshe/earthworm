import { HttpException, Inject, Injectable } from "@nestjs/common";
import { eq } from "drizzle-orm";

import { course, coursePack } from "@earthworm/schema";
import { DB, DbType } from "../global/providers/db.provider";
import { LogtoService } from "../logto/logto.service";
import { MembershipService } from "../membership/membership.service";
import { type MembershipDetails } from "../membership/types/membership.types";
import { UserCourseProgressService } from "../user-course-progress/user-course-progress.service";
import { UserEntity } from "../user/user.decorators";
import { UpdateUserDto } from "./model/user.dto";
import { type LogtoUserInfo } from "./types/user.types";

@Injectable()
export class UserService {
  constructor(
    @Inject(DB) private db: DbType,
    private readonly logtoService: LogtoService,
    private readonly userCourseProgressService: UserCourseProgressService,
    private readonly membershipService: MembershipService,
  ) {}

  async findUser(uId: string) {
    try {
      const { data: logtoUserInfo } = await this.logtoService.logtoApi.get<LogtoUserInfo>(
        `/api/users/${uId}`,
      );
      const isMember = await this.membershipService.isMember(uId);

      let membershipInfo: MembershipDetails = null;
      if (isMember) {
        membershipInfo = await this.membershipService.getMembershipDetails(uId);
      }

      return {
        ...logtoUserInfo,
        membership: {
          isMember,
          details: membershipInfo,
        },
      };
    } catch (error) {
      // 考虑是否需要更详细的错误处理
      console.error("Error fetching user info:", error);
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

  async setupNewUser(user: UserEntity, dto: { username: string; avatar: string }) {
    if (!dto.avatar) {
      dto.avatar = this.getAvatarUrl();
    }

    await this.updateUser(user, { username: dto.username, avatar: dto.avatar });

    const { id, courses } = await this.db.query.coursePack.findFirst({
      where: eq(coursePack.order, 1),
      with: {
        courses: {
          where: eq(course.order, 1),
        },
      },
    });

    await this.userCourseProgressService.upsert(user.userId, id, courses.at(0).id, 0);
    return {
      avatar: dto.avatar,
      username: dto.username,
    };
  }

  private getAvatarUrl() {
    const order = this.getRandomNumber();

    return `https://earthworm-prod-1312884695.cos.ap-beijing.myqcloud.com/avatars/avatar${order}.png`;
  }

  private getRandomNumber() {
    return Math.floor(Math.random() * 9) + 1;
  }
}
