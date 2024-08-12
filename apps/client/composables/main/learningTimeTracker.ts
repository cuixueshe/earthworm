import { ref } from "vue";

import { updateDailyLearningDailyTotalTime } from "~/api/user-learning-activity";
import { useUserStore } from "~/store/user";

const totalSeconds = ref(0);
const lastTotalSeconds = ref(0);
const isTracking = ref(false);
let timer: NodeJS.Timeout | null = null;

export function useLearningTimeTracker() {
  const userStore = useUserStore();
  const userId = userStore.user?.id || "";

  function getStorageKey() {
    const today = new Date().toISOString().split("T")[0];
    return `learningTime_${userId}_${today}`;
  }

  function setupLearningTime(duration: number) {
    localStorage.setItem(getStorageKey(), duration.toString());
  }

  function loadTime() {
    const savedTime = localStorage.getItem(getStorageKey());
    totalSeconds.value = savedTime ? parseInt(savedTime) : 0;
  }

  function saveTime() {
    localStorage.setItem(getStorageKey(), totalSeconds.value.toString());
    uploadTime();
  }

  function uploadTime() {
    const duration = totalSeconds.value - lastTotalSeconds.value;
    if (duration < 0) return;

    updateDailyLearningDailyTotalTime({
      date: new Date().toISOString().split("T")[0],
      duration, // 传给后端的应该是时间差 后端会累加这个时间
    });
  }

  function startTracking() {
    if (isTracking.value) return;
    loadTime();
    if (totalSeconds.value === 0) {
      saveTime(); // 如果是新的一天，立即创建新的存储项
    }
    isTracking.value = true;
    lastTotalSeconds.value = totalSeconds.value;
    timer = setInterval(() => {
      totalSeconds.value++;
      if (totalSeconds.value % 30 === 0) {
        saveTime();
        lastTotalSeconds.value = totalSeconds.value;
      }
    }, 1000);
  }

  function stopTracking() {
    if (!isTracking.value) return;
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
    isTracking.value = false;
    saveTime();
  }

  return {
    totalSeconds,
    isTracking,
    startTracking,
    stopTracking,
    setupLearningTime,
  };
}
