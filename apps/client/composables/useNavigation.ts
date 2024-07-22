import { navigateTo } from "#app";

export function useNavigation() {
  function gotoCourseList(coursePackId: string) {
    navigateTo(`/course-pack/${coursePackId}`);
  }

  function gotoGame(coursePackId: string, courseId: string) {
    navigateTo(`/game/${coursePackId}/${courseId}`);
  }

  return {
    gotoCourseList,
    gotoGame,
  };
}
