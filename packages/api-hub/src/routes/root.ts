import { FastifyPluginAsync } from "fastify";

const root: FastifyPluginAsync = async (fastify) => {
  fastify.get("/", async function () {
    return { root: true };
  });
};

export default root;
