<template>
  <div class="relative flex w-full flex-col">
    <h2 class="relative mb-4 border-b py-2 text-center text-3xl dark:border-gray-600">
      音乐课程
      <span
        class="btn btn-ghost absolute bottom-0 right-2 text-base"
        @click="showAdvicesDialog"
      >
        意见反馈
      </span>
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

  <MainMessageBox
    v-model:isShowModal="isShowModal"
    title="音乐模式意见收集"
    content=""
    confirmBtnText="提交"
    @confirm="submitAdvices"
  >
    <textarea
      v-model="adviceContent"
      class="textarea textarea-bordered min-h-36 w-full"
      placeholder="请输入你的意见"
    ></textarea>
  </MainMessageBox>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";

import { fetchMusics } from "~/api/music";
import { type Music } from "~/store/music";

const musicCourses = ref<Music[]>([]);
const { isShowModal, adviceContent, showAdvicesDialog, submitAdvices } = useMusicAdvice();

onMounted(async () => {
  musicCourses.value = await fetchMusics();
});

function useMusicAdvice() {
  const isShowModal = ref(false);
  const adviceContent = ref("");

  function showAdvicesDialog() {
    isShowModal.value = true;
  }
  function submitAdvices() {
    adviceContent.value = "";
  }
  return {
    isShowModal,
    adviceContent,
    showAdvicesDialog,
    submitAdvices,
  };
}
</script>
