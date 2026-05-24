<template>
  <div
    class="flex h-12 w-full flex-col items-center justify-center border-t border-gray-200 dark:border-gray-600"
  >
    <div class="flex items-center text-sm">
      <span class="font-bold">Xếp hạng của tôi：</span>
      <template v-if="isLoading">
        <span>Dữ liệu đang trên đường đến……</span>
      </template>
      <template v-else-if="!isAuthenticated()">
        <span>Đăng nhập để cùng thi đấu nhé！😊 </span>
      </template>
      <template v-else-if="rankingSelf && rankingSelf.rank !== -1">
        <RankRankingBadge
          :rank="rankingSelf.rank"
          class="min-w-6"
        />
        <span class="mx-2">/</span>
        <span>{{ rankingSelf.count }} bài</span>
      </template>
      <template v-else>
        <span>Hãy hoàn thành một bài rồi quay lại xem nhé！👀</span>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { isAuthenticated } from "~/services/auth";
import { type RankingSelf } from "~/types";

const { rankingSelf, isLoading } = defineProps<{
  rankingSelf: RankingSelf | null;
  isLoading: boolean;
}>();
</script>
