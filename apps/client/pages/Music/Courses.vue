<template>
  <div class="relative flex w-full flex-col">
    <h2 class="relative mb-4 border-b py-2 text-center text-3xl dark:border-gray-600">
      音乐课程
      <span class="btn btn-ghost absolute bottom-0 right-2 text-base"> 意见反馈 </span>
    </h2>
    <div class="scrollbar-hide h-full">
      <div
        class="grid h-[79vh] grid-cols-1 justify-start gap-8 overflow-y-auto overflow-x-hidden pb-96 pl-0 pr-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      >
        <template
          v-for="course in musicCourses"
          :key="course.id"
        >
          <NuxtLink :href="`/music/${course.id}`">
            <MusicCourseCard
              :title="course.title"
              :id="course.id"
            />
          </NuxtLink>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";

import { fetchMusics } from "~/api/music";
import { type Music } from "~/store/music";

// import { music_courses } from "~/store/music";

const musicCourses = ref<Music[]>([]);
onMounted(async () => {
  musicCourses.value = await fetchMusics();
});
</script>
