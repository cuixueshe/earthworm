import { ref } from "vue";

type AnswerSubmitKeys = {
  label: string;
  value: string;
  defaultChecked: boolean;
};

export const LOCAL_SUBMIT_KEY = "submitKey";
const answerSubmitKeys = ref<AnswerSubmitKeys[]>([
  {
    label: "回车键",
    value: "Enter",
    defaultChecked: true,
  },
  {
    label: "空格键",
    value: "Space",
    defaultChecked: false,
  },
  {
    label: "都支持",
    value: "All",
    defaultChecked: false,
  },
]);

function store(value: string) {
  localStorage.setItem(LOCAL_SUBMIT_KEY, value);
}

function loadCache() {
  const submitKey = localStorage.getItem(LOCAL_SUBMIT_KEY);
  store(submitKey || "Enter");
}

function handleCheckRadio(data: AnswerSubmitKeys) {
  answerSubmitKeys.value.forEach((item) => {
    item.defaultChecked = false;
  });
  data.defaultChecked = true;
  store(data.value);
}

function showSubmitKey() {
  return localStorage.getItem(LOCAL_SUBMIT_KEY);
}

export function useSubmitKey() {
  loadCache();
  return {
    answerSubmitKeys,
    handleCheckRadio,
    showSubmitKey,
  };
}
