<template>
  <div class="text-center">
    <div class="mb-4 mt-10 text-2xl dark:text-gray-50">
      {{ courseStore.currentStatement?.chinese || "生存还是毁灭，这是一个问题" }}
    </div>
    <MainQuestionInput />
  </div>
</template>

<script setup lang="ts">
import { watch, ref,  } from "vue"

import { useCourseStore } from "~/store/course"
import { useCurrentStatementEnglishSound } from "~/composables/main/englishSound"

const courseStore = useCourseStore()
const { playSound } = useCurrentStatementEnglishSound()
const text = ref(courseStore.currentStatement?.chinese)
watch(text, () => {
  playSound()
}, {
  immediate: true,
});




</script>
