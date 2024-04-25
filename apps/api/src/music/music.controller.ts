import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";

import { AuthGuard } from "../guards/auth.guard";
import { CreateMusicDto } from "./dto/create-music.dto";
import { MusicService } from "./music.service";

@Controller("musics")
export class MusicController {
  constructor(private readonly musicService: MusicService) {}

  // @UseGuards(AuthGuard)
  @Post("/create")
  @UseInterceptors(FileInterceptor("srt"))
  async createMusic(@UploadedFile() srtFile: Express.Multer.File, @Body() dto: CreateMusicDto) {
    await this.musicService.create(srtFile, dto);
  }

  @UseGuards(AuthGuard)
  @Get("")
  findAll() {
    return this.musicService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(":musicId")
  findOne(@Param("musicId") musicId: number) {
    return this.musicService.find(musicId);
  }
}
