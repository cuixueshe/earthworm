<template>
  <div class="relative flex h-32 items-center justify-center">
    <div class="z-10 hidden items-center justify-center min-[780px]:flex">
      <button
        v-for="keybinding in keybindings"
        @click="keybinding.eventFn"
        class="btn btn-ghost"
      >
        <div class="flex items-center justify-center gap-2 text-center">
          <div
            v-for="keyStr in parseShortcutKeys(keybinding.keys)"
            class="kbd"
          >
            {{ keyStr }}
          </div>
        </div>
        <span>{{ keybinding.text }}</span>
      </button>
    </div>

    <MainPrevAndNextBtn />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from "vue";

import Message from "~/components/main/Message/useMessage";
import { useAnswerTip } from "~/composables/main/answerTip";
import { useCurrentStatementEnglishSound } from "~/composables/main/englishSound";
import { useGameMode } from "~/composables/main/game";
import { useSummary } from "~/composables/main/summary";
import { useShortcutKeyMode } from "~/composables/user/shortcutKey";
import { isAuthenticated } from "~/services/auth";
import { useCourseStore } from "~/store/course";
import { useMasteredElementsStore } from "~/store/masteredElements";
import { cancelShortcut, parseShortcutKeys, registerShortcut } from "~/utils/keyboardShortcuts";

const { shortcutKeys } = useShortcutKeyMode();
const { playSound } = usePlaySound(shortcutKeys.value.sound);
const { toggleGameMode } = useShowAnswer(shortcutKeys.value.answer);
const { handleMastered } = useMastered();

const answerTipText = computed(() => {
  let text = "";
  const { isAnswer } = useGameMode();
  const { isAnswerTip } = useAnswerTip();
  if (isAnswer()) {
    text = "再来一次";
  } else {
    if (isAnswerTip()) {
      text = "隐藏答案";
    } else {
      text = "显示答案";
    }
  }
  return text;
});

const spaceTipText = computed(() => {
  const { isAnswer } = useGameMode();
  if (isAnswer()) {
    return "下一题";
  } else {
    return "修复错误单词";
  }
});

const keybindings = computed(() => {
  return [
    {
      keys: shortcutKeys.value.sound,
      text: "播放发音",
      eventFn: playSound,
    },
    {
      keys: shortcutKeys.value.answer,
      text: answerTipText.value,
      eventFn: toggleGameMode,
    },
    {
      keys: "Space",
      text: spaceTipText.value,
      eventFn: null,
    },
    {
      keys: shortcutKeys.value.mastered,
      text: "掌握啦",
      eventFn: handleMastered,
    },
  ];
});

function useMastered() {
  const { shortcutKeys } = useShortcutKeyMode();
  const courseStore = useCourseStore();
  const masteredElements = useMasteredElementsStore();
  const { showSummary } = useSummary();

  const addLoading = ref(false);
  async function handleMastered() {
    if (!isAuthenticated()) {
      Message.warning("需要登录哦");
      return;
    }

    // updateMarketedStatements 会影响 isLastStatement 返回的结果
    // 所以我们提前调用 isLastStatement 来记录好值
    if (addLoading.value) return;
    const isLastStatement = courseStore.isLastStatement();
    addLoading.value = true;
    await masteredElements.addElement({
      english: courseStore.currentStatement?.english!,
    });
    addLoading.value = false;

    courseStore.updateMarketedStatements();

    if (isLastStatement) {
      showSummary();
    } else {
      // 看看消完之后 是否全部都没有了
      // 这个是在 updatemarketedStatements 之后
      // 处理的 case 比如只剩下2个 good ，那么消除一个 good 之后 那么列表就应该为0了
      if (courseStore.isAllMastered()) {
        showSummary();
        return;
      }
      courseStore.toNextStatement();
    }
  }

  onMounted(() => {
    registerShortcut(shortcutKeys.value.mastered, handleMastered);
  });

  onUnmounted(() => {
    cancelShortcut(shortcutKeys.value.mastered, handleMastered);
  });

  return {
    handleMastered,
  };
}

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
  const { showQuestion } = useGameMode();
  const { showAnswerTip, hiddenAnswerTip } = useAnswerTip();

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
    const { showModal } = useSummary();
    if (showModal.value) {
      // 结算面板不做切换处理
      return;
    }

    const { isAnswer } = useGameMode();
    const { isAnswerTip } = useAnswerTip();
    if (isAnswer()) {
      showQuestion();
    } else {
      if (isAnswerTip()) {
        hiddenAnswerTip();
      } else {
        showAnswerTip();
      }
    }
  }

  return {
    toggleGameMode,
  };
}
</script>
