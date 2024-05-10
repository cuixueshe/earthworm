<template>
  <div class="font-customFont">
    <!-- 提醒老用户需要重新去注册 1 周后删除 -->
    <div
      role="alert"
      class="alert alert-warning mt-4 flex flex-col items-center md:flex-row md:items-start"
    >
      <p class="leading-7">
        <span class="i-ph-warning-circle relative top-1 h-5 w-5"></span>
        亲爱的用户，我们升级了系统以支持多课程和邮箱注册。原有版本为 MVP 版本，已经删档。
        请重新注册，体验更多新特性！为此带来不便，我们深表歉意，感谢您的理解
        <a
          class="link link-secondary underline-offset-4"
          @click="signIn()"
        >
          去注册
        </a>
        💗
      </p>
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
