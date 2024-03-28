import { ref } from "vue";

export const LISTENING_MODE = "listeningMode";
const listeningMode = ref(false);

function load() {
  const value = localStorage.getItem(LISTENING_MODE);
  if (value === "false") {
    store(false);
  } else if (!value) {
    store(listeningMode.value);
  } else {
    store(true);
  }
}
function store(value: boolean) {
  listeningMode.value = value;
  localStorage.setItem(LISTENING_MODE, `${value}`);
}
function toggleMode() {
  store(!listeningMode.value);
}
const isListeningMode = () => listeningMode.value;

// 临时变量
const listeningTransfer = ref(true);
function hiddenListeningTransfer() {
  listeningTransfer.value = false;
}
const audioRate = ref("1");
const audioTimes = ref("1");

/**
 * 答题模式
 *  - 普通模式
 *  - 听力模式
 */
export function useAnswerMode() {
  load();
  return {
    listeningMode,
    toggleMode,
    isListeningMode,

    listeningTransfer,
    hiddenListeningTransfer,

    audioRate,
    audioTimes,
  };
}
