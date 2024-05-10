<template>
  <div class="text-center">
    <div class="mb-4 mt-10 text-2xl dark:text-gray-50">
      {{ courseStore.currentStatement?.chinese || "生存还是毁灭，这是一个问题" }}
    </div>
    <MainQuestionInputWords v-if="isShowWordNumber()" />
    <MainQuestionInputSentence v-else />
  </div>
</template>

<script setup lang="ts">
import { onMounted, watch } from "vue";

import { useCurrentStatementEnglishSound } from "~/composables/main/englishSound";
import { useAutoPlayEnglish } from "~/composables/user/sound";
import { useShowWordNumber } from "~/composables/user/wordNumber";
import { useCourseStore } from "~/store/course";

const courseStore = useCourseStore();
const { playSound } = useCurrentStatementEnglishSound();
const { isAutoPlayEnglish } = useAutoPlayEnglish();
const { isShowWordNumber } = useShowWordNumber();

onMounted(() => {
  handleAutoPlayEnglish();
});

watch(
  () => courseStore.currentStatement,
  () => {
    handleAutoPlayEnglish();
  },
);

function handleAutoPlayEnglish() {
  if (isAutoPlayEnglish()) {
    playSound();
  }
}
</script>
