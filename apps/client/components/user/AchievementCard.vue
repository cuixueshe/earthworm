<template>
  <div class="cursor-pointer card achievement">
    <div
      class="check-box"
      v-if="isShowCheckBox"
    >
      <input
        type="checkbox"
        class="rounded checkbox checkbox-xs [--chkbg:fuchsia]"
        @change="toggleChooseAchievement"
        v-model="isChecked"
      />
    </div>
    <div
      class="active"
      v-if="isActive"
    >
      <span class="active-label">使用中</span>
    </div>
    <div
      class="tooltip"
      :data-tip="description"
    >
      <figure>
        <img
          :src="avatar"
          alt="contributor"
          class="rounded-xl w-[110px] h-[110px] mb-5"
        />
      </figure>
      <div class="items-center justify-center text-center">
        <p class="mb-3 text-gray-500 active-name">{{ name }}</p>
        <p
          class="text-xs text-gray-500 active-name"
          v-if="createdAt"
        >
          获得时间: {{ createdAt }}
        </p>
        <!-- <p class="text-xs text-gray-500 active-name">暂未获得</p> -->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { AchievementItem } from "~/composables/user/achievement";

const props = withDefaults(
  defineProps<{
    achievement: AchievementItem;
    isShowCheckBox?: boolean;
  }>(),
  { isShowCheckBox: false }
);
function toggleChooseAchievement() {
  props.achievement.isChecked = !props.achievement.isChecked
}
const isShowCheckBox = computed(() => props.isShowCheckBox);
const isActive = computed(() => props.achievement?.isActive);
const name = computed(() => props.achievement.name);
const createdAt = computed(() => props.achievement.createdAt);
const avatar = computed(() => props.achievement.avatar);
const description = computed(() => props.achievement.description);
const isChecked = computed(() => props.achievement.isChecked);
</script>
<style scoped>
.achievement {
  position: relative;
  width: 170px;
  height: 220px;
  padding: 20px 30px 20px 30pxl;
  justify-content: center;
  border: 1px solid rgba(166, 166, 166, 1);
  box-shadow: 0px 8px 24px rgba(149, 157, 165, 0.2);
  border: 1px solid rgba(232, 121, 249, 1);
  @apply rounded-md hover:shadow-lg;
}
.active {
  position: absolute;
  right: 0;
  top: 0;
  width: 36px;
  height: 14px;
  opacity: 1;
  border-radius: 2px;
  background: rgba(232, 121, 249, 1);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2px 6px 2px 6px;
}
.check-box {
  position: absolute;
  left: 0;
  top: 0;
  opacity: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}
.active-label {
  font-size: 8px;
  font-weight: 500;
  letter-spacing: 0px;
  line-height: 9.68px;
  color: #fff;
  text-align: left;
  left: 6px;
  top: 2px;
  width: 24px;
  height: 10px;
  opacity: 1;
  display: flex;
}
.active-name {
  color: rgba(172, 51, 193, 1);
}
</style>
