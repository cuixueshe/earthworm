import { Module } from "@nestjs/common";

import { MasteredElementController } from "./mastered-element.controller";
import { MasteredElementService } from "./mastered-element.service";

@Module({
  providers: [MasteredElementService],
  controllers: [MasteredElementController],
})
export class MasteredElementModule {}
