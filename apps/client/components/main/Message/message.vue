<script lang="ts" setup name="Message">
import { onMounted, ref } from "vue";

import { Type } from "./useMessage";

const { type = Type.SUCCESS, duration = 2000 } = defineProps<{
  type?: Type;
  text: string;
  duration?: number;
}>();
const isShow = ref(false);

const style = {
  warning: {
    color: "#E6A23C",
    backgroundColor: "rgb(253, 246, 236)",
    borderColor: "rgb(250, 236, 216)",
  },
  error: {
    color: "#F56C6C",
    backgroundColor: "rgb(254, 240, 240)",
    borderColor: "rgb(253, 226, 226)",
  },
  success: {
    color: "#67C23A",
    backgroundColor: "rgb(240, 249, 235)",
    borderColor: "rgb(225, 243, 216)",
  },
};

onMounted(() => {
  isShow.value = true;

  setTimeout(() => {
    isShow.value = false;
  }, duration);
});
</script>

<template>
  <Transition name="down">
    <div
      class="fixed left-1/2 top-20 flex h-[40px] -translate-x-1/2 items-center justify-center rounded-md bg-opacity-90 px-6 py-0 text-center leading-[40px] shadow-md"
      :class="type"
      :style="style[type]"
      v-if="isShow"
    >
      <i
        v-if="type === Type.SUCCESS"
        class="i-ph-check-circle-bold mr-4 h-4 w-4 shrink-0 stroke-current"
      ></i>
      <i
        v-else-if="type === Type.ERROR"
        class="i-ph-x-circle-bold mr-4 h-4 w-4 shrink-0 stroke-current"
      ></i>
      <i
        v-else
        class="i-ph-warning-circle-bold mr-4 h-4 w-4 shrink-0 stroke-current"
      ></i>
      <span class="text-sm font-medium">{{ text }}</span>
    </div>
  </Transition>
</template>

<style scoped>
.down-enter-from,
.down-leave-to {
  opacity: 0;
  transform: translate(-50%, -10px);
}
.down-enter-active,
.down-leave-active {
  transition:
    opacity 0.5s,
    transform 0.5s;
}
.down-enter-to,
.down-leave-from {
  opacity: 1;
  transform: translate(-50%, 0);
}
</style>
