<template>
  <UModal
    v-model="shareModalVisible"
    prevent-close
  >
    <UCard
      :ui="{ base: 'w-full sm:w-[400px] md:w-[448px] lg:w-[496px] flex flex-col items-center' }"
    >
      <div class="flex flex-col sm:flex-row">
        <div class="gallery mr-2 flex py-2 sm:flex-col">
          <div
            v-for="(imgItem, index) in galleryImgs"
            :key="imgItem.src"
            :class="[
              'gallery-item sm:h-18 sm:w-18 mb-2 mr-2 h-14 w-14 cursor-pointer overflow-hidden rounded-sm border-2 border-transparent',
              {
                '!border-primary': currImageIndex === index,
                skeleton: !imgItem.src,
              },
            ]"
            @click="handleSelectImage(index)"
          >
            <img
              v-show="imgItem.src"
              :src="imgItem.src"
              :alt="`Card ${index}`"
              class="h-full w-full object-cover"
            />
          </div>
        </div>
        <div
          :class="['mt-4 flex-1 sm:mt-0', { skeleton: !shareImageSrc }]"
          ref="imageContainer"
        >
          <img
            v-show="shareImageSrc"
            :src="shareImageSrc"
            alt="Selected Share Image"
            class="h-auto max-h-[600px] w-full rounded-md"
          />
        </div>
      </div>
      <template #footer>
        <div class="mt-4 space-x-4">
          <button
            class="btn btn-primary"
            @click="copyAndClose"
          >
            复制并关闭
          </button>
          <button
            class="btn"
            @click="hideShareModal"
          >
            关闭
          </button>
        </div>
      </template>
    </UCard>
  </UModal>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";

import { courseTimer } from "~/composables/courses/courseTimer";
import { useGenerateShareImage, useShareModal } from "~/composables/main/shareImage/share";
import { useCourseStore } from "~/store/course";
import { useCoursePackStore } from "~/store/coursePack";
import { useUserStore } from "~/store/user";
import { formatSecondsToTime, getToday } from "~/utils/date";

const coursePackStore = useCoursePackStore();
const courseStore = useCourseStore();
const userStore = useUserStore();
const imageContainer = ref<HTMLDivElement>();

const { shareModalVisible, hideShareModal } = useShareModal();
const {
  generateGalleryImage,
  copyShareImage,
  shareImageSrc,
  galleryImgs,
  clearShareImageSrc,
  handleSelectImage,
  currImageIndex,
} = useGenerateShareImage();

watch(shareModalVisible, (newVal) => {
  if (newVal && courseStore.currentCourse?.title) {
    const username = userStore.user?.username || "";
    const { year, month, day } = getToday();
    const coursePackTitle = coursePackStore.currentCoursePack?.title || "";
    const totalRecordNumber = courseTimer.totalRecordNumber();
    const totalTime = formatSecondsToTime(courseTimer.calculateTotalTime());
    generateGalleryImage(
      coursePackTitle,
      courseStore.currentCourse.title,
      username,
      `${year}/${month}/${day}`,
      totalRecordNumber,
      totalTime,
    );
  } else {
    clearShareImageSrc();
  }
});

const copyAndClose = () => {
  copyShareImage(currImageIndex.value);
  hideShareModal();
};
</script>
