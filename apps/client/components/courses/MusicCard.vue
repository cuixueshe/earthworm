<template>
  <div class="course-card">
    <h3 class="text-base font-bold">
      {{ title }}
    </h3>
    <p class="mt-4 text-sm truncate text-gray-500 dark:text-gray-400">
      仅供学习使用，如有侵权，请联系删除
    </p>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  title: string;
  id: number;
  count: number | undefined;
}>();
</script>

<style scoped>
.course-card {
  @apply w-full h-[160px] p-4 pb-6 border border-gray-400 rounded-xl transition-all duration-300 relative dark:text-gray-100;
  @apply hover:shadow-lg hover:text-purple-500 hover:dark:text-purple-400 hover:shadow-gray-300 dark:hover:shadow-gray-500 cursor-pointer;
}
</style>
