<template>
  <div
    class="absolute bottom-0 left-0 flex flex-col items-center justify-center w-full h-12 border-t border-gray-200 dark:border-gray-600"
  >
    <div class="flex items-center text-sm">
      <span class="font-bold">我的排名：</span>
      <template v-if="isLoading">
        <span>数据正在向你飞奔而来……</span>
      </template>
      <template v-else-if="!user">
        <span>登录后和小伙伴们一决高下！😊 </span>
      </template>
      <template v-else-if="rankingSelf && rankingSelf.rank !== -1">
        <RankRankingBadge
          :rank="rankingSelf.rank"
          class="min-w-6"
        />
        <span class="mx-2">/</span>
        <span>{{ rankingSelf.count }} 课</span>
      </template>
      <template v-else>
        <span>先去刷一课再来看看！👀</span>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { type RankingSelfType } from "~/api/rank";
import { useUserStore } from "~/store/user";

const { user } = useUserStore();
const { rankingSelf, isLoading } = defineProps<{
  rankingSelf: RankingSelfType | null;
  isLoading: boolean;
}>();
</script>
