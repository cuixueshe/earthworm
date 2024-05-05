<template>
  <CommonModal :show-modal="authRequireModalState">
    <div className="modal-box">
      <h3 className="font-bold text-lg mb-4">✨ 友情提示</h3>
      <p class="py-4 text-center text-xl">注册以进行下一课的学习哦~ 😊</p>
      <div className="modal-action">
        <button
          class="btn"
          @click="hideAuthRequireModal"
        >
          取消
        </button>
        <button
          class="btn"
          @click="handleSignup"
        >
          去注册
        </button>
      </div>
    </div>
  </CommonModal>
</template>

<script setup lang="ts">
import { useAuthRequire } from "~/composables/main/authRequire";
import { useGameMode } from "~/composables/main/game";
import { signIn } from "~/services/auth";
import { useCourseStore } from "~/store/course";

const { authRequireModalState, hideAuthRequireModal } = useAuthRequire();
const { showQuestion } = useGameMode();
const courseStore = useCourseStore();

function handleSignup() {
  hideAuthRequireModal();
  courseStore.resetStatementIndex();
  showQuestion();
  signIn();
}
</script>
