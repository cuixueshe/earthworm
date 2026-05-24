export function createStatement(courseId: string) {
  return {
    order: 1,
    nativeText: "Xin chào",
    english: "hi",
    soundmark: "/hi/",
    courseId,
  };
}

export function createMultipleStatement(courseId: string) {
  return [
    {
      order: 1,
      nativeText: "Tôi",
      english: "I",
      soundmark: "/aɪ/",
      courseId,
    },
    {
      order: 2,
      nativeText: "thích",
      english: "like",
      soundmark: "/laɪk/",
      courseId,
    },
  ];
}
