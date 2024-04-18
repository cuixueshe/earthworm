<template>
  <dialog
    id="rank-list"
    class="modal"
    :open="rankingStore.rankModal"
  >
    <div class="modal-box flex h-[568px] w-[420px] flex-col overflow-hidden px-4 pb-12">
      <!-- close button -->
      <form method="dialog">
        <button
          class="btn btn-circle btn-ghost btn-sm absolute right-2 top-2"
          @click="rankingStore.hideRankModal"
        >
          ✕
        </button>
      </form>

      <!-- title -->
      <h2 class="mb-4 text-center text-xl font-bold">排行榜</h2>

      <!-- tab -->
      <div
        role="tablist"
        class="tabs tabs-lifted tabs-md"
      >
        <a
          v-for="period in rankingStore.rankingPeriodList"
          role="tab"
          class="tab dark:[--tab-border-color:gray]"
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

      <!-- tip -->
      <RankRankingTip
        :isLoading="rankingStore.isLoading"
        :rankingSelf="rankingStore.rankingSelf"
      />
    </div>

    <!-- click outside to close -->
    <form
      method="dialog"
      class="modal-backdrop"
    >
      <button @click="rankingStore.hideRankModal"></button>
    </form>
  </dialog>
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
