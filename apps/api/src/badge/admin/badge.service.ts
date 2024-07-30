import { Inject, Injectable } from "@nestjs/common";
import { and, eq, inArray, like } from "drizzle-orm";
import { DB, DbType } from "src/global/providers/db.provider";

import { badge, userBadge } from "@earthworm/schema";
import { CreateBadgeDto, UpdateBadgeDto } from "./dto/create-badge.dto";
import { SearchBadgeDto } from "./dto/find-badge-condition.dto";

@Injectable()
export class BadgeService {
  constructor(
    @Inject(DB)
    private db: DbType,
  ) {}

  findAll() {
    return this.db.query.badge.findMany();
  }

  findAllByCondition(condition: SearchBadgeDto) {
    return this.db.query.badge.findMany({
      where: and(
        eq(badge.enable, condition.enable),
        eq(badge.wearable, condition.wearable),
        eq(badge.code, condition.code),
        like(badge.name, `%${condition.name}%`),
      ),
    });
  }

  enable(badgeId: string) {
    return this.db.update(badge).set({ enable: true }).where(eq(badge.id, badgeId)).returning();
  }

  disable(badgeId: string) {
    return this.db.update(badge).set({ enable: false }).where(eq(badge.id, badgeId)).returning();
  }

  batchEnable(badgeIds: string[]) {
    return this.db
      .update(badge)
      .set({ enable: true })
      .where(inArray(badge.id, badgeIds))
      .returning();
  }

  batchDisable(badgeIds: string[]) {
    return this.db
      .update(badge)
      .set({ enable: false })
      .where(inArray(badge.id, badgeIds))
      .returning();
  }

  add(dto: CreateBadgeDto) {
    return this.db.insert(badge).values(dto).returning();
  }

  delete(badgeIds: string[]) {
    return this.db.delete(badge).where(inArray(badge.id, badgeIds));
  }

  update(dto: UpdateBadgeDto) {
    return this.db.update(badge).set(dto).where(eq(badge.id, dto.id)).returning();
  }

  async grant(userId: string, badgeId: string) {
    return await this.db.insert(userBadge).values({
      userId,
      badgeId,
      grantType: "manual",
      read: false,
    });
  }
}
