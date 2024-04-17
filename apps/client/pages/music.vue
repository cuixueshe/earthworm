<template>
  <div class="relative flex flex-col w-full">
    <h2
      class="py-2 mb-4 text-3xl text-center border-b dark:border-gray-600 relative"
    >
      音乐模式课程
      <span class="text-base absolute bottom-2 right-2">
        (仅供学习使用，如有侵权，请联系删除)
      </span>
    </h2>
    <div class="h-full scrollbar-hide">
      <div
        class="h-[79vh] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 pl-0 pr-4 pb-96 overflow-x-hidden overflow-y-auto gap-8 justify-start"
      >
        <template
          v-for="course in MUSIC_COURSES"
          :key="course.id"
        >
          <CoursesMusicCard
            :title="course.title"
            :id="course.id"
            :count="course.count"
            @click="handleChangeCourse(course)"
          />
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { navigateTo } from "nuxt/app";
import { MUSIC_COURSES, useMusicChapter } from "~/composables/courses/music";
import { type Course } from "~/store/course";

const { updateMusicChapter } = useMusicChapter();

function handleChangeCourse(course: Course) {
  updateMusicChapter(course.id);
  navigateTo({
    path: "/user/info",
    query: { displayComponent: "Setting" },
  });
}
</script>
