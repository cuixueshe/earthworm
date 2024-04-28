<template>
  <NuxtLink
    v-if="noteLink"
    class="tooltip z-50 flex cursor-pointer items-center fill-current text-xl hover:text-fuchsia-500"
    :data-tip="NOTE_TIP"
    :href="noteLink"
    target="_blank"
  >
    <span class="i-simple-icons-bilibili h-6 w-6 opacity-85"></span>
  </NuxtLink>
</template>

<script setup lang="ts">
import { computed, withDefaults } from "vue";

import { getCourseLink } from "~/utils/courseLinks";

const NOTE_TIP = "边学边练：星荣零基础学英语视频";
const props = withDefaults(
  defineProps<{
    courseOrder?: number;
  }>(),
  {
    courseOrder: 1,
  },
);

const noteLink = computed(() => getCourseLink(props.courseOrder - 1));
</script>
