// 便于测试
// 后面不使用 audio 后也可以不破坏业务逻辑

const audio = new Audio();
export function updateSource(src: string) {
  audio.src = src;
  audio.load();
}

export function play(times?: number, rate?: number) {
  if (times && times >= 1) {
    let index = 1;
    audio.addEventListener(
      "ended",
      () => {
        setTimeout(() => {
          if (index < times) {
            audio.play();
            index++;
          }
        }, 500);
      },
      false
    );
  }
  audio.playbackRate = rate || 1;
  audio.play();
}

export function pause() {
  audio.pause();
}
