import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { and, desc, eq } from "drizzle-orm";

import { masteredElements as masteredElementsSchema } from "@earthworm/schema";
import { DB, DbType } from "../global/providers/db.provider";

@Injectable()
export class MasteredElementService {
  constructor(@Inject(DB) private db: DbType) {}

  async addMasteredElement(userId: string, element: { english: string }) {
    if (!element.english) {
      throw new BadRequestException("Element english content is required");
    }

    const [entity] = await this.db
      .insert(masteredElementsSchema)
      .values({
        userId,
        element: JSON.stringify(element),
        masteredAt: new Date(),
      })
      .returning();

    entity.element = JSON.parse(entity.element as string);
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
      element: JSON.parse(item.element as string),
    }));
  }

  async removeMasteredElement(userId: string, elementId: string) {
    await this.db
      .delete(masteredElementsSchema)
      .where(
        and(eq(masteredElementsSchema.userId, userId), eq(masteredElementsSchema.id, elementId)),
      );
  }

  //   async isMastered(userId: string, element: { english: string }) {
  //     const result = await this.db
  //       .select()
  //       .from(masteredElementsSchema)
  //       .where(
  //         and(
  //           eq(masteredElementsSchema.userId, userId),
  //           eq(masteredElementsSchema.element, JSON.stringify(element)),
  //         ),
  //       )
  //       .limit(1);

  //     return result.length > 0;
  //   }
}
