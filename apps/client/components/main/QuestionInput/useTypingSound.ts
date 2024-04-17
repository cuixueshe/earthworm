// useTypingSound.ts
import { ref } from "vue";

import { CherrySounds, DurmSounds, VintageKeyboardSounds } from "~/assets/sounds";
import errorSoundPath from "~/assets/sounds/error.mp3";
import rightSoundPath from "~/assets/sounds/right.mp3";
import typingSoundPath from "~/assets/sounds/typing.mp3";

const drumSounds = Object.entries(DurmSounds)
  .filter(([key, value]) => key !== "durmSpace" && key !== "durmBackspace") // 过滤掉不需要的键
  .map(([key, value]) => value);
const cherrySounds = Object.values(CherrySounds);
const vintageKeyboardSounds = Object.values(VintageKeyboardSounds);

function randomItem(arr: string | string[]) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function usePlayTipSound() {
  // 正确提示音
  const rightAudio = new Audio(rightSoundPath);
  // 错误提示音
  const errorAudio = new Audio(errorSoundPath);

  function playRightSound() {
    rightAudio.play();
  }

  function playErrorSound() {
    errorAudio.play();
  }

  return {
    playRightSound,
    playErrorSound,
  };
}

const PLAY_INTERVAL_TIME = 60;
export function useTypingSound(soundsType: string) {
  const audioCtxRef = ref<AudioContext | null>(null); // 将 AudioContext 初始化为空
  const lastPlayTime = ref(0);

  async function loadAndPlayAudio(url: string) {
    if (!audioCtxRef.value) {
      audioCtxRef.value = new AudioContext(); // 在首次使用时创建 AudioContext
      if (audioCtxRef.value.state === "suspended") {
        await audioCtxRef.value.resume(); // 确保 AudioContext 是激活状态
      }
    }

    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    const decodedAudioData = await audioCtxRef.value.decodeAudioData(arrayBuffer);

    const source = audioCtxRef.value.createBufferSource();
    source.buffer = decodedAudioData;
    source.connect(audioCtxRef.value.destination);
    source.start();

    // 音频播放结束后，手动释放资源
    source.onended = () => {
      source.disconnect();
    };
  }

  function playTypingSound(e: KeyboardEvent) {
    if (soundsType === "off") {
      return;
    }

    const now = Date.now();
    if (now - lastPlayTime.value < PLAY_INTERVAL_TIME) return;

    // 使用函数确保只有在需要时才计算路径
    const soundPath = getSoundPathByType(e, soundsType);

    loadAndPlayAudio(soundPath);
    lastPlayTime.value = now;
  }

  function getSoundPathByType(e: KeyboardEvent, type: string): string {
    switch (type) {
      case "drumSound":
        if (e.code === "Space") {
          // @ts-ignore
          return DrumSounds.drumSpace;
        } else if (e.code === "Backspace") {
          // @ts-ignore
          return DrumSounds.drumBackspace;
        } else {
          return randomItem(drumSounds);
        }
      case "cherrySound":
        return randomItem(cherrySounds);
      case "vintageKeyboardSound":
        return randomItem(vintageKeyboardSounds);
      default:
        return typingSoundPath;
    }
  }

  function checkPlayTypingSound(e: KeyboardEvent) {
    if (e.altKey || e.ctrlKey || e.metaKey) return false;

    if (/^[a-zA-Z0-9]$/.test(e.key) || ["Backspace", " ", "'"].includes(e.key)) {
      return true;
    }
  }

  return {
    playTypingSound,
    checkPlayTypingSound,
  };
}
