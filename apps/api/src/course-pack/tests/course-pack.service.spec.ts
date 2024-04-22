import { Test, TestingModule } from "@nestjs/testing";

import { CoursePackService } from "./course-pack.service";

describe("CoursePackService", () => {
  let service: CoursePackService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CoursePackService],
    }).compile();

    service = module.get<CoursePackService>(CoursePackService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
