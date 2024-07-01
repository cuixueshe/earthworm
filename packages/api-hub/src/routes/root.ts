import { FastifyPluginAsync } from "fastify";

const root: FastifyPluginAsync = async (fastify) => {
  fastify.get("/", async function () {
    return { root: "hi this is api-hub" };
  });
};

export default root;
