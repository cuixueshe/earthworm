import { Inject, Injectable } from "@nestjs/common";
import { and, eq } from "drizzle-orm";

import { badge, userBadge } from "@earthworm/schema";
import { DB, DbType } from "../global/providers/db.provider";

@Injectable()
export class UserBadgeService {
  constructor(
    @Inject(DB)
    private db: DbType,
  ) {}

  findWearingOderByUpdatedAt(userId: string) {
    return this.db.query.userBadge.findMany({
      with: {
        badge: true,
      },
      where: and(
        eq(userBadge.userId, userId),
        eq(userBadge.isWearing, true),
        eq(badge.wearable, true),
        eq(badge.enable, true),
      ),
      orderBy: (userBadge, { asc }) => [asc(userBadge.updatedAt)],
    });
  }

  findAll(userId: string) {
    return this.db.query.userBadge.findMany({
      with: {
        badge: true,
      },
      where: and(eq(userBadge.userId, userId), eq(badge.enable, true)),
    });
  }

  async wearing(userId: string, badgeId: string) {
    return await this.db
      .update(userBadge)
      .set({ isWearing: true })
      .where(and(eq(userBadge.userId, userId), eq(userBadge.badgeId, badgeId)))
      .returning();
  }
  async unWearing(userId: string, badgeId: string) {
    return await this.db
      .update(userBadge)
      .set({ isWearing: false })
      .where(and(eq(userBadge.userId, userId), eq(userBadge.badgeId, badgeId)))
      .returning();
  }

  async toTop(userId: string, badgeId: string) {
    // update updated_at as to top
    return await this.db
      .update(userBadge)
      // maybe `.set({})` is better
      .set({ updatedAt: new Date() })
      .where(
        and(
          eq(userBadge.userId, userId),
          eq(userBadge.badgeId, badgeId),
          eq(userBadge.isWearing, true),
        ),
      )
      .returning();
  }

  async read(userId: string, badgeId: string) {
    return await this.db
      .update(userBadge)
      .set({ read: true })
      .where(and(eq(userBadge.userId, userId), eq(userBadge.badgeId, badgeId)))
      .returning();
  }

  async findAllByUnread(userId: string) {
    return await this.db.query.userBadge.findMany({
      where: and(eq(userBadge.userId, userId), eq(userBadge.read, false)),
    });
  }
}
