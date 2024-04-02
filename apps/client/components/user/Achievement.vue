<template>
  <div class="flex flex-wrap gap-5">
    <AchievementCard
      v-for="a in 10"
      :key="a"
    />
  </div>
</template>

<script setup lang="ts">
import AchievementCard from "~/components/user/AchievementCard.vue";
</script>
