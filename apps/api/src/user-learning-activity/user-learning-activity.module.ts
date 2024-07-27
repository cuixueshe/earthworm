import { Module } from "@nestjs/common";

import { UserLearningActivityController } from "./user-learning-activity.controller";
import { UserLearningActivityService } from "./user-learning-activity.service";

@Module({
  controllers: [UserLearningActivityController],
  providers: [UserLearningActivityService],
  exports: [UserLearningActivityService],
})
export class UserLearningActivityModule {}
