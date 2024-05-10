<template>
  <div>
    <dialog
      class="modal mt-[-8vh]"
      :open="shareModalVisible"
    >
      <div
        ref="dialogBoxRef"
        class="modal-box flex w-[27rem] flex-col items-center overflow-hidden"
      >
        <div class="flex">
          <div class="gallery mr-2 py-2">
            <div
              v-for="(imgItem, index) in galleryImgs"
              :key="imgItem.src"
              :class="[
                'gallery-item h-18 mb-2 mr-2 w-14 cursor-pointer overflow-hidden rounded-sm border-2 border-transparent',
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
              />
            </div>
          </div>
          <div
            :class="['h-[27rem] w-[19rem]', { skeleton: !shareImageSrc }]"
            ref="imageContainer"
          >
            <img
              v-show="shareImageSrc"
              :src="shareImageSrc"
              alt="Selected Share Image"
              width="400"
              height="600"
              class="rounded-md"
            />
          </div>
        </div>
        <div class="modal-action">
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
      </div>
    </dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";

import { courseTimer } from "~/composables/courses/courseTimer";
import { convertTitleToNumber } from "~/composables/main/shareImage/convert";
import { useGenerateShareImage, useShareModal } from "~/composables/main/shareImage/share";
import { useCourseStore } from "~/store/course";
import { useUserStore } from "~/store/user";
import { formatSecondsToTime, getToday } from "~/utils/date";

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
    const username = userStore.userInfo?.username || "";
    const convertedTitle = convertTitleToNumber(courseStore.currentCourse.title);
    const { year, month, day } = getToday();
    const totalRecordNumber = courseTimer.totalRecordNumber();
    const totalTime = formatSecondsToTime(courseTimer.calculateTotalTime());
    generateGalleryImage(
      convertedTitle,
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
