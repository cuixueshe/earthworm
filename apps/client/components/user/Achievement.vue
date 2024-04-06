<template>
  <div class="flex flex-wrap gap-5">
    <AchievementCard
      v-for="achievement in userHaveAchievement"
      :key="achievement.id"
      :achievement="achievement"
      @click="handleSetAchievementActive(achievement)"
    />
  </div>
  <dialog
    id="achievement-modal"
    class="modal"
    :open="isShowModal"
  >
    <div class="modal-box">
      <h3 class="text-lg font-bold">提示</h3>
      <p class="py-4">要将"{{ name }}"设为当前使用吗？</p>
      <div class="modal-action">
        <form method="dialog">
          <button
            class="btn"
            @click="handleHideModal"
          >
            取消
          </button>
        </form>
        <button
          class="btn btn-primary"
          @click="handleConfirm"
        >
          确定
        </button>
      </div>
    </div>
  </dialog>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import AchievementCard from "~/components/user/AchievementCard.vue";
import {
  useAchievementList,
  type AchievementItem,
} from "~/composables/user/achievement";

const {
  userHaveAchievement,
  setAchievementActive,
  getUserHaveAchievement,
  isShowModal,
  UserID,
  handleShowModal,
  handleHideModal,
} = useAchievementList();
const name = ref("");
function handleSetAchievementActive(achievement: AchievementItem) {
  handleShowModal();
  name.value = achievement.name;
  achievementID.value = achievement.id;
}
const achievementID = ref(0);
function handleConfirm() {
  setAchievementActive({
    userID: UserID(),
    achievementID: achievementID.value,
  });
  handleHideModal();
}
onMounted(() => {
  getUserHaveAchievement({ userID: UserID() });
});
</script>
