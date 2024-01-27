// 便于测试
// 后面不使用 audio 后也可以不破坏业务逻辑
const audio = new Audio();
export function updateSource(src: string) {
  audio.src = src;
  audio.load();
}

export function play() {
  audio.play()
}

