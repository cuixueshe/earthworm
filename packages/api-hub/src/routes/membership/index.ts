import { FastifyInstance } from "fastify";

import { checkMembershipHandler } from "./handler";
import { checkMembershipParamsSchema } from "./schema";

export default async (fastify: FastifyInstance) => {
  fastify.get(
    "/:userId",
    { schema: { params: checkMembershipParamsSchema } },
    checkMembershipHandler,
  );
};
