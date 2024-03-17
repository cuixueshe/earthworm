<script lang="ts" setup name="Message">
import { onMounted, ref } from "vue";
import { Type } from './Message.ts';

const { type = Type.SUCCESS, duration = 2000 } = defineProps<{
  type?: Type;
  text: string;
  duration?: number;
}>();
const isShow = ref(false);

const style = {
  warning: {
    icon: "icon-warning",
    color: "#E6A23C",
    backgroundColor: "rgb(253, 246, 236)",
    borderColor: "rgb(250, 236, 216)",
  },
  error: {
    icon: "icon-shanchu",
    color: "#F56C6C",
    backgroundColor: "rgb(254, 240, 240)",
    borderColor: "rgb(253, 226, 226)",
  },
  success: {
    icon: `<svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>`,
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
      class="fixed top-20 left-1/2 -translate-x-1/2 flex items-center h-[40px] rounded-md shadow-md px-6 py-0 leading-[40px] text-center bg-opacity-90"
      :class="type"
      :style="style[type]"
      v-if="isShow"
    >
      <svg
        v-if="type === Type.SUCCESS"
        xmlns="http://www.w3.org/2000/svg"
        class="stroke-current shrink-0 h-4 w-4 mr-4"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <svg
        v-else-if="type === Type.Error"
        xmlns="http://www.w3.org/2000/svg"
        class="stroke-current shrink-0 h-4 w-4 mr-4"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <svg
        v-else
        xmlns="http://www.w3.org/2000/svg"
        class="stroke-current shrink-0 h-4 w-4 ml-2 mr-2"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
        />
      </svg>
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
