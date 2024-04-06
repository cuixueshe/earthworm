<template>
  <div class="container w-full font-customFont">
    <template v-if="isLoading">
      <Loading></Loading>
    </template>
    <template v-else>
      <NoticeBar v-if="showNoticeBar" />
      <Banner @startEarthworm="startEarthworm"/>
      <Features />
      <!-- <Introduce /> -->
      <Comments />
      <!-- <PayCard /> -->
      <Questions />
      <Contact />
    </template>
    <CommonBackTop class="sticky flex justify-end ml-auto sm:block bottom-28" />
    <MessageBox
      v-model:is-show-modal="showMobileTip"
      title="友情提示"
      content="目前暂不支持移动设备哦，请关注后续更新~"
      cancel-btn-text="好哒"
      confirm-btn-text=""
    ></MessageBox>
  </div>
</template>

<script setup>
import Comments from "~/components/home/Comments.vue";
import Contact from "~/components/home/Contact.vue";
import Features from "~/components/home/Features.vue";
import NoticeBar from "~/components/home/NoticeBar.vue";
import Questions from "~/components/home/Questions.vue";
import Banner from '~/components/home/Banner';
const showNoticeBar = ref(false);

import { onMounted, onUnmounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useGameStore } from "~/store/game";
import { cancelShortcut, registerShortcut } from "~/utils/keyboardShortcuts";

const { startEarthworm, isLoading } = useShortcutToGame();
const gameStore = useGameStore();

const { showMobileTip } = useMonitorSystem();

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
