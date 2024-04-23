import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { CourseService } from "src/course/course.service";
import { MembershipService } from "src/membership/membership.service";

@Injectable()
export abstract class MembershipGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private membershipService: MembershipService,
  ) {}

  protected abstract getResource(request): Promise<any>;

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const resource = await this.getResource(request);

    if (!resource) {
      throw new NotFoundException("资源不存在。");
    }

    if (resource.isFree) {
      return true;
    }

    const userId = request.user.id;
    const membershipStatus = await this.membershipService.checkMembership(userId);

    if (!membershipStatus.isActive) {
      throw new ForbiddenException("这是会员专属内容。");
    }

    return true;
  }
}

@Injectable()
export class CourseMembershipGuard extends MembershipGuard {
  constructor(
    reflector: Reflector,
    membershipService: MembershipService,
    private courseService: CourseService,
  ) {
    super(reflector, membershipService);
  }

  protected getResource(request): Promise<any> {
    const courseId = request.params.courseId;
    return this.courseService.find(courseId);
  }
}

// TODO 给 music 用
// @Injectable()
// export class MusicMembershipGuard extends MembershipGuard {
//   constructor(
//     reflector: Reflector,
//     membershipService: MembershipService,
//     private musicService: MusicService, // 假设你有一个服务用来处理音乐相关操作
//   ) {
//     super(reflector, membershipService);
//   }

//   protected getResource(request): Promise<any> {
//     const trackId = request.params.trackId;
//     return this.musicService.findOne(trackId);
//   }
// }
