<template>
  <div class="container w-full">
    <template v-if="isLoading">
      <Loading></Loading>
    </template>
    <template v-else>
      <section class="flex md:flex-row md:justify-between justify-center flex-col py-8">
        <div class="w-1/2 mx-4">
          <div class="mb-12 leading-loose text-3xl opacity-80 items-center">
            <div class="">Why aren’t you good at English?</div>
            <div class="align-middle">
              It’s because you haven’t used
              <span class="text-fuchsia-400 font-bold">EARTHWORM</span> yet! 🤪
              <i class="animate-wink inline w-1 h-8 dark:bg-white bg-slate-900 mx-2 text-2xl p-[2px]"></i>
            </div>
          </div>
          <a class="mr-4" target="_blank" href="https://github.com/cuixueshe/earthworm">
            <button class="btn w-48 indicator">
              <span class="indicator-item">🌟</span>
              Star us on GitHub
            </button>
          </a>
          <button @click="handleKeydown"
            class="btn btn-outline w-48 hover:text-fuchsia-400 hover:border-fuchsia-400 hover:bg-fuchsia-100 text-fuchsia-300 border-fuchsia-300">
            Get Started<kbd class="kbd"> ↵ </kbd>
          </button>
        </div>
        <div class="w-1/2 flex items-center justify-center group select-none cursor-pointer rounded-xl relative m-4">
          <div class="absolute flex h-full w-full card">
            <div class="bg-dot rounded-[64px]"></div>
            <div
              class="absolute left-0 right-0 top-0 text-[220px] text-center group-hover:-skew-y-12 group-hover:rotate-12 transition-all">
              📖
            </div>
            <!-- <div
              class="absolute left-48 right-0 top-24 text-[80px] -ml-28 text-center color-gray group-hover:-skew-y-12 group-hover:rotate-[30deg] group-hover:-ml-32 group-hover:-mt-6 transition-all">
              🪱
            </div> -->
          </div>
        </div>
      </section>
      <section class="flex flex-col py-8">
        <h2 class="text-4xl text-center">What is Earthworm?</h2>
        <p class="text-center">
          an open-source, collaborative, user-friendly English learning tool.
        </p>
        <div class="flex">
          <div
            class="rounded-3xl my-8 mx-2 border dark:border-slate-600 bg-gradient-to-b from-neutral-50/90 to-neutral-100/90 transition duration-300 dark:from-neutral-600/90 dark:to-neutral-450/90 w-1/2 hover:shadow-2xl">
            <div class="h-[330px] flex flex-col p-4 text-sm overflow-y-auto">
              <h2 class="text-xl font-bold py-4">快速上手</h2>
              <p class="py-1">
                当前页面，点击按钮
                <span class="inline-block px-1 text-fuchsia-300 border border-solid border-fuchsia-300 rounded-lg">Get
                  Started</span>
                <span class="text-gray-500"> (或快捷键 Enter)</span> 开启你的第一节课。
              </p>
              <p class="py-1">
                课程页面，紫色下划线为聚焦状态，输入你的答案，敲击回车键验证结果。
              </p>
              <p class="py-1">验证通过才会显示正确结果，并语音播报。</p>
              <p class="py-1">
                点击按钮
                <button class="instruction-btn">again</button>
                <span class="text-gray-500"> (或快捷键 Ctrl+')</span>
                重置此前操作，再来亿次怎能学不会。
              </p>
              <p class="py-1">
                点击按钮
                <button class="instruction-btn">next</button>
                <span class="text-gray-500">(或快捷键 Enter)</span>
                开始下一个，冲冲冲霸占榜首。
              </p>

              <h2 class="text-xl font-bold py-4">帮助</h2>
              <p class="py-1">
                课程页面，输入下划线不是
                <span class="text-fuchsia-300">紫色</span>
                时无法输入，需要你动动小手移动鼠标点击聚焦即可。
              </p>
              <p class="py-1">输入状态下想要获取提示：</p>
              <p class="p-1">
                1. 可以点击页面下方的按钮
                <button class="instruction-btn">⌃ Ctrl+'</button>
                <span class="text-gray-500">(或快捷键 Ctrl+')</span> 播放语音。
              </p>
              <p class="p-1">
                2. 也可以点击按钮
                <button class="instruction-btn">⌃ Ctrl+;</button>
                <span class="text-gray-500">(或快捷键 Ctrl+;)</span> 显示答案。
              </p>
              <p class="py-1">
                右上角图标进入 User Info
                设置页面，可以自定义修改你喜欢的快捷键，也可以控制语音是否自动播放，更多个人设置会持续更新...
                <i class="animate-wink inline w-1 h-8 dark:bg-white bg-slate-900 mx-2 text-sm p-[2px]"></i>
              </p>
            </div>
          </div>
          <div
            class="rounded-3xl my-8 mx-2 border dark:border-slate-600 bg-gradient-to-b from-neutral-50/90 to-neutral-100/90 transition duration-300 dark:from-neutral-600/90 dark:to-neutral-450/90 w-1/2 hover:shadow-xl">
            <div class="h-[330px] flex p-4">
              这里是 earthworm 背后的学习原理 写的好不好?
            </div>
          </div>
        </div>
        <div class="w-1/2"></div>
        <div class="w-1/2"></div>
      </section>
      <section class="flex flex-col py-8">
        <h2 class="text-4xl text-center">Why Earthworm?</h2>
      </section>
    </template>

    <MessageBox v-model:is-show-modal="showMobileTip" content="The app isn't mobile-friendly, so stay tuned!"
      cancel-btn-text="fine" confirm-btn-text=""></MessageBox>
  </div>
</template>

<script setup lang="ts">
import Loading from "~/components/Loading.vue";
import { onMounted, onUnmounted, ref } from "vue";
import { useRouter } from "vue-router";
import { registerShortcut, cancelShortcut } from "~/utils/keyboardShortcuts";
import { useGameStore } from "~/store/game";
import MessageBox from "~/components/main/MessageBox.vue";

const { handleKeydown, isLoading } = useShortcutToGame();
const gameStore = useGameStore();

const { showMobileTip } = useMonitorSystem();

function useMonitorSystem() {
  const showMobileTip = ref(false);

  function mobileSystem() {
    return "ontouchstart" in document.documentElement;
  }

  onMounted(() => {
    showMobileTip.value = mobileSystem();
  });

  return {
    showMobileTip,
  };
}

function useShortcutToGame() {
  const router = useRouter();
  const isLoading = ref(false);

  async function handleKeydown() {
    isLoading.value = true;
    const { courseId } = await gameStore.startGame();
    isLoading.value = false;
    router.push(`/main/${courseId}`);
  }

  onMounted(() => {
    registerShortcut("enter", handleKeydown);
  });

  onUnmounted(() => {
    cancelShortcut("enter", handleKeydown);
  });

  return {
    handleKeydown,
    isLoading,
  };
}
</script>

<style>
.bg-dot {
  aspect-ratio: 1;
  position: relative;
  background: #fff;
  filter: contrast(50) invert(0);
  mix-blend-mode: multiply;
  isolation: isolate;
  opacity: 0.4;
  overflow: hidden;
}

.dark .bg-dot {
  opacity: 1;
}

.bg-dot::after {
  content: "";
  position: absolute;
  inset: 0;
  background-image: radial-gradient(circle at center,
      #a800b2 0.06rem,
      transparent 0.65rem);
  background-size: var(--bgSize, 1rem) var(--bgSize, 1rem);
  background-repeat: round;
  background-position:
    0 0,
    var(--bgPosition) var(--bgPosition);
  mask-image: linear-gradient(rgb(0 0 0), rgb(0 0 0 / 0.5));
}

.instruction-btn {
  @apply btn btn-xs text-gray-500 bg-gray-100 hover:text-gray-100 hover:bg-gray-500 dark:text-white dark:bg-gray-500 dark:hover:text-white dark:hover:bg-fuchsia-500;
}
</style>
