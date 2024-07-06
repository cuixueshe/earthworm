import { FastifyReply, FastifyRequest } from "fastify";

import { logger } from "../../services/logger";
import { checkMembership } from "./service";

export async function checkMembershipHandler(
  request: FastifyRequest<{ Params: { userId: string } }>,
  reply: FastifyReply,
) {
  const { userId } = request.params;
  try {
    const membershipStatus = await checkMembership(userId);
    reply.send(membershipStatus);
  } catch (error) {
    logger.error(error);
    reply.status(500).send({ error: "Internal Server Error" });
  }
}
