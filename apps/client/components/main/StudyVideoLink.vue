<template>
  <NuxtLink
    v-if="noteLink"
    target="_blank"
    class="flex cursor-pointer items-center fill-current text-xl hover:text-fuchsia-500"
    :href="noteLink"
    :data-tippy-content="NOTE_TIP"
    @mouseenter="$lazyTippy"
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
