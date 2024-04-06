<template>
  <div
    class="card achievement-container rounded-md bg-gray-100 dark:bg-gray-900 hover:shadow-slate-700"
    :class="
      isActive
        ? 'border-pink-500 border'
        : 'dark:border-yellow-50 border-gray-500 border'
    "
    @click="handleToggleCheckStatus"
  >
    <div
      class="flex items-center justify-center check-box"
      v-if="isShowCheckBox"
    >
      <input
        type="checkbox"
        class="rounded checkbox checkbox-xs [--chkbg:fuchsia]"
        v-model="isChecked"
      />
    </div>
    <div
      class="flex items-center justify-center rounded-md active"
      v-if="isActive"
    >
      <span class="active-label">使用中</span>
    </div>
    <div
      class="tooltip"
      :data-tip="description"
    >
      <figure>
        <!-- 图片先写死，只提供一个贡献成就的图片 -->
        <img
          :src="`/contributor.png`"
          alt="achievement"
          class="rounded-xl w-[110px] h-[110px] mb-5"
        />
      </figure>
      <div
        class="items-center justify-center text-center"
        :class="isActive ? 'text-pink-500 ' : 'dark:text-yellow-50 text-black '"
      >
        <p class="mb-3">
          {{ name }}
        </p>
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
function handleToggleCheckStatus() {
  if (!isShowCheckBox.value) return;
  props.achievement.isChecked = !props.achievement.isChecked;
}
const isShowCheckBox = computed(() => props.isShowCheckBox);
const isActive = computed(() => props.achievement?.isActive);
const name = computed(() => props.achievement.name);
const createdAt = computed(
  () => "获得时间:" + props.achievement.createdAt?.split("T")[0]
);
const achievementImg = computed(() => props.achievement.achievementImg);
const description = computed(() => props.achievement.description);
const isChecked = computed(() => props.achievement.isChecked);
</script>

<style scoped>
.achievement-container {
  position: relative;
  width: 170px;
  height: 220px;
  padding: 20px 30px 20px 30pxl;
  justify-content: center;
}
.active {
  @apply absolute right-0 top-0 w-[42px] h-4 bg-[#E879F9];
}
.check-box {
  @apply absolute left-0 top-0;
}
.active-label {
  @apply flex top-0.5 left-1.5 text-left text-white text-[8px] font-medium tracking-normal leading-tight;
}
</style>
