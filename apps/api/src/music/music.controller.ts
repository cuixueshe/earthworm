import { Body, Controller, Post, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";

import { AuthGuard } from "../guards/auth.guard";
import { CreateMusicDto } from "./dto/create-music.dto";
import { MusicService } from "./music.service";

@Controller("music")
export class MusicController {
  constructor(private readonly musicService: MusicService) {}

  // @UseGuards(AuthGuard)
  @Post("/create")
  @UseInterceptors(FileInterceptor("srt"))
  async createMusic(@UploadedFile() srtFile: Express.Multer.File, @Body() dto: CreateMusicDto) {
    const res = this.musicService.create(srtFile, dto);

    return {
      data: "ok",
      message: "ok",
    };
  }
}
