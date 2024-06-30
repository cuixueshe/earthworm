import { RouteHandler } from "fastify";

import type {
  CreateCoursePack,
  DeleteCoursePack,
  UpdateCoursePackBody,
  UpdateCoursePackParams,
} from "./schema";
import { logger } from "~/utils/logger";
import { createCoursePack, deleteCoursePack, updateCoursePack } from "./service";

export const createCoursePackHandler: RouteHandler<{
  Body: CreateCoursePack;
}> = async function (req, reply) {
  try {
    const result = await createCoursePack(req.body);
    reply.code(201).send({
      state: 1,
      data: {
        result,
      },
    });
  } catch (error) {
    logger.error(error);
    reply.code(500).send({
      state: 0,
      message: "Internal Server Error",
    });
  }
};

export const deleteCoursePackHandler: RouteHandler<{
  Params: DeleteCoursePack;
}> = async function (req, reply) {
  const coursePackId = req.params.id;

  try {
    const result = await deleteCoursePack(coursePackId);
    reply.code(200).send({
      state: 1,
      data: result,
    });
  } catch (error) {
    logger.error(error);
    reply.code(500).send({
      state: 0,
      message: "Internal Server Error",
    });
  }
};

export const updateCoursePackHandler: RouteHandler<{
  Body: UpdateCoursePackBody;
  Params: UpdateCoursePackParams;
}> = async function (req, reply) {
  const coursePackId = req.params.id;
  try {
    const result = await updateCoursePack(coursePackId, req.body);
    reply.code(200).send({
      state: 1,
      data: result,
    });
  } catch (error) {
    logger.error(error);
    reply.code(500).send({
      state: 0,
      message: "Internal Server Error",
    });
  }
};
