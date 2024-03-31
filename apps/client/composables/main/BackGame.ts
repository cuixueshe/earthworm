import { ref } from "vue";
const isDisplay = ref(false);
export function BackGame() {
  function displayBack(cur: string, prev: any) {
    if (cur.includes("/user/info") && prev.includes("/main")) {
      isDisplay.value = true;
    } else {
      isDisplay.value = false;
    }
  }
  return {
    isDisplay,
    displayBack,
  };
}
