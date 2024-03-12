<template>
  <div class="text-center pt-10 flex flex-col items-center" @click="handleCharClick">
    <div v-for="(listItem, index) in charList" :key="index" class="flex">
      <div v-for="(item, i) in listItem" :key="i"
        :class="[item === 'Space' ?  'w-48' : item === 'Backspace' ? 'w-24' : 'w-8']"
        class="char char-button rounded-button border-4 h-8 leading-5 flex-shrink-0 mx-0.5 mb-1">{{ item }}</div>
    </div>
  </div>

  <div @click="submit" class="char-button rounded-button border-4 mt-4">Submit</div>
</template>

<script setup lang="ts">
// 模拟手机26键小写字母的数组 
const charList: string[][] = [
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  [ 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'], 
  ['z', 'x', 'c', 'v', 'b', 'n', 'm', "'"],
  ["Space", 'Backspace']
]

const emits = defineEmits(['setInputValue', 'delInputValue', 'handleEnterKeyup'])

function submit() {
  emits('handleEnterKeyup')
}

function handleCharClick(e: Event) {
  const element = e.target as HTMLDivElement
  if(!element.classList.contains('char')) return
  let text = element.innerText === 'Space' ? ' ' : element.innerText
  let code = element.innerText
  dispatch(text, code)
}

function dispatch(text: string, code: string) {
  switch(text) {
    case 'Backspace':
      actions('Backspace', {code, text})
      break;
    default:
      actions('input', {code, text})
      break;
  }
}

function actions(type: string, {code, text}) {
  if(type === 'Backspace') {
    emits('delInputValue', code)
  return
  }
  if(type === 'input') {
    emits('setInputValue', text, code)
  }
}
</script>


<style scoped>
.char-button {
    transition: transform 100ms cubic-bezier(0, 0, 0.58, 1);
}

.char-button:active {
    transform: scale(.9);
}
</style>

// 错误的时候 删除 建 删除当前位置的单词 但是不能一直往前删除 这个修复
