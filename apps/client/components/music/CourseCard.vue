<template>
  <div class="course-card">
    <h3 class="text-base font-bold">
      {{ title }}
    </h3>
    <p class="mt-4 truncate text-sm text-gray-500 dark:text-gray-400">
      仅供学习使用，如有侵权，请联系删除
    </p>
    <p class="mt-4 text-sm text-gray-500 dark:text-gray-400">
      可扩展。例如歌曲封面，歌手名称，发行日期等等
    </p>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
  id: number;
}>();
</script>

<style scoped>
.course-card {
  @apply relative h-[160px] w-full rounded-xl border border-gray-400 p-4 pb-6 transition-all duration-300 dark:text-gray-100;
  @apply cursor-pointer hover:text-purple-500 hover:shadow-lg hover:shadow-gray-300 hover:dark:text-purple-400 dark:hover:shadow-gray-500;
}
</style>
