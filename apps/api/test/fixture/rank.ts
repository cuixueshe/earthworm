export function createEmptyRankList() {
  return {
    list: [],
    self: {
      username: 'testUser',
      count: 0,
      rank: null,
    },
  };
}

export function createRankListWithFirstUserFinishedCourse() {
  return {
    list: [
      {
        username: 'testUser',
        count: '1',
      },
    ],
    self: {
      username: 'testUser',
      count: '1',
      rank: 0,
    },
  };
}

export function createRankListWithUserFinishedCourse2Times() {
  return {
    list: [
      {
        username: 'testUser',
        count: '2',
      },
    ],
    self: {
      username: 'testUser',
      count: '2',
      rank: 0,
    },
  };
}
