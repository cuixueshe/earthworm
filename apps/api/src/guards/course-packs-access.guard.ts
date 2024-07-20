import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";

import { CoursePackService } from "../course-pack/course-pack.service";
import { MembershipService } from "../membership/membership.service";

@Injectable()
export class CoursePacksAccessGuard implements CanActivate {
  constructor(
    private coursePackService: CoursePackService,
    private membershipService: MembershipService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const userId = request.userId; // 从 AuthGuard 中得到的用户信息

    const coursePack = await this.coursePackService.findOne(request.params.coursePackId);

    if (coursePack.isFree) {
      return true;
    }

    if (!userId) {
      throw new ForbiddenException("这是会员专属内容");
    }

    const isMember = await this.membershipService.isMember(userId);

    if (!isMember) {
      throw new ForbiddenException("这是会员专属内容");
    }

    return true;
  }
}
