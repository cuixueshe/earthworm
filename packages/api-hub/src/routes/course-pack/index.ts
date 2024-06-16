import { asc } from "drizzle-orm";
import { FastifyPluginAsync } from "fastify";

import { coursePack as coursePackSchema } from "@earthworm/schema";
import { db } from "~/db";

const coursePack: FastifyPluginAsync = async (fastify) => {
  fastify.get("/", async function () {
    console.log(db);
    const coursePacks = await db.query.coursePack.findMany({
      orderBy: asc(coursePackSchema.order),
    });

    return coursePacks;
  });
};

export default coursePack;
