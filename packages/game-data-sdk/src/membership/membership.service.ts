import { eq } from "drizzle-orm";

import { membership as membershipSchema } from "@earthworm/schema";
import { db } from "../db";

export async function checkMembership(userId: string) {
  const membershipEntity = await db.query.membership.findFirst({
    where: eq(membershipSchema.userId, userId),
  });

  const isActive = membershipEntity ? !!membershipEntity.isActive : false;
  return {
    isActive,
    endDate: membershipEntity ? membershipEntity.end_date : null,
  };
}
