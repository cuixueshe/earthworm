<template>
  <div>
    <dialog className="modal mt-[-8vh]" :open="shareModalVisible">
      <div ref="dialogBoxRef" className="modal-box max-w-[26rem] h-[40rem] flex flex-col items-center overflow-hidden">
        <div class="flex flex-col flex-1" ref="imageContainer">
          <img v-show="shareImageSrc" :src="shareImageSrc" alt="" width="400" height="600" class="rounded-md">
        </div> 
        <div className="modal-action">
          <button class="btn btn-primary" @click="copyAndClose">复制并关闭</button>
          <button class="btn" @click="hideShareModal">关闭</button>
        </div>
      </div>
    </dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useGenerateShareImage, useShareModal } from '~/composables/main/shareImage/share';

const imageContainer = ref<HTMLDivElement>()

const { shareModalVisible, hideShareModal } = useShareModal()
const { 
  generateImage,
  copyShareImage,
  // copyShareImageV2,
  shareImageSrc,
  clearShareImageSrc
}  = useGenerateShareImage()
watch(shareModalVisible, newVal => {
  if (newVal) {
    generateImage()
  } else {
    clearShareImageSrc()
  }
})

const copyAndClose = () => {
  copyShareImage()
  // copyShareImageV2(imageContainer.value!) 
  hideShareModal()
}

</script>