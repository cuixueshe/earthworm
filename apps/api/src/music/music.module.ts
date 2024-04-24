import { Module } from "@nestjs/common";

import { GlobalModule } from "../global/global.module";
import { MusicController } from "./music.controller";
import { MusicService } from "./music.service";

@Module({
  imports: [GlobalModule],
  controllers: [MusicController],
  providers: [MusicService],
})
export class MusicModule {}
