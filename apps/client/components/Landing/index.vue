<template>
  <div class="container m-auto w-full font-customFont">
    <!-- 提醒老用户需要重新去注册 
    1周后删除 -->
    <div
      role="alert"
      class="alert alert-warning"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6 shrink-0 stroke-current"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
        />
      </svg>
      <span
        >老用户需要重新注册!!! 全新版本已经到来 因为之前是 MVP 版本 所有数据已经删档
        现在支持邮箱注册了哦 更保护您的隐私 感谢支持💗</span
      >
      <button
        className="btn btn-sm text-purple-400"
        @click="signIn()"
      >
        去注册
      </button>
    </div>
    <LandingBanner @start-earthworm="startEarthworm" />
    <LandingFeatures />
    <LandingComments />
    <LandingQuestions />
    <LandingContact />
    <CommonBackTop class="sticky bottom-28 ml-auto flex justify-end sm:block" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";

import { isAuthenticated, signIn } from "~/services/auth";
import { cancelShortcut, registerShortcut } from "~/utils/keyboardShortcuts";

const { startEarthworm } = useShortcutToGame();

function useShortcutToGame() {
  const router = useRouter();

  async function startEarthworm() {
    if (!isAuthenticated()) {
      router.push(`/course-pack`);
    }
  }

  onMounted(() => {
    registerShortcut("enter", startEarthworm);
  });

  onUnmounted(() => {
    cancelShortcut("enter", startEarthworm);
  });

  return {
    startEarthworm,
  };
}
</script>
