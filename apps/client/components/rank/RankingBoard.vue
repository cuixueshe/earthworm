<template>
  <UModal v-model="rankingStore.rankModal">
    <UCard
      :ui="{
        base: 'h-[90vh] w-[90vw] max-w-[450px] max-h-[570px]',
        body: {
          base: 'h-full flex flex-col',
        },
      }"
    >
      <div class="absolute right-2 top-2">
        <UButton
          color="gray"
          variant="ghost"
          icon="i-heroicons-x-mark-20-solid"
          @click="rankingStore.hideRankModal"
          tabindex="-1"
          :ui="{ color: { gray: { ghost: 'dark:hover:bg-gray-600' } } }"
        />
      </div>

      <!-- title -->
      <h2 class="mb-4 text-center text-xl font-bold">排行榜</h2>

      <div class="flex-grow">
        <!-- tab -->
        <div
          role="tablist"
          class="tabs tabs-lifted tabs-md"
        >
          <a
            v-for="period in rankingStore.rankingPeriodList"
            role="tab"
            class="tab dark:[--tab-bg:gray-800] dark:[--tab-border-color:gray]"
            @click="rankingStore.togglePeriod(period.value)"
            :key="period.value"
            :class="{
              'tab-active text-orange-500': period.value === rankingStore.currentPeriod,
            }"
            >{{ period.label }}</a
          >
        </div>
        <Loading v-if="rankingStore.isLoading" />
        <template v-else>
          <!-- list -->
          <div
            v-if="rankingStore.rankingList.length > 0"
            class="my-1 flex-1 overflow-y-auto px-4 py-2"
          >
            <RankRankingItem
              v-for="({ username, count }, index) in rankingStore.rankingList"
              :username="username"
              :rank="index + 1"
              :count="count"
            />
          </div>
          <!-- empty -->
          <div
            v-else
            class="flex flex-1 items-center justify-center text-gray-500"
          >
            还没有小伙伴上榜哦，快来霸榜吧！🏆
          </div>
        </template>
      </div>

      <!-- tip -->
      <RankRankingTip
        :isLoading="rankingStore.isLoading"
        :rankingSelf="rankingStore.rankingSelf"
      />
    </UCard>
  </UModal>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from "vue";

import { useRanking } from "~/composables/rank/rankingList";
import { registerShortcut } from "~/utils/keyboardShortcuts";
import { cancelShortcut } from "../../utils/keyboardShortcuts";

const rankingStore = useRanking();

onMounted(() => {
  registerShortcut("Escape", rankingStore.hideRankModal);
});

onUnmounted(() => {
  cancelShortcut("Escape", rankingStore.hideRankModal);
});
</script>
