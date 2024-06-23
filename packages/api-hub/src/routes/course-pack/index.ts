import { FastifyInstance } from "fastify";

import {
  createCoursePackHandler,
  deleteCoursePackHandler,
  updateCoursePackHandler,
} from "./handler";
import { coursePackSchema, deleteCoursePackSchema, updateCoursePackParamsSchema } from "./schema";

export default async (fastify: FastifyInstance) => {
  fastify.post("/", { schema: { body: coursePackSchema } }, createCoursePackHandler);
  fastify.delete("/:id", { schema: { params: deleteCoursePackSchema } }, deleteCoursePackHandler);
  fastify.put(
    "/:id",
    { schema: { body: coursePackSchema, params: updateCoursePackParamsSchema } },
    updateCoursePackHandler,
  );
};
