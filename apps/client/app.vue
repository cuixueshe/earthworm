<template>
  <HttpErrorProvider>
    <div
      class="h-screen w-screen"
      v-if="isSetupLoading"
    >
      <Loading />
    </div>
    <template v-else>
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </template>
  </HttpErrorProvider>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";

import { fetchCurrentUser } from "~/api/user";
import { fetchTodayLearningTime } from "~/api/userLearningActivity";
import { useDarkMode } from "~/composables/darkMode";
import { isAuthenticated } from "~/services/auth";
import { useLearningTimeTracker } from "./composables/main/learningTimeTracker";
import { useUserStore } from "./store/user";

const { initDarkMode } = useDarkMode();

const isSetupLoading = ref(false);
async function setup() {
  isSetupLoading.value = true;
  const userStore = useUserStore();

  if (isAuthenticated()) {
    const user = await fetchCurrentUser();
    userStore.initUser(user);
    // 同步今日的学习总时长
    const { setupLearningTime } = useLearningTimeTracker();
    setupLearningTime(await fetchTodayLearningTime());
  }
  isSetupLoading.value = false;
}

setup();

onMounted(() => {
  initDarkMode();
});
</script>

<style>
#jfToolbar,
.mod-json {
  display: none !important;
}
</style>
