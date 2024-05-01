<template>
  <div class="container m-auto w-full font-customFont">
    <!-- 提醒老用户需要重新去注册 1 周后删除 -->
    <div
      role="alert"
      class="alert alert-warning mt-4"
    >
      <span class="i-ph-warning-circle h-6 w-6"></span>
      <p>
        亲爱的用户，我们升级了系统以支持多课程和邮箱注册。原有版本为 MVP
        版本，已经删档。请重新注册，体验新特性。为此带来不便，我们深表歉意，感谢您的理解 💗
      </p>
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
