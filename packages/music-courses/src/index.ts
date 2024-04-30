import fs from "fs";
import path from "path";

import * as srtparsejs from "srtparsejs";

import { db } from "@earthworm/db";
import { music as musicSchema } from "@earthworm/schema";
import { music_courses } from "./default-musics";

const musicLyrics = fs.readdirSync(path.resolve(__dirname, "../data"));

(async function () {
  for (const [index, lyricName] of musicLyrics.entries()) {
    const [response] = await db
      .insert(musicSchema)
      .values({
        id: index + 1,
        title: music_courses[index].title,
        songUrl: music_courses[index].songUrl,
        lyrics: covertSrtToJson(getMusicLyric(lyricName)),
      })
      .returning({
        id: musicSchema.id,
        title: musicSchema.title,
      });

    console.log(`上传: 序号-${response.id} 音乐-${response.title}`);
  }

  console.log("全部上传完成");
  process.exit(0);
})();

function getMusicLyric(name: string) {
  const lyricPath = path.resolve(__dirname, `../data/${name}`);
  const lyrics = fs.readFileSync(lyricPath, "utf-8");
  return lyrics;
}

function covertSrtToJson(srt: any) {
  let parsedSrt = srtparsejs.parse(srt);
  return parsedSrt.map((item: any) => {
    const textArr = item.text.split("\n");
    return {
      id: Number(item.id),
      english: textArr[0],
      chinese: textArr[1],
      startTime: item.startTime,
      endTime: item.endTime,
    };
  });
}
