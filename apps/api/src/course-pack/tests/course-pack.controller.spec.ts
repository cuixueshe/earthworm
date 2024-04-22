import { Test, TestingModule } from "@nestjs/testing";

import { CoursePackController } from "../course-pack.controller";

describe("CoursePackController", () => {
  let controller: CoursePackController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CoursePackController],
    }).compile();

    controller = module.get<CoursePackController>(CoursePackController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
