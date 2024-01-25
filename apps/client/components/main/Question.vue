<template>
  <div class="text-5xl text-center mb-20 mt-10">
    <div class="text-fuchsia-500 dark:text-gray-50">
      {{
        courseStore.currentStatement?.chinese ||
        "生存还是毁灭，这是一个问题"
      }}
    </div>
    <div class="code-box">
      <template v-for="i in lineNum" :key="i">
        <div
          :class="[
            'code-item',
            'border-b-2',
            'border-b-solid',
            'border-b-gray-300 dark:border-b-gray-500',
            i - 1 === activeInputIndex && focusing ? 'active' : '',
            'dark:text-indigo-500  text-[rgba(32,32,32,0.6)]',
          ]"
        >
          {{ words[i - 1] }}
        </div>
      </template>
      <input
        ref="input"
        class="code-input"
        type="text"
        v-model="inputValue"
        @keyup="handleKeyup"
        @focus="handleInputFocus"
        @blur="handleBlur"
        autoFocus
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCourseStore } from "~/store/course";
import { useMode } from "./game";

const { showAnswer } = useMode();

const courseStore = useCourseStore();

const input = ref<HTMLInputElement>();
const lineNum = ref(1);
const focusing = ref(true);
const inputValue = ref("");
const words = ref<string[]>([]);

const activeInputIndex = computed(() => {
  return Math.min(words.value.length - 1, lineNum.value - 1);
});

watchEffect(() => {
  lineNum.value = courseStore.currentStatement?.english.split(" ").length || 1;
});

watchEffect(() => {
  words.value = inputValue.value.trimStart().split(" ");
});

function handleKeyup(e: KeyboardEvent) {
  if (e.code === "Enter") {
    e.stopPropagation();

    if (courseStore.checkCorrect(inputValue.value.trim())) {
      showAnswer();
    }
    inputValue.value = "";
  }
}

onMounted(() => {
  input.value?.focus();
});

function handleInputFocus() {
  focusing.value = true;
}

function handleBlur() {
  focusing.value = false;
}
</script>

<style scoped>
.code-box {
  height: 10vh;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 80vw;
  position: relative;
  margin-top: 8px;
}

.code-box .code-item {
  min-width: 10vw;
  min-height: 6vh;
  text-align: center;
  font-size: 4vw;
  transition: border 0.3s;
  box-sizing: border-box;
  margin-right: 8px;
  display: flex;
  justify-content: center;
  align-items: flex-end;
}

.code-box .code-input {
  position: absolute;
  width: 100%;

  height: 100%;
  opacity: 0;
}

.active {
  border-bottom: 3px solid #1e80ff !important;
}
</style>
~/store/course-new~/store/course
