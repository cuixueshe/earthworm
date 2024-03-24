<template>
  <div class="container w-full">
    <template v-if="isLoading">
      <Loading></Loading>
    </template>
    <template v-else>
      <section class="flex items-center flex-col py-8 mx-4">
          <div class="mb-12 leading-loose text-3xl opacity-80 items-center">
            <div class="">Why aren’t you good at English?</div>
            <div class="align-middle">
              It’s because you haven’t used
              <span class="text-fuchsia-400 font-bold">EARTHWORM</span> yet! 🤪
              <i class="animate-wink inline w-1 h-8 dark:bg-white bg-slate-900 mx-2 text-2xl p-[2px]"></i>
            </div>
          </div>
          <a class="mb-4" target="_blank" href="https://github.com/cuixueshe/earthworm">
            <button class="btn w-48 indicator">
              <span class="indicator-item">🌟</span>
              Star us on GitHub
            </button>
          </a>
          <button @click="handleStart"
            class="btn btn-outline w-48 hover:text-fuchsia-400 hover:border-fuchsia-400 hover:bg-fuchsia-100 text-fuchsia-300 border-fuchsia-300">
            Get Started
          </button>

      </section>
      <section class="flex flex-col py-8">
        <h2 class="text-4xl text-center">What is Earthworm?</h2>
        <p class="text-center pt-5 color-[#666]">
          an open-source, collaborative, user-friendly English learning tool.
        </p>
        <div
          class="rounded-3xl my-8 mx-2 border dark:border-slate-600 bg-gradient-to-b from-neutral-50/90 to-neutral-100/90 transition duration-300 dark:from-neutral-600/90 dark:to-neutral-450/90 hover:shadow-2xl">
          <div class=" flex flex-col p-4 text-sm">
            <h2 class="text-xl font-bold py-4">快速上手</h2>
            <p class="py-1">
              当前页面，点击按钮
              <span class="inline-block px-1 text-fuchsia-300 border border-solid border-fuchsia-300 rounded-lg">Get
                Started</span>，开启你的第一节课。
            </p>
            <p class="py-1">
              课程页面，紫色下划线为聚焦状态，输入你的答案，点击<span class="inline-block px-1 text-fuchsia-300 border border-solid border-fuchsia-300 rounded-lg mx-1">Submit</span>验证结果。
            </p>
            <p class="py-1">验证通过才会显示正确结果，并语音播报。</p>
            <p class="py-1">
              点击按钮
              <button class="instruction-btn">again</button>重置此前操作，再来亿次怎能学不会。
            </p>
            <p class="py-1">
              点击按钮
              <button class="instruction-btn">next</button>
              开始下一个，冲冲冲霸占榜首。
            </p>

            <h2 class="text-xl font-bold py-4">帮助</h2>
            <p class="py-1">
              课程页面，输入下划线不是
              <span class="text-fuchsia-300">紫色</span>
              时无法输入。
            </p>
            <p class="py-1">想要获取提示：</p>
            <p class="p-1">
              1. 可以点击页面下方的语音播放按钮播放语音。
            </p>
            <p class="p-1">
              2. 也可以点击显示答案按钮显示答案。
            </p>
            <p class="py-1">
              Earthworm更注重于提供优质的PC端体验，如果条件支持，请使用PC设备进行学习。手机上只支持部分功能，感谢！
              <i class="animate-wink inline w-1 h-8 dark:bg-white bg-slate-900 mx-2 text-sm p-[2px]"></i>
            </p>
          </div>
        </div>
        <div class="w-1/2"></div>
        <div class="w-1/2"></div>
      </section>
    </template>
  </div>
</template>

<script setup lang="ts">
import Loading from "~/components/Loading.vue";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { isMobileSystem } from "~/utils/system";
import { useGameStore } from "~/store/game";
import { useUserStore } from "~/store/user";

const userStore = useUserStore();
const { handleStart, isLoading } = useShortcutToGame();
const gameStore = useGameStore();

useMonitorSystem();

function useMonitorSystem() {
  const router = useRouter()

  if(!isMobileSystem()) {
    router.push('/')
  }
}

function useShortcutToGame() {
  const router = useRouter();
  const isLoading = ref(false);

  async function handleStart() {
    if(!userStore.user) {
      router.push('/auth/login')
      return
    }
    isLoading.value = true;
    const { courseId } = await gameStore.startGame();
    isLoading.value = false;
    router.push(`/main/${courseId}`);
  }



  return {
    handleStart,
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
