<template>
  <dialog
    id="rank-list"
    class="modal"
    :open="rankingStore.rankModal"
  >
    <div
      class="modal-box w-[420px] h-[568px] px-4 pb-12 flex flex-col overflow-hidden"
    >
      <!-- close button -->
      <form method="dialog">
        <button
          class="absolute btn btn-sm btn-circle btn-ghost right-2 top-2"
          @click="rankingStore.hideRankModal"
        >
          ✕
        </button>
      </form>

      <!-- title -->
      <h2 class="mb-4 text-xl font-bold text-center">排行榜</h2>

      <!-- tab -->
      <div
        role="tablist"
        class="tabs tabs-lifted tabs-md"
      >
        <a
          v-for="period in rankingStore.rankingPeriodList"
          role="tab"
          class="tab"
          @click="rankingStore.togglePeriod(period.value)"
          :key="period.value"
          :class="{
            'tab-active text-orange-500':
              period.value === rankingStore.currentPeriod,
          }"
          >{{ period.label }}</a
        >
      </div>

      <Loading v-if="rankingStore.isLoading" />
      <template v-else>
        <!-- list -->
        <div
          v-if="rankingStore.rankingList.length > 0"
          class="flex-1 px-4 py-2 my-1 overflow-y-auto"
        >
          <RankingItem
            v-for="({ username, count }, index) in rankingStore.rankingList"
            :username="username"
            :rank="index + 1"
            :count="count"
          />
        </div>
        <!-- empty -->
        <div
          v-else
          class="flex items-center justify-center flex-1 text-gray-500"
        >
          还没有小伙伴上榜哦，快来霸榜吧！🏆
        </div>
      </template>

      <!-- tip -->
      <RankingTip
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
import Loading from "~/components/Loading.vue";
import { useRanking } from "~/composables/rank/rankingList";
import { registerShortcut } from "~/utils/keyboardShortcuts";
import { cancelShortcut } from "../../utils/keyboardShortcuts";
import RankingItem from "./RankingItem.vue";
import RankingTip from "./RankingTip.vue";

const rankingStore = useRanking();

onMounted(() => {
  registerShortcut("Escape", rankingStore.hideRankModal);
});

onUnmounted(() => {
  cancelShortcut("Escape", rankingStore.hideRankModal);
});
</script>
