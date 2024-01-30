<template>
  <div class="text-center pt-2">
    <div class="flex relative flex-wrap justify-center ml-2 transition-all">
      <template v-for="i in courseStore.wordCount" :key="i">
        <div
          class="flex items-end justify-center h-[4.2rem] min-w-20 px-4 mr-2 border-solid rounded-[2px] border-b-2 text-[3.2em] transition-all"
          :class="[
            i - 1 === activeInputIndex && focusing ? 'text-fuchsia-500 border-b-fuchsia-500' : 'text-[#20202099] border-b-gray-300 dark:text-gray-300 dark:border-b-gray-400',
          ]">
          {{ userInputWords[i - 1] }}
        </div>
      </template>
      <input ref="inputEl" class="absolute h-full w-full opacity-0" type="text" @input="handleInput"
        @keyup.stop="handleKeyup" @focus="handleInputFocus" @blur="handleBlur" :value="inputValue" autoFocus />

    </div>
    <div class="mt-12 text-xl dark:text-gray-50">
      {{ courseStore.currentStatement?.chinese || '生存还是毁灭，这是一个问题' }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCourseStore } from '~/store/course';
import { useGameMode } from '~/composables/main/game';

const courseStore = useCourseStore();
const { userInputWords, activeInputIndex, inputValue } = useInput();
const { handleKeyup } = registerShortcutKeyForInputEl();
const { inputEl, focusing, handleInputFocus, handleBlur } = useFocus();

function useInput() {
  const inputValue = ref('');

  const userInputWords = computed(() => {
    return inputValue.value.trimStart().split(' ');
  });

  const activeInputIndex = computed(() => {
    return Math.min(userInputWords.value.length - 1, courseStore.wordCount - 1);
  });

  return {
    inputValue,
    userInputWords,
    activeInputIndex,
  };
}
function handleInput(event: Event) {
  const target = event.target as HTMLInputElement;
  const newInput = target.value;
  const lastChar = newInput[newInput.length - 1];

  // 更新inputValue，但如果最后一个字符是空格且当前单词为空，忽略它
  const currentWord = userInputWords.value[activeInputIndex.value];
  if (lastChar !== ' ' || (currentWord && currentWord.length > 0)) {
    inputValue.value = newInput;
  } else if (lastChar === ' ' && (!currentWord || currentWord.length === 0)) {
    // 如果输入的是空格，但当前单词为空，则重置输入框的值为去除尾部空格的值
    target.value = newInput.slice(0, -1);
  }
}



function registerShortcutKeyForInputEl() {
  const { showAnswer } = useGameMode();

  function handleKeyup(e: KeyboardEvent) {
    console.log(`Key: ${e.code}`); // 日志按键代码

    if (e.code === 'Space') {
      const currentWord = userInputWords.value[activeInputIndex.value];
      console.log(`当前单词 ${activeInputIndex.value}: '${currentWord}'`); // 日志当前词

      if (!currentWord || currentWord.length === 0) {
        console.log("防止空间移动到下一个输入."); // 日志阻止信息
        e.preventDefault();
        return;
      }
    }

    if (e.code === 'Enter') {
      e.stopPropagation();
      if (courseStore.checkCorrect(inputValue.value.trim())) {
        showAnswer();
      }
      inputValue.value = '';
    }
  }

  return {
    handleKeyup,
  };
}

function useFocus() {
  const focusing = ref(true);
  const inputEl = ref<HTMLInputElement>();
  onMounted(() => {
    inputEl.value?.focus();
  });

  function handleInputFocus() {
    focusing.value = true;
  }

  function handleBlur() {
    focusing.value = false;
  }

  return {
    inputEl,
    focusing,
    handleInputFocus,
    handleBlur,
  };
}
</script>
