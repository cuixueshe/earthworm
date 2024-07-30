/**
 * 记录用户当前课程包的课程学习了多少次
 */
import { Inject, Injectable } from "@nestjs/common";
import { and, eq } from "drizzle-orm";

import { badge } from "@earthworm/schema";
import { DB, DbType } from "../global/providers/db.provider";
import { BadgeType } from "./interface";

@Injectable()
export class BadgeService {
  constructor(@Inject(DB) private db: DbType) {}

  async findEnable() {
    return await this.db.query.badge.findMany({
      where: eq(badge.enable, true),
    });
  }
  async findEnableByType(type: BadgeType) {
    return await this.db.query.badge.findMany({
      where: and(eq(badge.enable, true), eq(badge.type, type)),
    });
  }
}
