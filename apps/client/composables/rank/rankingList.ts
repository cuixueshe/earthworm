import { defineStore } from "pinia";
import { ref, watch } from "vue";
import {
  fetchProgressRank,
  type ProgressRankVo,
  type RankingItemType,
  type RankingSelfType,
} from "~/api/rank";
import Message from "~/components/main/Message/useMessage";

function cacheRanking() {
  let rankingCache: Record<string, ProgressRankVo> = {};

  function cleanRankingCache() {
    rankingCache = {};
  }

  function saveRankingCache(key: string, value: ProgressRankVo) {
    rankingCache[key] = value;
  }

  function getRankingCache(key: string) {
    return rankingCache[key];
  }

  function hasRankingCache(key: string) {
    return !!rankingCache[key];
  }

  return {
    saveRankingCache,
    getRankingCache,
    hasRankingCache,
    cleanRankingCache,
  };
}

export const useRanking = defineStore("ranking", () => {
  const {
    saveRankingCache,
    getRankingCache,
    hasRankingCache,
    cleanRankingCache,
  } = cacheRanking();

  const isLoading = ref(false);
  const currentPeriod = ref<string>("weekly");
  const rankingList = ref<RankingItemType[]>([]);
  const rankingSelf = ref<RankingSelfType | null>(null);
  const rankingPeriodList = [
    {
      label: "周排行",
      value: "weekly",
    },
    {
      label: "月排行",
      value: "monthly",
    },
    {
      label: "年排行",
      value: "yearly",
    },
  ];

  watch(currentPeriod, async () => {
    if (hasRankingCache(currentPeriod.value)) {
      updateRankingList(getRankingCache(currentPeriod.value));
      return;
    }

    const res = await fetchRankingList();
    updateRankingList(res);
    saveRankingCache(currentPeriod.value, res);
  });

  function updateRankingList(res: ProgressRankVo) {
    rankingList.value = res.list;
    rankingSelf.value = res.self;
  }

  function showLoading() {
    isLoading.value = true;
  }

  function hideLoading() {
    isLoading.value = false;
  }

  function togglePeriod(period: string) {
    if (currentPeriod.value === period) {
      return;
    }

    // 加载中不允许切换
    if (isLoading.value) {
      Message.warning("请等待当前排行榜加载完成", { duration: 1200 });
      return;
    }

    currentPeriod.value = period;
  }

  async function fetchRankingList() {
    showLoading();
    const res = await fetchProgressRank(currentPeriod.value);
    hideLoading();

    return res;
  }

  const rankModal = ref(false); // 需要作用于不同页面

  async function showRankModal() {
    rankModal.value = true;
    cleanRankingCache();

    const res = await fetchRankingList();
    updateRankingList(res);
    saveRankingCache(currentPeriod.value, res);
  }

  function hideRankModal() {
    rankModal.value = false;
  }

  return {
    rankModal,
    isLoading,
    currentPeriod,
    rankingList,
    rankingSelf,
    rankingPeriodList,
    togglePeriod,
    showRankModal,
    hideRankModal,
  };
});
