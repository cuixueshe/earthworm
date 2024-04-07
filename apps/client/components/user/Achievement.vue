<template>
  <div class="flex flex-wrap gap-5">
    <AchievementCard
      v-for="achievement in userAchievementList"
      :key="achievement.id"
      :achievement="achievement"
      @click="handleSetAchievementActive(achievement)"
    />
    <div
      v-if="userAchievementList.length === 0"
      class="w-full text-center"
    >
      暂无成就，快去获取吧！
    </div>
  </div>
  <dialog
    id="achievement-modal"
    class="modal"
    :open="isShowModal"
  >
    <div class="modal-box">
      <h3 class="text-lg font-bold">提示</h3>
      <p class="py-4">要将"{{ userAchievement.name }}"设为当前使用吗？</p>
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
          @click="handleChangeAchievementActive"
        >
          确定
        </button>
      </div>
    </div>
  </dialog>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import AchievementCard from "~/components/user/AchievementCard.vue";
import { useAchievement } from "~/composables/user/achievement";

const {
  isShowModal,
  userAchievementList,
  userAchievement,
  handleHideModal,
  handleChangeAchievementActive,
  handleSetAchievementActive,
  initUserAchievementList,
} = useAchievement();

onMounted(() => {
  initUserAchievementList();
});
</script>
