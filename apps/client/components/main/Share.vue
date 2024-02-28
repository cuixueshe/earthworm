<template>
  <div>
    <dialog className="modal mt-[-8vh]" :open="shareModalVisible">
      <div className="modal-box max-w-[26rem] h-[40rem] flex flex-col items-center">
        <div class="flex flex-col flex-1">
          <!-- <div class="w-[22rem] h-[32rem]">
            <div class="w-full h-full bg-[#EEA2A4] rounded-md px-8 pt-8 flex flex-col items-center font-sans">
              <div class="bg-white rounded-xl flex-1 w-full flex flex-col px-2 py-4 mb-2 shadow-xl">
                <div class="text-6xl font-bold flex">"</div> 
                <span class="text-slate-400 font-bold text-md">Course 7</span>
                <div class="flex-1 flex flex-col font-bold text-slate-600 text-lg leading-loose italic font-serif">
                  <div>
                    {{ enSentence }}
                  </div>
                  <div>
                    {{ zhSentence }}
                  </div>
                </div>
                <div class="text-6xl font-bold flex justify-end">"</div>
              </div>
              <img src="/logo.png" width="48" height="48" alt="Earthworm logo" >
              <p class="text-sm mb-2">© earthworm.cuixueshe.com</p>
            </div> 
          </div> -->
          <img :src="shareImageSrc" alt="" width="400" height="600" class="rounded-md">
          <div class="gallery">
          </div>
        </div> 
        <div className="modal-action">
          <!-- <button class="btn" @click="saveImage">保存</button> -->
          <button class="btn" @click="copyImage">复制</button>
          <!-- <button class="btn" @click="copyImageAndNextCourse">复制并下一课</button> -->
        </div>
      </div>
    </dialog>
  </div>
</template>

<script setup lang="ts">
import { useGenerateShareImage, useShareModal } from '~/composables/main/shareImage/share';

const { shareModalVisible } = useShareModal()
const { generateImage, copyImage, shareImageSrc }  = useGenerateShareImage()

generateImage()

</script>