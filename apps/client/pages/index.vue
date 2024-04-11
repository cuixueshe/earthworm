<template>
  <div class="container w-full m-auto font-customFont">
    <Loading v-show="isLoading" />
    <div v-show="!isLoading">
      <HomeBanner @start-earthworm="startEarthworm" />
      <HomeFeatures />
      <HomeComments />
      <HomeQuestions />
      <HomeContact />
      <CommonBackTop
        class="sticky flex justify-end ml-auto sm:block bottom-28"
      />
    </div>
    <MainMessageBox
      v-model:is-show-modal="showMobileTip"
      title="友情提示"
      content="正在努力适配移动端中！使用电脑访问体验更佳哦~ 😊"
      cancel-btn-text="好哒"
      confirm-btn-text=""
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useGameStore } from "~/store/game";
import { cancelShortcut, registerShortcut } from "~/utils/keyboardShortcuts";

const gameStore = useGameStore();
const { showMobileTip } = useMonitorSystem();
const { startEarthworm, isLoading } = useShortcutToGame();

function useMonitorSystem() {
  const showMobileTip = ref(false);

  function mobileSystem() {
    return "ontouchstart" in document.documentElement;
  }

  onMounted(() => {
    showMobileTip.value = mobileSystem();
  });

  return {
    showMobileTip,
  };
}

function useShortcutToGame() {
  const router = useRouter();
  const isLoading = ref(false);

  async function startEarthworm() {
    isLoading.value = true;
    const { courseId } = await gameStore.startGame();
    isLoading.value = false;
    router.push(`/main/${courseId}`);
  }

  onMounted(() => {
    registerShortcut("enter", startEarthworm);
  });

  onUnmounted(() => {
    cancelShortcut("enter", startEarthworm);
  });

  return {
    startEarthworm,
    isLoading,
  };
}
</script>
