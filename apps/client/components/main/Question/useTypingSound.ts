// useTypingSound.ts
import { ref } from "vue";
import errorSoundPath from "~/assets/sounds/error.mp3";
import rightSoundPath from "~/assets/sounds/right.mp3";
import typingSoundPath from "~/assets/sounds/typing.mp3";

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

export function useTypingSound() {
  const PLAY_INTERVAL_TIME = 60;
  const audioCtxRef = ref<AudioContext | null>(null);
  const lastPlayTime = ref(0); // 与上一次播放时间间隔
  let audioBuffer: AudioBuffer | null = null;

  // 不需要等页面渲染就可以加载了（提前）
  loadAudioContext();

  async function loadAudioContext() {
    audioCtxRef.value = new AudioContext();
    await loadAudioBuffer(typingSoundPath);
  }

  async function loadAudioBuffer(url: string) {
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    // 使用 decodeAudioData 方法处理 arrayBuffer
    const audioContext = audioCtxRef.value;
    if (!audioContext) return;

    const decodedAudioData = await audioContext.decodeAudioData(arrayBuffer);
    if (decodedAudioData) {
      audioBuffer = decodedAudioData;
    } else {
      throw new Error("Audio decoding failed.");
    }
  }

  function playAudio() {
    const now = Date.now();
    if (now - lastPlayTime.value < PLAY_INTERVAL_TIME) return;
    if (!audioCtxRef.value || !audioBuffer) return;

    const source = audioCtxRef.value.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(audioCtxRef.value.destination);
    source.start();
    lastPlayTime.value = now;
    // 当音频播放结束，手动释放资源
    source.onended = () => {
      source.disconnect();
    };
  }

  return {
    playAudio,
  };
}
