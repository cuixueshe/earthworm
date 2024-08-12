<template>
  <div
    class="absolute left-1/2 top-36 flex w-3/4 translate-x-[-50%] items-center justify-center text-xl dark:text-gray-50"
  >
    <div class="card bg-base-100 shadow-xl">
      <div class="card-body relative">
        <div class="absolute right-2 top-1 mt-0">
          <UButton
            color="gray"
            variant="ghost"
            icon="i-heroicons-x-mark-20-solid"
            @click="hiddenAnswerTip"
            tabindex="-1"
            :ui="{ color: { gray: { ghost: 'dark:hover:bg-gray-600' } } }"
          />
        </div>

        <div class="text-3xl">{{ courseStore.currentStatement?.english }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAnswerTip } from "~/composables/main/answerTip";
import { useCourseStore } from "~/store/course";

const courseStore = useCourseStore();
const { hiddenAnswerTip } = useAnswerTip();
</script>
