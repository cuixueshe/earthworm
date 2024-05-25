import type { MaybeRef } from "vue";

import { refDebounced } from "@vueuse/core";
import { ref, toValue, watch } from "vue";

import type { UserLearnRecordResponse } from "~/api/userLearnRecord";
import { fetchLearnRecord } from "~/api/userLearnRecord";
import { useUserStore } from "~/store/user";

interface UseLearnRecordOptions {
  year?: MaybeRef<number>;
  /**
   * @default string current user
   */
  userId?: string;
}

export function useLearnRecord(options: UseLearnRecordOptions) {
  const userStore = useUserStore();
  const { userId = userStore.userInfo?.sub! } = options || {};

  const learnRecord = ref<UserLearnRecordResponse>({
    list: [],
    totalCount: 0,
  });

  const year = ref(options?.year || new Date().getFullYear());
  const debouncedYear = refDebounced(year, 1500);

  function getQuery() {
    const yearStr = toValue(year);
    return {
      userId,
      startDate: yearStr ? `${yearStr}-01-01` : undefined,
      endDate: yearStr ? `${yearStr}-12-31` : undefined,
    };
  }

  async function updateLearnRecord() {
    const res = await fetchLearnRecord(getQuery());
    learnRecord.value = res;
  }
  watch(
    debouncedYear,
    () => {
      updateLearnRecord();
    },
    {
      immediate: true,
    },
  );

  return {
    year,
    learnRecord,
    updateLearnRecord,
  };
}
