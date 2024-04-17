<template>
  <div class="text-center">
    <div class="mb-4 mt-10 text-2xl dark:text-gray-50">
      {{ courseStore.currentStatement?.chinese || "生存还是毁灭，这是一个问题" }}
    </div>
    <MainQuestionInput />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";

import { useCurrentStatementEnglishSound } from "~/composables/main/englishSound";
import { useAutoPlayEnglish } from "~/composables/user/sound";
import { useCourseStore } from "~/store/course";

const { isAutoPlayEnglish } = useAutoPlayEnglish();
const courseStore = useCourseStore();
const { playSound } = useCurrentStatementEnglishSound();
const text = ref(courseStore.currentStatement?.chinese);
watch(
  text,
  () => {
    isAutoPlayEnglish() && playSound();
  },
  {
    immediate: true,
  },
);
</script>
