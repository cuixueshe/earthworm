export function createEmptyRankList() {
  return {
    list: [],
    self: {
      nickname: 'testUser',
      count: -1,
      rank: -1,
    },
  };
}

export function createRankListWithFirstUserFinishedCourse() {
  return {
    list: [
      {
        nickname: 'testUser',
        count: 1,
      },
    ],
    self: {
      nickname: 'testUser',
      count: 1,
      rank: 1,
    },
  };
}

export function createRankListWithUserFinishedCourse2Times() {
  return {
    list: [
      {
        nickname: 'testUser',
        count: 2,
      },
    ],
    self: {
      nickname: 'testUser',
      count: 2,
      rank: 1,
    },
  };
}
