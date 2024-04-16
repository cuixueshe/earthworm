import { Module } from "@nestjs/common";

import { CourseModule } from "../course/course.module";
import { GlobalModule } from "../global/global.module";
import { UserProgressModule } from "../user-progress/user-progress.module";
import { GameController } from "./game.controller";
import { GameService } from "./game.service";

@Module({
  imports: [GlobalModule, CourseModule, UserProgressModule],
  providers: [GameService],
  controllers: [GameController],
})
export class GameModule {}
