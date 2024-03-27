import { ref, watch } from "vue";
import {
  fetchProgressRank,
  type RankingItemType,
  type RankingSelfType,
} from "~/api/rank";
import Message from "~/components/main/Message/useMessage";

// 排行榜弹框
const showModal = ref(false); // 需要作用于不同页面
export function useRankModal() {
  function show() {
    showModal.value = true;
  }

  function hide() {
    showModal.value = false;
  }

  return {
    showModal,
    show,
    hide,
  };
}

export function useRankingList() {
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

  resetData();
  getRankingList();

  // 切换排行榜
  watch(currentPeriod, async () => {
    showLoading();
    resetData();
    await getRankingList();
    hideLoading();
  });

  function showLoading() {
    isLoading.value = true;
  }

  function hideLoading() {
    isLoading.value = false;
  }

  function resetData() {
    rankingList.value = [];
    rankingSelf.value = null;
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

  async function getRankingList() {
    const res = await fetchProgressRank(currentPeriod.value);
    rankingList.value = res.list;
    rankingSelf.value = res.self;
  }

  return {
    isLoading,
    currentPeriod,
    rankingList,
    rankingSelf,
    rankingPeriodList,
    togglePeriod,
  };
}
