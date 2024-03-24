export function createEmptyUserLearnRecordList() {
  return {
    list: [],
    totalCount: 0,
  };
}

export function createUserLearnRecordList() {
  return {
    list: [{ date: '2024-01-01', count: 1 }],
    totalCount: 1,
  };
}
