<template>
  <div class="container w-full">
    <template v-if="isLoading">
      <Loading></Loading>
    </template>
    <template v-else>
      <section
        class="flex flex-col justify-center py-8 md:flex-row md:justify-between"
      >
        <div class="w-1/2 mx-4">
          <div class="items-center mb-12 text-3xl leading-loose opacity-80">
            <div class="">Why aren’t you good at English?</div>
            <div class="align-middle">
              It’s because you haven’t used
              <span class="font-bold text-fuchsia-400">EARTHWORM</span> yet! 🤪
              <i
                class="animate-wink inline w-1 h-8 dark:bg-white bg-slate-900 mx-2 text-2xl p-[2px]"
              ></i>
            </div>
          </div>
          <a
            class="w-48 mr-4 btn indicator"
            target="_blank"
            href="https://github.com/cuixueshe/earthworm"
          >
            <span class="indicator-item">🌟</span>
            Star us on GitHub
          </a>
          <button
            @click="handleKeydown"
            class="w-48 btn btn-outline hover:text-fuchsia-400 hover:border-fuchsia-400 hover:bg-fuchsia-100 text-fuchsia-300 border-fuchsia-300"
          >
            Get Started<kbd class="kbd"> ↵ </kbd>
          </button>
        </div>
        <div
          class="relative flex items-center justify-center w-1/2 m-4 cursor-pointer select-none group rounded-xl"
        >
          <div class="absolute flex w-full h-full card">
            <div class="bg-dot rounded-[64px]"></div>
            <div
              class="absolute left-0 right-0 top-0 text-[220px] text-center group-hover:-skew-y-12 group-hover:rotate-12 transition-all"
            >
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
        <p class="pt-2 text-center">
          an open-source, collaborative, user-friendly English learning tool.
        </p>
        <div class="flex">
          <div
            class="w-1/2 mx-2 my-8 transition duration-300 border rounded-3xl dark:border-slate-600 bg-gradient-to-b from-neutral-50/90 to-neutral-100/90 dark:from-neutral-600/90 dark:to-neutral-450/90 hover:shadow-2xl"
          >
            <div class="h-[330px] flex flex-col pt-4 pl-4 pb-4 text-sm">
              <div class="pr-2 overflow-y-auto">
                <h2 class="py-4 text-xl font-bold">快速上手</h2>
                <h3 class="pb-2 text-base font-semibold">当前页面</h3>
                <p class="py-1">
                  点击按钮
                  <span
                    class="inline-block px-1 mx-1 border border-solid rounded-lg text-fuchsia-300 border-fuchsia-300"
                    >Get Started</span
                  >
                  <span class="text-gray-500">（或快捷键 Enter ⏎）</span>
                  开启你的第一节课！
                </p>
                <h3 class="py-2 text-base font-semibold">答题页面</h3>
                <p class="py-1 leading-7">
                  看到
                  <span class="text-fuchsia-500">紫色下划线</span>
                  亮起，输入单词，按下空格键
                  <span class="text-gray-500">（Space ␣）</span>
                  向后切换单词，待输入完成后再按下回车键
                  <span class="text-gray-500">（Enter ⏎）</span>
                  来提交题目
                </p>
                <p class="py-1 leading-7">
                  题目提交后若出现
                  <span class="text-red-500">红色</span>
                  单词和下划线显示，代表这部分单词存在某些错误需要更正，此时可按下空格键
                  <span class="text-gray-500">（Space ␣）</span>
                  快速定位到第一个错误单词并清空，完成更改后再按一次空格继续定位到下个错词
                </p>
                <p class="py-1 leading-7">
                  此时若发现上个错词未正确修改，可按下退格键
                  <span class="text-gray-500">（Backspace ⌫）</span>
                  来回退到上一个错词，直到所有错词被更正完成，按下回车键提交即可
                </p>
                <p class="py-1 leading-7">
                  验证通过后会显示答案页面，同时会播放对应题目语音用于辅助记忆。
                </p>
                <h3 class="py-2 text-base font-semibold">答题小技巧</h3>
                <p class="py-1 leading-7">
                  底部提示面板的按钮
                  <a
                    class="ml-1 text-[#3498db] hover:text-fuchsia-500"
                    href="https://www.bilibili.com/video/BV1py421q7Mp/"
                  >
                    👉 一分钟点我快速了解</a
                  >
                </p>
                <p class="p-1">
                  <button class="instruction-btn">⌃ Ctrl+'</button>
                  <span class="text-gray-500">（或快捷键 Ctrl+'）</span>
                  播放题目语音
                </p>
                <p class="p-1">
                  <button class="instruction-btn">⌃ Ctrl+;</button>
                  <span class="text-gray-500">（或快捷键 Ctrl+;）</span>
                  显示题目答案
                </p>
                <h3 class="py-2 text-base font-semibold">答案页面</h3>
                <p class="py-1 leading-7">答案下方的按钮</p>
                <p class="py-1">
                  <button class="instruction-btn">again</button>
                  <span class="text-gray-500">（或快捷键 Ctrl+;）</span>
                  再来亿次，怎能不会！
                </p>
                <p class="py-1">
                  <button class="instruction-btn">next</button>
                  <span class="text-gray-500">（或快捷键 Enter）</span>
                  下一题，冲冲冲霸占榜首！🏄‍♂️
                </p>

                <h2 class="py-4 text-xl font-bold">帮助</h2>
                <h3 class="pb-2 text-base font-semibold">课程页面</h3>
                <p class="py-1 leading-7">
                  输入下划线全是灰色，没有
                  <span class="text-fuchsia-500">紫色</span>
                  亮起时无法输入，需要你动动小手移动鼠标点击输入框进行聚焦哦~
                </p>
                <h3 class="py-2 text-base font-semibold">用户设置页面</h3>
                <p class="py-1 leading-7">
                  右上角图标进入 User Info
                  切换到设置页面，自定义你喜欢的快捷键，也可以控制语音是否自动播放、单词下划线固定长度、使用空格提交等等……更多个人设置会持续更新
                  😊
                  <i
                    class="animate-wink inline w-1 h-8 dark:bg-white bg-slate-900 mx-2 text-sm p-[2px]"
                  ></i>
                </p>
              </div>
            </div>
          </div>
          <div
            class="w-1/2 mx-2 my-8 transition duration-300 border rounded-3xl dark:border-slate-600 bg-gradient-to-b from-neutral-50/90 to-neutral-100/90 dark:from-neutral-600/90 dark:to-neutral-450/90 hover:shadow-xl"
          >
            <div class="h-[330px] flex flex-col pt-4 pl-4 pb-4 text-sm">
              <div class="pr-2 overflow-y-auto">
                <h2 class="py-4 text-xl font-bold">
                  学习原理：通过连词造句的方法来练习英语 😄
                </h2>
                <h3 class="pb-2 text-base font-semibold">以句子为核心</h3>
                <p class="py-1">
                  每个句子包含单词/词组/语法，所以学会一个句子后，就可以清晰地表达出来。
                </p>
                <h3 class="py-2 text-base font-semibold">任务拆分</h3>
                <p class="py-1 leading-7">
                  将一个长难句拆分成一个个的小单元（单词/词组）
                </p>
                <h3 class="py-2 text-base font-semibold">重复</h3>
                <p class="py-1 leading-7">通过不断地重复来形成肌肉记忆</p>
                <h3 class="py-2 text-base font-semibold">i+1</h3>
                <p class="py-1 leading-7">
                  循序渐进的增加难度，先从最简单的句型开始，再到更加丰富的概念
                </p>
                <h3 class="pb-2 text-base font-semibold">正向反馈来的快</h3>
                <p class="py-1 leading-7">
                  当自己可以写出长难句时，会非常有成就感，所以也会越学越想学。打破了传统且非常痛苦的英语学习方案 ——背单词（还记得 abandon 吗？ oh 不，现在是 aback 了）
                </p>
              </div>
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
  </div>
</template>

<script setup lang="ts">
import Loading from "~/components/Loading.vue";
import { onMounted, onUnmounted, ref } from "vue";
import { useRouter } from "vue-router";
import { registerShortcut, cancelShortcut } from "~/utils/keyboardShortcuts";
import { isMobileSystem } from "~/utils/system";
import { useGameStore } from "~/store/game";

const { handleKeydown, isLoading } = useShortcutToGame();
const gameStore = useGameStore();

useMonitorSystem();

function useMonitorSystem() {
  const router = useRouter();

  if(isMobileSystem()) {
    router.push("/MIndex");
  }
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
  background-image: radial-gradient(
    circle at center,
    #a800b2 0.06rem,
    transparent 0.65rem
  );
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
