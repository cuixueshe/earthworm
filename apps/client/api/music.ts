import { type Music } from "~/store/music";
import { http } from "./http";

export async function fetchMusic(musicId: number) {
  return await http.get<Music, Music>(`/musics/${musicId}`);
}

export async function fetchMusics() {
  return await http.get<Music[], Music[]>("/musics");
}
