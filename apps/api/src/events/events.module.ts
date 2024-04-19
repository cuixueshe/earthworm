import { Module } from "@nestjs/common";

import { OnlineModule } from "../online/online.module";
import { EventGateway } from "./events.gateway";

@Module({
  imports: [OnlineModule],
  providers: [EventGateway],
  exports: [EventGateway],
})
export class EventsModule {}
