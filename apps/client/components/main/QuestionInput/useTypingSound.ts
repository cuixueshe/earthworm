// useTypingSound.ts
import { ref } from "vue";

import errorSoundPath from "~/assets/sounds/error.mp3";
import rightSoundPath from "~/assets/sounds/right.mp3";
import typingSoundPath from "~/assets/sounds/typing.mp3";

// 正确提示音
const rightAudio = new Audio(rightSoundPath);
// 错误提示音
const errorAudio = new Audio(errorSoundPath);

export function usePlayTipSound() {
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
let audioCtxRef: AudioContext | null = null;
let audioBuffer: AudioBuffer | null = null;
export function useTypingSound() {
  const lastPlayTime = ref(0); // 与上一次播放时间间隔

  // 不需要等页面渲染就可以加载了（提前）
  if (!audioCtxRef) {
    loadAudioContext();
  }

  async function loadAudioContext() {
    audioCtxRef = new AudioContext();
    await loadAudioBuffer(typingSoundPath);
  }

  async function loadAudioBuffer(url: string) {
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    // 使用 decodeAudioData 方法处理 arrayBuffer
    const audioContext = audioCtxRef;
    if (!audioContext) return;

    const decodedAudioData = await audioContext.decodeAudioData(arrayBuffer);
    if (decodedAudioData) {
      audioBuffer = decodedAudioData;
    } else {
      throw new Error("Audio decoding failed.");
    }
  }

  function playTypingSound() {
    const now = Date.now();
    if (now - lastPlayTime.value < PLAY_INTERVAL_TIME) return;
    if (!audioCtxRef || !audioBuffer) return;

    const source = audioCtxRef.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(audioCtxRef.destination);
    source.start();
    lastPlayTime.value = now;
    // 当音频播放结束，手动释放资源
    source.onended = () => {
      source.disconnect();
    };
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
