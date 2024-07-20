import { Inject, Injectable, Logger } from "@nestjs/common";
import { Cron } from "@nestjs/schedule";
import { and, eq, lt } from "drizzle-orm";

import { membership } from "@earthworm/schema";
import { DB, DbType } from "../global/providers/db.provider";
import { BuyMembershipDto, MembershipPeriod } from "./dto/buy-membership.dto";
import { MembershipType } from "./types/membership.types";

@Injectable()
export class MembershipService {
  private readonly logger = new Logger(MembershipService.name);
  constructor(@Inject(DB) private db: DbType) {}

  async upsert(startDate: Date, buyMembershipDto: BuyMembershipDto) {
    const { userId } = buyMembershipDto;

    const membershipEntity = await this.findMembership(userId);

    if (membershipEntity && membershipEntity.isActive) {
      // 如果用户是激活状态的会员，则延长会员期限
      const endDate = this.calculateEndDate(membershipEntity.end_date, buyMembershipDto);
      await this.db
        .update(membership)
        .set({
          end_date: endDate,
        })
        .where(eq(membership.userId, userId));

      this.logger.log(`Membership for user ${userId} extend end date to ${endDate}`);

      return { endDate, startDate, isActive: true };
    } else {
      // 如果用户不是会员或会员已过期，则创建新会员或重置会员期限
      const endDate = this.calculateEndDate(startDate, buyMembershipDto);

      if (!membershipEntity) {
        // 如果用户不是会员，则创建新会员记录
        await this.db.insert(membership).values({
          userId,
          start_date: startDate,
          end_date: endDate,
          isActive: true,
        });

        this.logger.log(`Membership for user ${userId} has been created`);
      } else {
        await this.db
          .update(membership)
          .set({ end_date: endDate, isActive: true, start_date: startDate })
          .where(eq(membership.userId, userId));

        this.logger.log(`Membership for user ${userId} has been updated`);
      }

      return { endDate, startDate, isActive: true };
    }
  }

  private async findMembership(userId: string) {
    const result = await this.db.select().from(membership).where(eq(membership.userId, userId));
    return result[0];
  }

  private calculateEndDate(startDate: Date, buyMembershipDto: BuyMembershipDto) {
    const { period, duration } = buyMembershipDto;
    const endDate = new Date(startDate);
    if (period === MembershipPeriod.MONTH) {
      endDate.setMonth(endDate.getMonth() + Number(duration));
    } else if (period === MembershipPeriod.YEAR) {
      endDate.setFullYear(endDate.getFullYear() + Number(duration));
    }
    return endDate;
  }

  async isMember(userId: string) {
    const result = await this.db.query.membership.findFirst({
      where: eq(membership.userId, userId),
    });

    return result?.isActive || false;
  }

  async getMembershipDetails(userId: string) {
    const result = await this.db.query.membership.findFirst({
      columns: {
        end_date: true,
        type: true,
        start_date: true,
      },
      where: and(eq(membership.userId, userId), eq(membership.isActive, true)),
    });

    if (!result) return;

    return {
      startDate: result.start_date,
      endDate: result.end_date,
      type: result.type,
    };
  }

  public async isFounderMembership(userId: string) {
    // 创始会员永久有效 所以不需要检查 active
    const result = await this.db.query.membership.findFirst({
      where: and(eq(membership.userId, userId), eq(membership.type, MembershipType.FOUNDER)),
    });

    return Boolean(result);
  }

  @Cron("0 0 * * *")
  async deactivateExpiredMemberships(currentDate: Date) {
    this.logger.log("Running scheduled task to deactivate expired memberships");
    try {
      await this.db
        .update(membership)
        .set({
          isActive: false,
        })
        .where(and(eq(membership.isActive, true), lt(membership.end_date, currentDate)));

      this.logger.log(`Deactivated expired memberships`);
    } catch (error) {
      this.logger.error("Failed to deactivate expired memberships", error.stack);
    }
  }
}
