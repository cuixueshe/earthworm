import { BadRequestException, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { and, desc, eq } from "drizzle-orm";

import { masteredElements as masteredElementsSchema } from "@earthworm/schema";
import { DB, DbType } from "../global/providers/db.provider";

interface ElementContent {
  english: string;
}

@Injectable()
export class MasteredElementService {
  constructor(@Inject(DB) private db: DbType) {}

  async addMasteredElement(userId: string, content: ElementContent) {
    if (!content.english) {
      throw new BadRequestException("Element english content is required");
    }

    if (await this.isMastered(userId, content)) {
      throw new BadRequestException("这个内容已经掌握了");
    }

    const [entity] = await this.db
      .insert(masteredElementsSchema)
      .values({
        userId,
        content: JSON.stringify(content),
        masteredAt: new Date(),
      })
      .returning();

    entity.content = JSON.parse(entity.content as string);
    return entity;
  }

  async getMasteredElements(userId: string) {
    const result = await this.db
      .select()
      .from(masteredElementsSchema)
      .where(eq(masteredElementsSchema.userId, userId))
      .orderBy(desc(masteredElementsSchema.masteredAt));

    return result.map((item) => ({
      ...item,
      content: JSON.parse(item.content as string),
    }));
  }

  async removeMasteredElement(userId: string, elementId: string) {
    const result = await this.db
      .delete(masteredElementsSchema)
      .where(
        and(eq(masteredElementsSchema.userId, userId), eq(masteredElementsSchema.id, elementId)),
      )
      .returning();

    if (result.length === 0) {
      throw new NotFoundException(
        `Mastered element with id ${elementId} not found for user ${userId}`,
      );
    }

    return result[0];
  }

  async isMastered(userId: string, content: ElementContent) {
    const result = await this.db
      .select()
      .from(masteredElementsSchema)
      .where(
        and(
          eq(masteredElementsSchema.userId, userId),
          eq(masteredElementsSchema.content, JSON.stringify(content)),
        ),
      )
      .limit(1);

    return result.length > 0;
  }
}
