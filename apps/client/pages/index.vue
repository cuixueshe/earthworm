<template>
  <div class="container w-full">
    <template v-if="isLoading">
      <Loading></Loading>
    </template>

<template v-else>
      <section
        class="flex md:flex-row md:justify-between justify-center flex-col py-8"
      >
        <div class="w-1/2 mx-4">
          <div class="mb-12 leading-loose text-3xl opacity-80 items-center">
            <div class="">Why aren’t you good at English?</div>
            <div class="align-middle">
              It’s because you haven’t used
              <span class="text-fuchsia-400 font-bold">EARTHWORM</span> yet! 🤪
              <i
                class="animate-wink inline w-1 h-8 dark:bg-white bg-slate-900 mx-2 text-2xl p-[2px]"
              ></i>
            </div>
          </div>
          <a
            class="mr-4 btn w-48 indicator"
            target="_blank"
            href="https://github.com/cuixueshe/earthworm"
          >
            <span class="indicator-item">🌟</span>
            Star us on GitHub
          </a>
          <button
            @click="handleKeydown"
            class="btn btn-outline w-48 hover:text-fuchsia-400 hover:border-fuchsia-400 hover:bg-fuchsia-100 text-fuchsia-300 border-fuchsia-300"
          >
            Get Started<kbd class="kbd"> ↵ </kbd>
          </button>
        </div>
        <div
          class="w-1/2 flex items-center justify-center group select-none cursor-pointer rounded-xl relative m-4"
        >
          <div class="absolute flex h-full w-full card">
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
        <p class="text-center">
          an open-source, collaborative, user-friendly English learning tool.
        </p>
        <div class="flex">
          <div
            class="rounded-3xl my-8 mx-2 border dark:border-slate-600 bg-gradient-to-b from-neutral-50/90 to-neutral-100/90 transition duration-300 dark:from-neutral-600/90 dark:to-neutral-450/90 w-1/2 hover:shadow-2xl"
          >
            <div class="h-[330px] flex flex-col pt-4 pl-4 pb-4 text-sm">
              <div class="pr-2 overflow-y-auto">
                <h2 class="py-4 text-xl font-bold">快速上手</h2>
                <h3 class="pb-2 text-base font-semibold">当前页面</h3>
                <p class="py-1">
                  点击按钮
                  <span
                    class="inline-block mx-1 px-1 text-fuchsia-300 border border-solid border-fuchsia-300 rounded-lg"
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

                <h2 class="text-xl font-bold py-4">帮助</h2>
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
            class="rounded-3xl my-8 mx-2 border dark:border-slate-600 bg-gradient-to-b from-neutral-50/90 to-neutral-100/90 transition duration-300 dark:from-neutral-600/90 dark:to-neutral-450/90 w-1/2 hover:shadow-xl"
          >
            <div class="h-[330px] flex p-4">
              这里是 Earthworm 背后的学习原理……
            </div>
          </div>
        </div>
        <div class="w-1/2"></div>
        <div class="w-1/2"></div>
      </section>
      <section class="flex flex-col py-8">
        <div class="mx-auto max-w-screen-xl py-12 sm:px-6 lg:px-8 lg:py-16">
          <h2 class="text-center text-4xl font-bold tracking-tight sm:text-5xl">
            User feedback
          </h2>

          <div class="mt-8 [column-fill:_balance] sm:columns-2 sm:gap-6 lg:columns-3 lg:gap-8">
            <div v-for="(item, index) in CommentsList" :key='index' class="mb-8 sm:break-inside-avoid">
              <!-- Tips: Used for subsequent redirects to corresponding twitter pages -->
              <!-- <a :href="item.link" target="_blank"> -->
              <blockquote class="rounded-lg bg-gray-50 p-3 shadow-sm sm:p-3 hover:bg-gray-100 border cursor-pointer">
                <div class="flex items-center gap-4 justify-between">
                  <div class="flex items-center gap-4">
                    <img
                    alt=""
                    :src="item.avatar"
                    class="size-14 rounded-full object-cover"
                  />

                  <div>
                    <p class="mt-0.5 text-lg font-bold text-gray-900">{{item.nickname}}</p>
                    <p class="mt-0.5 text-gray-500 text-xs">@{{item.account}}</p>
                  </div>
                  </div>
                  <img width="30" :src="item.icon" class="self-start"/>
                </div>
                <p class="mt-4 text-gray-700">
                  {{ item.comment }}
                </p>
                <div class="flex items-center justify-between my-2">
                  <div class="text-gray-500 text-xs">{{ formatTimestamp({ timestamp: item.time }) }}</div>
                  <svg t="1710569875595" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1454" width="20"><path d="M512 170.666667C324.266667 170.666667 170.666667 324.266667 170.666667 512s153.6 341.333333 341.333333 341.333333 341.333333-153.6 341.333333-341.333333S699.733333 170.666667 512 170.666667z m0 640c-164.266667 0-298.666667-134.4-298.666667-298.666667s134.4-298.666667 298.666667-298.666667 298.666667 134.4 298.666667 298.666667-134.4 298.666667-298.666667 298.666667z" fill="#bfbfbf" p-id="1455"></path><path d="M512 448c-12.8 0-21.333333 8.533333-21.333333 21.333333v213.333334c0 10.666667 8.533333 21.333333 21.333333 21.333333s21.333333-8.533333 21.333333-21.333333V469.333333c0-10.666667-8.533333-21.333333-21.333333-21.333333zM512 320c-12.8 0-21.333333 10.666667-21.333333 21.333333v42.666667c0 12.8 8.533333 21.333333 21.333333 21.333333s21.333333-10.666667 21.333333-21.333333v-42.666667c0-12.8-8.533333-21.333333-21.333333-21.333333z" fill="#bfbfbf" p-id="1456"></path></svg>
                </div>
                <div class="border-t border-gray-200 mx-auto mb-2"></div>
                <div class="flex items-center justify-between flex-row">
                  <div class='flex items-center flex-shrink-0 justify-between'>
                    <svg t="1710570175625" class="icon" viewBox="0 0 1040 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2583" width="24" height="24"><path d="M520 288.192l-9.552-9.552-4-3.888c-73.28-69.088-188.432-67.488-259.808 3.888-72.848 72.848-72.848 190.96 0 263.808l262.048 262.048a16 16 0 0 0 22.624 0l262.048-262.048c72.848-72.848 72.848-190.96 0-263.808-72.848-72.848-190.96-72.848-263.808 0l-9.552 9.552z m-46.736 21.232l3.488 3.408 43.248 43.232 43.488-43.488a138.544 138.544 0 0 1 195.936 0l3.184 3.296a138.544 138.544 0 0 1-3.2 192.64L520 747.92 280.576 508.512a138.544 138.544 0 0 1 189.568-201.92l3.12 2.832z" fill="#bfbfbf" p-id="2584"></path></svg>
                    <span class="ml-1 text-gray-500 text-xs">{{ item.like_count }}</span>
                  </div>
                  <div class='flex items-center flex-shrink-0 justify-end ml-auto'>
                    <svg t="1710570345080" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3731" width="15" height="15"><path d="M486.4 563.2C331.1104 563.2 204.8 436.8896 204.8 281.6S331.1104 0 486.4 0 768 126.3104 768 281.6 641.6896 563.2 486.4 563.2z m0-512C359.3728 51.2 256 154.5728 256 281.6S359.3728 512 486.4 512 716.8 408.6272 716.8 281.6 613.4272 51.2 486.4 51.2zM896 1024h-819.2C34.4576 1024 0 989.5424 0 947.2c0-3.4816 0.7168-86.272 62.72-168.96 36.096-48.128 85.504-86.3744 146.8928-113.6128C284.5696 631.296 377.7024 614.4 486.4 614.4s201.8304 16.896 276.7872 50.2272c61.3888 27.2896 110.7968 65.4848 146.8928 113.6128C972.0832 860.928 972.8 943.7184 972.8 947.2c0 42.3424-34.4576 76.8-76.8 76.8z m-409.6-358.4c-178.5344 0-310.272 48.7936-380.9792 141.1072C52.4288 875.8784 51.2512 946.5856 51.2 947.3024a25.6 25.6 0 0 0 25.6 25.4976h819.2a25.6 25.6 0 0 0 25.6-25.6c0-0.6144-1.1776-71.3216-54.2208-140.4928C796.6208 714.3936 664.8832 665.6 486.4 665.6z" fill="#bfbfbf" p-id="3732"></path></svg>
                    <p class="ml-1 text-gray-500 text-xs overflow-hidden overflow-ellipsis whitespace-nowrap max-w-xs">See {{ item.account }}'s</p>
                  </div>
                </div>
              </blockquote>
              <!-- </a> -->
            </div>
          </div>
        </div>
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
import MessageBox from "~/components/main/MessageBox/MessageBox.vue";
import CommentsList from "~/assets/comments";
import { formatTimestamp, type Timestamp } from "~/utils/date";

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
