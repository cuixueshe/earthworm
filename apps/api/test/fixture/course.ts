export function createFirstCourse() {
  return {
    title: "Bài 1",
    id: 1,
  };
}

export function createSecondCourse() {
  return {
    title: "Bài 2",
    id: 2,
  };
}

export function createCourses() {
  return [createFirstCourse(), createSecondCourse()];
}
