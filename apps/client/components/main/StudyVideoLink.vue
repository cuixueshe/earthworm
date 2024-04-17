<template>
  <NuxtLink
    v-if="noteLink"
    class="tooltip z-50 flex cursor-pointer items-center fill-current text-xl hover:text-[#d946ef]"
    :data-tip="NOTE_TIP"
    :href="noteLink"
    target="_blank"
  >
    <i class="i-simple-icons-bilibili h-5 w-5"></i>
  </NuxtLink>
</template>

<script setup lang="ts">
import { computed, withDefaults } from "vue";

import { getCourseLink } from "~/utils/courseLinks";

const NOTE_TIP = "边学边练：看星荣零基础学英语视频";
const props = withDefaults(
  defineProps<{
    courseId?: number;
  }>(),
  {
    courseId: 1,
  },
);

const noteLink = computed(() => getCourseLink(props.courseId - 1));
</script>
