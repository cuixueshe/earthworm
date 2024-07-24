import { ref } from "vue";

import { useUserStore } from "~/store/user";

const totalSeconds = ref(0);
const isTracking = ref(false);
let timer: NodeJS.Timeout | null = null;

export function useLearningTimeTracker() {
  const userStore = useUserStore();
  const userId = userStore.user?.id;

  function getStorageKey() {
    const today = new Date().toISOString().split("T")[0];
    return `learningTime_${userId}_${today}`;
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
    console.log("Uploading learning time:", {
      userId,
      date: new Date().toISOString().split("T")[0],
      seconds: totalSeconds.value,
    });
    // Here we'll implement the actual API call later
  }

  function startTracking() {
    if (isTracking.value) return;
    loadTime();
    if (totalSeconds.value === 0) {
      saveTime(); // 如果是新的一天，立即创建新的存储项
    }
    isTracking.value = true;
    timer = setInterval(() => {
      totalSeconds.value++;
      if (totalSeconds.value % 30 === 0) {
        saveTime();
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
  };
}
