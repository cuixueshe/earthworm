<template>
  <div class="card" :class="isActive || isChecked ? 'userAchievement' : 'deactivate'">
    <div
      class="flex items-center justify-center check-box"
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
      class="flex items-center justify-center rounded-sm active"
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
          alt="achievement"
          class="rounded-xl w-[110px] h-[110px] mb-5"
        />
      </figure>
      <div class="items-center justify-center text-center">
        <p class="mb-3">{{ name }}</p>
        <p
          class="text-xs"
          v-if="props.achievement.createdAt"
        >
          {{ createdAt }}
        </p>
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
  props.achievement.isChecked = !props.achievement.isChecked;
}
const isShowCheckBox = computed(() => props.isShowCheckBox);
const isActive = computed(() => props.achievement?.isActive);
const name = computed(() => props.achievement.name);
const createdAt = computed(
  () => "获得时间:" + props.achievement.createdAt?.split("T")[0]
);
const avatar = computed(() => props.achievement.avatar)
const description = computed(() => props.achievement.description);
const isChecked = computed(() => props.achievement.isChecked);
</script>

<style scoped>
.deactivate {
  @apply w-[170px] h-[220px] rounded-md relative justify-center text-gray-500 cursor-pointer border border-gray-700 hover:shadow-md hover:shadow-fuchsia-500
}
.userAchievement {
  @apply w-[170px] h-[220px] rounded-md relative justify-center text-fuchsia-500 cursor-pointer border border-fuchsia-500 hover:shadow-md hover:shadow-fuchsia-500
}
.active {
  @apply absolute right-0 top-0 w-[42px] h-4 bg-[#E879F9];
}
.check-box {
  @apply absolute left-0 top-0;
}
.active-label {
  @apply  flex top-0.5 left-1.5 text-left text-white text-[8px] font-medium tracking-normal leading-tight;
}
</style>
