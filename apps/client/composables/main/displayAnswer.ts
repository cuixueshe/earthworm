import { ref } from "vue";
const display = ref(false);
export default function displayAnswer() {
  function showAnswer() {
    display.value = true;
  }
  function hideAnswer() {
    display.value = false;
  }
  return {
    display,
    showAnswer,
    hideAnswer,
  };
}
