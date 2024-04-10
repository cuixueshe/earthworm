import Plyr from "plyr";

let player: Plyr;

export function useMusicAudio() {
  function setupAudio(playerElement: HTMLAudioElement, src: string) {
    player = new Plyr(playerElement);
    player.source = {
      type: "audio",
      title: "",
      sources: [{ src, type: "audio/mp3" }],
    };

    player.on("timeupdate", () => {
      console.log(1111111);
    });
  }

  function play() {
    player.play();
  }

  return {
    setupAudio,
    play,
  };
}
