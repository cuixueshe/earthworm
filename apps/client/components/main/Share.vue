<template>
  <div>
    <dialog className="modal mt-[-8vh]" :open="shareModalVisible">
      <div
        ref="dialogBoxRef"
        className="modal-box w-[27rem] flex flex-col items-center overflow-hidden"
      >
        <div
          :class="{ skeleton: !shareImageSrc }"
          class="flex flex-col w-[24rem] h-[32rem]"
          ref="imageContainer"
        >
          <img
            v-show="shareImageSrc"
            :src="shareImageSrc"
            alt=""
            width="400"
            height="600"
            class="rounded-md"
          />
        </div>
        <div class="gallery flex w-full py-2">
          <div
            :class="{
              '!border-primary': currImageIndex === index,
              skeleton: !imgItem.src,
            }"
            class="border-2 border-transparent gallery-item w-12 h-18 cursor-pointer rounded-sm overflow-hidden mr-2"
            @click="handleSelectImage(index)"
            v-for="(imgItem, index) in galleryImgs"
            :key="imgItem.src"
          >
            <img
              v-show="!!imgItem.src"
              :src="imgItem.src"
              :alt="`Card ${index}`"
            />
          </div>
        </div>
        <div className="modal-action">
          <button class="btn btn-primary" @click="copyAndClose">
            复制并关闭
          </button>
          <button class="btn" @click="hideShareModal">关闭</button>
        </div>
      </div>
    </dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { convertTitleToNumber } from "~/composables/main/shareImage/convert";
import {
  useGenerateShareImage,
  useShareModal,
} from "~/composables/main/shareImage/share";
import { useCourseStore } from "~/store/course";
import { useUserStore } from "~/store/user";
import { getToday } from "~/utils/date";
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
    console.log(userStore.user);
    const username = userStore.user?.username || "";
    const convertedTitle = convertTitleToNumber(
      courseStore.currentCourse.title
    );
    const { year, month, day } = getToday();
    generateGalleryImage(convertedTitle, username, `${year}/${month}/${day}`);
  } else {
    clearShareImageSrc();
  }
});

const copyAndClose = () => {
  copyShareImage(currImageIndex.value);
  hideShareModal();
};
</script>
