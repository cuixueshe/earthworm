import { ref } from "vue";

import type { UserLearnRecordResponse } from "~/api/userLearnRecord";
import { fetchLearnRecord } from "~/api/userLearnRecord";

let year: number | undefined = 0;
const learnRecord = ref<UserLearnRecordResponse>({
  list: [],
  totalCount: 0,
});
let isSetup = false;

export function useLearnRecord() {
  function setQueryYear(val?: number) {
    if (year !== val) {
      year = val;
      isSetup = false;
    }
  }

  function getQuery() {
    return {
      startDate: year ? `${year}-01-01` : undefined,
      endDate: year ? `${year}-12-31` : undefined,
    };
  }

  async function updateLearnRecord() {
    const res = await fetchLearnRecord(getQuery());
    learnRecord.value = res;
  }

  async function setupLearnRecord() {
    if (isSetup) return;
    isSetup = true;
    const res = await fetchLearnRecord(getQuery());
    learnRecord.value = res;
  }

  return {
    learnRecord,
    updateLearnRecord,
    setQueryYear,
    setupLearnRecord,
  };
}
