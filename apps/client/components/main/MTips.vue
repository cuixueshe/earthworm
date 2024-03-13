<template>
  <div class="absolute left-0 right-0 bottom-[16vh] flex flex-col items-center">
    <div class="w-[210px] mb-4 leading-7 pl-9" v-show="!isAnswer()">
      <svg class="inline-block ml-1 cursor-pointer w-7 h-7 icon" viewBox="0 0 1024 1024" version="1.1"
        xmlns="http://www.w3.org/2000/svg" @click="playSound">
        <path
          d="M342.4 384H128v256h214.4L576 826.8V197.2L342.4 384zM64 320h256L640 64v896L320 704H64V320z m640 256h256v-64H704v64z m16.8 159.5l181 181 45.3-45.3-181-181-45.3 45.3z m33.9-343.9l181-181-45.3-45.3-181 181 45.3 45.3z"
          fill="#666666"></path>
      </svg>
      <span class="ml-2">play sound</span>
    </div>
    <div class="w-[210px] mb-4 leading-7":class="[isAnswer() ? 'text-center' : 'pl-9']">
      <svg class="inline-block ml-1 cursor-pointer w-7 h-7 icon" viewBox="0 0 1024 1024" version="1.1"
        xmlns="http://www.w3.org/2000/svg" v-show="isAnswer()" @click="toggleGameMode"><path d="M1024.278337 247.301984h-58.729003c-23.10193 44.255504-51.909758 84.753466-85.866812 121.07638-47.734711 51.074749-103.262843 91.294373-165.192715 119.40636-64.017396 28.946996-132.20984 43.698831-202.350639 43.698831s-138.333243-14.751835-202.350639-43.698831c-61.929872-28.111987-117.458005-68.192444-165.192715-119.40636-33.957054-36.322914-62.625714-76.820875-85.866812-121.07638H0c31.312857 67.357434 73.898342 127.756456 125.112259 178.135363l-97.556945 124.416418 39.80212 35.76624 97.417777-124.416417c38.827942 31.86953 81.552596 58.450666 127.478119 78.908399l-51.909758 152.389236 48.848056 19.066051L341.101386 559.178038c46.064691 15.447676 94.77358 24.771949 145.013319 27.137809V748.725197h52.048926V586.455015c50.378907-2.505029 98.809459-11.829301 145.013319-27.137809L734.94754 711.706442l48.848057-19.066051-51.77059-152.389236c45.786355-20.457733 88.650177-47.038869 127.478119-78.908399l97.417776 124.416418 39.802121-35.766241-97.417777-124.416418c51.074749-50.518076 93.660234-110.917097 124.973091-178.274531z m0 0" fill="#666666" p-id="1684"></path></svg>
      <svg class="inline-block ml-1 cursor-pointer w-7 h-7 icon" viewBox="0 0 1024 1024" version="1.1"
        xmlns="http://www.w3.org/2000/svg" v-show="!isAnswer()" @click="toggleGameMode"><path d="M893.013677 422.341647L1024 266.366318l-42.014481-35.286672L851.2738 386.78037c-35.561276-28.146956-75.790829-54.508984-119.590239-76.065433L799.098954 125.494234l-51.625637-18.810405-66.179673 181.788147C636.533119 271.4465 589.026549 259.913113 539.597747 256.755162V70.024135h-54.92089v186.731027c-49.703406 3.020649-97.48458 14.004827-142.245106 30.481094l-65.905068-180.552427-51.625637 18.810405 66.728882 183.16117c-44.485921 21.144543-85.264682 47.369268-121.237866 75.241619L42.014481 231.079646 0 266.366318l128.240279 152.95468c-75.790829 68.925717-121.649772 141.421293-121.649772 177.119871 0 79.360687 226.136766 340.50952 505.272191 340.50952s505.272191-274.741754 505.272191-340.50952c0.137302-30.069187-46.820059-103.251274-124.121212-174.099222z m68.651112 174.099222c-2.746045 8.100831-12.3572 27.872352-35.973183 58.490748-26.773934 34.600161-62.609815 70.847949-100.779833 101.878252-46.133548 37.483508-94.738536 67.278091-144.30464 88.559935-56.843121 24.439796-113.686243 36.796997-168.744435 36.796997-56.431215 0-114.372754-12.219898-172.039689-36.38509-50.664521-21.144543-99.681416-50.664521-145.540359-87.59882-38.719228-31.167605-73.868597-67.278091-99.406812-101.466345C70.024135 623.352105 62.609815 602.756771 61.648699 596.578171c0.961116-6.1786 8.512738-26.636632 33.227139-60.138375 25.538214-34.325556 60.824886-70.29874 99.406812-101.466345 45.858943-37.071601 94.875838-66.59158 145.540359-87.59882 57.666935-24.02789 115.608474-36.38509 172.039689-36.38509 55.195495 0 111.901314 12.3572 168.744435 36.796997 49.703406 21.281845 98.171091 51.076428 144.30464 88.559936 38.170019 31.030303 73.868597 67.278091 100.779833 101.878251 23.615983 30.20649 33.227139 50.115312 35.973183 58.216144z m-324.445159-95.150443v-102.564762c-35.973183-23.341378-79.086082-36.934299-125.21963-36.934299-127.416466 0-230.667739 103.251274-230.667739 230.667739s103.251274 230.667739 230.667739 230.66774 230.667739-103.251274 230.667739-230.66774c0-32.403325-6.727809-63.159024-18.810405-91.168678h-86.637704z m-0.961116 215.427193c-33.227139 33.227139-77.301153 51.488335-124.258514 51.488334s-91.031376-18.261196-124.258514-51.488334c-33.227139-33.227139-51.488335-77.301153-51.488335-124.258515s18.261196-91.031376 51.488335-124.258514c33.227139-33.227139 77.301153-51.488335 124.258514-51.488335 24.439796 0 48.193081 5.080182 70.29874 14.554036v124.945026h101.740949c2.47144 11.807991 3.70716 23.890587 3.70716 36.247787 0 46.820059-18.261196 91.031376-51.488335 124.258515z m0 0" fill="#666666" p-id="1819"></path></svg>
      <span class="ml-2">{{ toggleTipText }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useGameMode } from "~/composables/main/game";
import { registerShortcut, cancelShortcut } from "~/utils/keyboardShortcuts";
import { useCurrentStatementEnglishSound } from "~/composables/main/englishSound";
import { useSummary } from "~/composables/main/summary";
import { onMounted, computed, onUnmounted } from "vue";
import { useShortcutKeyMode } from '~/composables/user/shortcutKey';

const { isAnswer } = useGameMode();
const { shortcutKeys } = useShortcutKeyMode()
const { playSound } = usePlaySound(shortcutKeys.value.sound);
const { toggleGameMode } = useShowAnswer(shortcutKeys.value.answer);

const toggleTipText = computed(() => {
  return isAnswer() ? "again" : "show answer";
});


function usePlaySound(key: string) {
  const { playSound } = useCurrentStatementEnglishSound();

  onMounted(() => {
    registerShortcut(key, playSoundCommand);
  });

  onUnmounted(() => {
    cancelShortcut(key, playSoundCommand);
  });

  function playSoundCommand(e: KeyboardEvent) {
    e.preventDefault();
    playSound();
  }

  return {
    playSound,
  };
}

function useShowAnswer(key: string) {
  const { showAnswer, showQuestion } = useGameMode();

  onMounted(() => {
    registerShortcut(key, handleShowAnswer);
  });

  onUnmounted(() => {
    cancelShortcut(key, handleShowAnswer);
  });

  function handleShowAnswer(e: KeyboardEvent) {
    e.preventDefault();
    toggleGameMode();
  }

  function toggleGameMode() {
    // NOTE: registerShortcut 事件会记住注册时的面板状态，所以这里要重新获取下面板信息
    const { isAnswer } = useGameMode();
    const { showModal } = useSummary();
    if (showModal.value) {
      // 结算面板不做切换处理
      return;
    }
    if (isAnswer()) {
      showQuestion();
    } else {
      showAnswer();
    }
  }

  return {
    toggleGameMode,
  };
}
</script>

<style scoped>
.tip-btn {
  @apply btn btn-xs text-gray-500 bg-gray-100 hover:text-gray-100 hover:bg-gray-500 dark:text-white dark:bg-gray-500 dark:hover:text-white dark:hover:bg-fuchsia-500;
}

.icon {
    transition: transform 100ms cubic-bezier(0, 0, 0.58, 1);
}

.icon:active {
    transform: scale(.9);
}
</style>
