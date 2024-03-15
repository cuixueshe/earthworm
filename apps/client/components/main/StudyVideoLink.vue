<template>
  <NuxtLink
    v-if="noteLink"
    class="tooltip text-xl cursor-pointer fill-current hover:text-[#d946ef]"
    :data-tip="NOTE_TIP"
    :href="noteLink"
    target="_blank"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
    >
      <path
        d="M7.172 2.757L10.414 6h3.171l3.243-3.242a1 1 0 1 1 1.415 1.415L16.414 6H18.5A3.5 3.5 0 0 1 22 9.5v8a3.5 3.5 0 0 1-3.5 3.5h-13A3.5 3.5 0 0 1 2 17.5v-8A3.5 3.5 0 0 1 5.5 6h2.085L5.757 4.171a1 1 0 0 1 1.415-1.415M18.5 8h-13a1.5 1.5 0 0 0-1.493 1.356L4 9.5v8a1.5 1.5 0 0 0 1.356 1.493L5.5 19h13a1.5 1.5 0 0 0 1.493-1.355L20 17.5v-8A1.5 1.5 0 0 0 18.5 8M8 11a1 1 0 0 1 1 1v2a1 1 0 1 1-2 0v-2a1 1 0 0 1 1-1m8 0a1 1 0 0 1 1 1v2a1 1 0 1 1-2 0v-2a1 1 0 0 1 1-1"
      />
    </svg>
  </NuxtLink>
</template>

<script setup lang="ts">
import { computed, defineProps, withDefaults } from "vue";
import { getCourseLink } from "~/utils/courseLinks";

const NOTE_TIP = "边学边练：点击跳转至星荣英语笔记";
const props = withDefaults(
  defineProps<{
    courseId?: number;
  }>(),
  {
    courseId: 1,
  }
);

const noteLink = computed(() => getCourseLink(props.courseId - 1));
</script>
