import { http } from "./http";

interface StartGame {
  cId: number;
}
export async function fetchStartGame() {
  return await http.post<StartGame, StartGame>(`/game/start`);
}
