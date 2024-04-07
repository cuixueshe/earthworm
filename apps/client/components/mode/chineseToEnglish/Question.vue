<template>
  <div class="text-center">
    <div class="mt-10 mb-4 text-2xl dark:text-gray-50">
      {{
        courseStore.currentStatement?.chinese || "生存还是毁灭，这是一个问题"
      }}
    </div>
    <QuestionInput></QuestionInput>
  </div>
</template>

<script setup lang="ts">
import QuestionInput from "~/components/main/QuestionInput/QuestionInput.vue";
import { useCourseStore } from "~/store/course";
const courseStore = useCourseStore();
</script>
