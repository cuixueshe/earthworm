import type { MaybeRef } from "vue";

import { ref, toValue, watchEffect } from "vue";

import type { UserLearnRecordResponse } from "~/api/userLearnRecord";
import { fetchLearnRecord } from "~/api/userLearnRecord";

interface UseLearnRecordOptions {
  year?: MaybeRef<number>;
  userId: string;
}

export function useLearnRecord(options: UseLearnRecordOptions) {
  const { userId } = options || {};
  const learnRecord = ref<UserLearnRecordResponse>({
    list: [],
    totalCount: 0,
  });

  const year = ref(options?.year || new Date().getFullYear());

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
  watchEffect(() => {
    updateLearnRecord();
  });

  return {
    year,
    learnRecord,
    updateLearnRecord,
  };
}
