import { RouteHandler } from "fastify";

import type {
  CreateCoursePack,
  DeleteCoursePack,
  UpdateCoursePackBody,
  UpdateCoursePackParams,
} from "./schema";
import { createCoursePack, deleteCoursePack, updateCoursePack } from "./service";

export const createCoursePackHandler: RouteHandler<{
  Body: CreateCoursePack;
}> = async function (req, reply) {
  const result = await createCoursePack(req.body);
  reply.code(201).send({
    state: 1, // 1 代表的是成功发布
    data: {
      ...result,
    },
  });
};

export const deleteCoursePackHandler: RouteHandler<{
  Params: DeleteCoursePack;
}> = async function (req, reply) {
  const coursePackId = req.params.id;
  const result = await deleteCoursePack(coursePackId);
  reply.code(200).send({
    state: result,
  });
};

export const updateCoursePackHandler: RouteHandler<{
  Body: UpdateCoursePackBody;
  Params: UpdateCoursePackParams;
}> = async function (req, reply) {
  const coursePackId = req.params.id;
  const result = await updateCoursePack(coursePackId, req.body);
  reply.code(200).send(result);
};
