<template>
  <div
    class="h-[40px] flex items-center justify-between text-sm border-b border-gray-200 dark:border-gray-600"
  >
    <RankRankingBadge
      class="w-16"
      :rank="rank"
    />
    <div class="flex-1 text-center truncate">{{ username }}</div>
    <div class="w-16 text-right">{{ count }} 课</div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  rank: Number,
  username: String,
  count: Number,
});
</script>
