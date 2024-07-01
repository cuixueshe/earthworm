import { Inject, Injectable, Logger } from "@nestjs/common";
import { Cron } from "@nestjs/schedule";
import { and, eq, lt } from "drizzle-orm";

import { membership } from "@earthworm/schema";
import { DB, DbType } from "../global/providers/db.provider";
import { BuyMembershipDto, MembershipPeriod } from "./dto/buy-membership.dto";

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

  async checkMembership(userId: string): Promise<{ isActive: boolean; endDate: Date | null }> {
    let result = await this.db.select().from(membership).where(eq(membership.userId, userId));
    const membershipEntity = result[0];
    // 如果有会员记录并且isActive为true，则会员有效
    const isActive = membershipEntity ? membershipEntity.isActive : false;
    return {
      isActive: isActive,
      endDate: membershipEntity ? membershipEntity.end_date : null,
    };
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
