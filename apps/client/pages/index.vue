<template>
  <div class="container w-full font-customFont">
    <template v-if="isLoading">
      <Loading></Loading>
    </template>
    <template v-else>
      <NoticeBar v-if="showNoticeBar" />
      <section
        class="text-gray-500 pt-28"
        id="home"
      >
        <div class="mx-auto text-center my-5">
          <h2
            class="text-4xl md:text-5xl lg:text-5xl xl:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-gray-200 dark:from-purple-600 dark:to-gray-100"
          >
            让你上瘾的英语学习工具
          </h2>

          <div class="mt-5">
            <p
              class="pt-2 text-center dark:text-gray-300 text-gray-500 lg:text-xl"
            >
              使用<span class="dark:text-white text-black"> 连词成句 </span
              >、<span class="dark:text-white text-black"> i + 1 </span>、<span
                class="dark:text-white text-black"
              >
                以终为始 </span
              >等学习理论来帮助你习得英语
            </p>
            <p
              class="pt-2 text-center dark:text-gray-300 text-gray-500 lg:text-xl"
            >
              通过不断的<span class="dark:text-white text-black"> 重复 </span
              >形成肌肉记忆
            </p>
            <p
              class="pt-2 text-center dark:text-gray-300 text-gray-500 lg:text-xl"
            >
              最重要的是<span class="dark:text-white text-black"> 游戏化 </span
              >的形式让学习英语从此不再痛苦
            </p>
          </div>
        </div>
        <div
          class="my-10 flex flex-wrap justify-center gap-4 font-customFont items-center"
        >
          <button
            @click="handleKeydown"
            class="btn"
            type="button"
          >
            <strong>开启Earthworm</strong>
            <div id="container-stars">
              <div id="stars"></div>
            </div>

            <div id="glow">
              <div class="circle"></div>
              <div class="circle"></div>
            </div>
          </button>
          <div class="dark:text-white ml-8">把英语练起来！！！</div>
        </div>

        <div class="w-full flex justify-center mt-20">
          <img
            alt=""
            src="~/assets/home-page-preview.png"
            class="w-3/4"
          />
        </div>

        <CommonDivider />
      </section>
      <Features />
      <!-- <Introduce /> -->
      <Comments />
      <!-- <PayCard /> -->
      <Questions />
      <Contact />
    </template>
    <CommonBackTop class="sticky flex justify-end ml-auto sm:block bottom-28" />
    <MessageBox
      v-model:is-show-modal="showMobileTip"
      title="友情提示"
      content="目前暂不支持移动设备哦，请关注后续更新~"
      cancel-btn-text="好哒"
      confirm-btn-text=""
    ></MessageBox>
  </div>
</template>

<script setup>
import Comments from "~/components/home/Comments.vue";
import Contact from "~/components/home/Contact.vue";
import Features from "~/components/home/Features.vue";
import NoticeBar from "~/components/home/NoticeBar.vue";
import Questions from "~/components/home/Questions.vue";
const showNoticeBar = ref(false);

import { onMounted, onUnmounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useGameStore } from "~/store/game";
import { cancelShortcut, registerShortcut } from "~/utils/keyboardShortcuts";

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

<style scoped>
.btn {
  display: flex;
  justify-content: center;
  align-items: center;
  width: fit-content;
  overflow: hidden;
  height: 3rem;
  background-size: 300% 300%;
  backdrop-filter: blur(1rem);
  border-radius: 5rem;
  transition: 0.5s;
  animation: gradient_301 5s ease infinite;
  border: double 4px transparent;
  background-image: linear-gradient(#05051d, #05051d),
    linear-gradient(
      137.48deg,
      #ffdb3b 10%,
      #fe53bb 45%,
      #8f51ea 67%,
      #0044ff 87%
    );
  background-origin: border-box;
  background-clip: content-box, border-box;
}

#container-stars {
  position: absolute;
  z-index: -1;
  width: 100%;
  height: 100%;
  overflow: hidden;
  transition: 0.5s;
  backdrop-filter: blur(1rem);
  border-radius: 5rem;
  background-color: #05051d;
}

strong {
  z-index: 2;
  font-family: "Avalors Personal Use";
  font-size: 15px;
  letter-spacing: 5px;
  color: #ffffff;
  /* text-shadow: 0 0 4px white; */
}

#glow {
  position: absolute;
  display: flex;
  width: 12rem;
}

.circle {
  width: 100%;
  height: 30px;
  filter: blur(2rem);
  animation: pulse_3011 4s infinite;
  z-index: -1;
}

.circle:nth-of-type(1) {
  background: rgba(254, 83, 186, 0.636);
}

.circle:nth-of-type(2) {
  background: rgba(142, 81, 234, 0.704);
}

.btn:hover #container-stars {
  z-index: 1;
  background-color: #05051d;
}

.btn:hover {
  transform: scale(1.1);
}

.btn:active {
  border: double 4px #fe53bb;
  background-origin: border-box;
  background-clip: content-box, border-box;
  animation: none;
}

.btn:active .circle {
  background: #fe53bb;
}

#stars {
  position: relative;
  background: transparent;
  width: 200rem;
  height: 200rem;
}

#stars::after {
  content: "";
  position: absolute;
  top: -10rem;
  left: -100rem;
  width: 100%;
  height: 100%;
  animation: animStarRotate 90s linear infinite;
}

#stars::after {
  background-image: radial-gradient(#ffffff 1px, transparent 1%);
  background-size: 50px 50px;
}

#stars::before {
  content: "";
  position: absolute;
  top: 0;
  left: -50%;
  width: 170%;
  height: 500%;
  animation: animStar 60s linear infinite;
}

#stars::before {
  background-image: radial-gradient(#ffffff 1px, transparent 1%);
  background-size: 50px 50px;
  opacity: 0.5;
}

@keyframes animStar {
  from {
    transform: translateY(0);
  }

  to {
    transform: translateY(-135rem);
  }
}

@keyframes animStarRotate {
  from {
    transform: rotate(360deg);
  }

  to {
    transform: rotate(0);
  }
}

@keyframes gradient_301 {
  0% {
    background-position: 0% 50%;
  }

  50% {
    background-position: 100% 50%;
  }

  100% {
    background-position: 0% 50%;
  }
}

@keyframes pulse_3011 {
  0% {
    transform: scale(0.75);
    box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.7);
  }

  70% {
    transform: scale(1);
    box-shadow: 0 0 0 10px rgba(0, 0, 0, 0);
  }

  100% {
    transform: scale(0.75);
    box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
  }
}
</style>
