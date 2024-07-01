import { FromSchema } from "json-schema-to-ts";

export const checkMembershipParamsSchema = {
  type: "object",
  properties: {
    userId: { type: "string" },
  },
  required: ["userId"],
} as const;

export type CheckMembershipParamsSchema = FromSchema<typeof checkMembershipParamsSchema>;
