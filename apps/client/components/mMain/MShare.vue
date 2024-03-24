<template>
  <div>
    <dialog className="modal w-full pd" :open="shareModalVisible">
      <div ref="dialogBoxRef" className="modal-box w-[90vw] flex flex-col items-center overflow-hidden">
        <div class="flex flex-col mb-2 w-full" ref="imageContainer" >
          <img v-show="shareImageSrc" :src="shareImageSrc" alt="" width="400" height="600" class="rounded-md">
          <div v-show="!shareImageSrc" class="bg-red-600/[.1] skeleton rounded-md w-full min-h-[27rem]"></div>
        </div>
        <div class="gallery flex w-full py-2">
          <div :class="{'!border-primary': currImageIndex === index, 'skeleton': !imgItem.src}" class="border-2 border-transparent gallery-item w-12 cursor-pointer rounded-sm overflow-hidden mr-2" @click="handleSelectImage(index)" v-for="(imgItem, index) in galleryImgs" :key="imgItem.src">
            <img v-if="!!imgItem.src" :src="imgItem.src" :alt="`Card ${index}`" />
            <div v-else-if="index == '0'" class="bg-red-600/[.1] min-h-[3.6rem] w-12"></div>
          </div>
        </div>
        <div className="modal-action w-full">
          <button class="btn btn-primary">长按图片保存或分享</button>
          <button class="btn" @click="hideShareModal">关闭</button>
        </div>
      </div>
    </dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useGenerateShareImage, useShareModal } from '~/composables/main/shareImage/share';
import { convertTitleToNumber } from '~/composables/main/shareImage/convert'
import { useCourseStore } from '~/store/course';
import { useUserStore } from '~/store/user';
import { getToday } from '~/utils/date';
const courseStore = useCourseStore();
const userStore = useUserStore();
const imageContainer = ref<HTMLDivElement>()

const { shareModalVisible, hideShareModal } = useShareModal()
const {
  generateGalleryImage,
  shareImageSrc,
  galleryImgs,
  clearShareImageSrc,
  handleSelectImage,
  currImageIndex
} = useGenerateShareImage()
watch(shareModalVisible, newVal => {

  if (newVal && courseStore.currentCourse?.title) {
    console.log(userStore.user);
    const username = userStore.user?.username || ''
    const convertedTitle = convertTitleToNumber(courseStore.currentCourse.title);
    const { year, month, day } = getToday()
    generateGalleryImage(convertedTitle, username, `${year}/${month}/${day}`)
  } else {
    clearShareImageSrc()
  }
})
</script>
