import { ref } from "vue";

const currentPeriod = ref<string>("weekly");
const RankPeriodList = [
  {
    label: "周排行",
    value: "weekly",
  },
  {
    label: "月排行",
    value: "monthly",
  },
  {
    label: "总排行",
    value: "yearly",
  },
];

export function usePeriod() {
  const changePeriodValue = async (e: string) => {
    currentPeriod.value = e;
  };

  return {
    currentPeriod,
    RankPeriodList,
    changePeriodValue,
  };
}
