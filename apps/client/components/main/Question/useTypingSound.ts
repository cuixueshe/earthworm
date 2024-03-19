// useTypingSound.ts
import { onMounted, ref } from "vue";

export function useTypingSound(typingSoundPath: string) {
  const audioCtxRef = ref<AudioContext | null>(null);
  let audioBuffer: AudioBuffer | null = null;
  let lastPlayTime = ref(0); // 使用ref存储上一次播放时间

  const loadAudioContext = async () => {
    audioCtxRef.value = new AudioContext();
    await loadAudioBuffer(typingSoundPath);
  };

  const loadAudioBuffer = async (url: string) => {
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
  };

  onMounted(() => {
    loadAudioContext();
  });

  const playAudio = () => {
    const now = Date.now();
    if (now - lastPlayTime.value < 100) return;
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
  };

  return {
    playAudio,
  };
}
