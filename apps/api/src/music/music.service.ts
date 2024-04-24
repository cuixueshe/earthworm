import { Inject, Injectable } from "@nestjs/common";
import * as srtparsejs from "srtparsejs";

import { music } from "@earthworm/schema";
import { DB, DbType } from "../global/providers/db.provider";
import { CreateMusicDto } from "./dto/create-music.dto";

@Injectable()
export class MusicService {
  constructor(@Inject(DB) private db: DbType) {}

  async create(srt: Express.Multer.File, dto: CreateMusicDto) {
    if (!srt) return;
    const { songUrl, title } = dto;
    const lyrics = this.covertSrtToJson(srt);
    await this.db.insert(music).values({ title, songUrl, lyrics });

    return lyrics;
  }

  private covertSrtToJson(srt: Express.Multer.File) {
    const srtFileContent = srt.buffer.toString("utf8");
    let parsedSrt = srtparsejs.parse(srtFileContent);
    return parsedSrt.map((item) => {
      return {
        id: Number(item.id),
        english: item.text.split("\n")[0],
        chinese: item.text.split("\n")[1],
        startTime: this.srtTimeToSeconds(item.startTime),
        endTime: this.srtTimeToSeconds(item.endTime),
      };
    });
  }

  private srtTimeToSeconds(srtTime: string) {
    const timeParts = srtTime.split(":");
    const hours = parseInt(timeParts[0], 10);
    const minutes = parseInt(timeParts[1], 10);
    const secondsAndMilliseconds = timeParts[2].split(",");
    const seconds = parseInt(secondsAndMilliseconds[0], 10);
    const milliseconds = parseInt(secondsAndMilliseconds[1], 10);
    return hours * 3600 + minutes * 60 + seconds + milliseconds / 1000;
  }
}
