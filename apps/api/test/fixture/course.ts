export function createFirstCourse() {
  return {
    title: "第一课",
    id: 1,
  };
}

export function createSecondCourse() {
  return {
    title: "第二课",
    id: 2,
  };
}

export function createCourses() {
  return [createFirstCourse(), createSecondCourse()];
}
