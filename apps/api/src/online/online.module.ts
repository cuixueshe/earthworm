import { Module } from "@nestjs/common";

import { OnlineService } from "./online.service";

@Module({
  providers: [OnlineService],
  exports: [OnlineService],
})
export class OnlineModule {}
