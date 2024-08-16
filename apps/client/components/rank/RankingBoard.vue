<template>
  <UModal v-model="rankingStore.rankModal">
    <UContainer
      :ui="{
        base: 'flex flex-col py-5 w-[90vw] h-[80vh] max-h-[600px]',
        constrained: 'max-w-[500px]',
      }"
    >
      <CommonModalHeader
        title="排行榜"
        @close="rankingStore.hideRankModal"
      />

      <div class="flex flex-grow flex-col overflow-y-auto overflow-x-hidden">
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
            class="my-1 h-full flex-1 overflow-y-auto px-4 py-2"
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
    </UContainer>
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
