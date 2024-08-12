<template>
  <section class="flex flex-col pt-24">
    <div class="mx-auto max-w-screen-xl">
      <CommonTitle
        title="用户反馈"
        :description="['如果您正在使用 Earthworm ，请随时在 Twitter 上向我们提供您的反馈!']"
      />
      <div class="mt-8 sm:columns-2 sm:gap-6 lg:columns-3 lg:gap-8">
        <div
          v-for="(item, index) in CommentsList"
          :key="index"
          class="mb-8 sm:break-inside-avoid"
        >
          <blockquote
            class="cursor-pointer overflow-hidden rounded-lg bg-white shadow-lg transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/50 dark:bg-[#111128] dark:hover:shadow-blue-400/50"
          >
            <div class="flex h-full flex-col justify-between p-6">
              <div class="flex items-center gap-4">
                <img
                  :src="item.avatar"
                  alt=""
                  class="h-12 w-12 rounded-full border-2 border-purple-400 object-cover p-1 lg:h-14 lg:w-14"
                />
                <div class="flex-grow">
                  <p class="mt-0.5 text-lg font-bold dark:text-white">
                    {{ item.nickname }}
                  </p>
                  <p class="text-xs text-gray-500">
                    {{ "@" + item.account }}
                  </p>
                </div>
                <UIcon
                  name="i-simple-icons-twitter"
                  class="h-6 w-6 self-start text-[#03a9f4]"
                ></UIcon>
              </div>
              <p class="mt-4 text-sm text-gray-700 dark:text-gray-300 lg:text-base">
                {{ item.chinese }}
              </p>
              <div class="my-2 flex items-center justify-between">
                <div class="text-xs text-gray-500">
                  {{ formatTimestamp({ timestamp: item.time }) }}
                </div>
              </div>
              <div class="mx-auto my-4"></div>
              <div class="mt-4 flex items-center justify-between text-xs">
                <div class="flex items-center">
                  <UIcon
                    name="i-ph-heart-straight-fill"
                    class="mr-2 h-5 w-5 fill-current text-pink-300 dark:text-blue-300"
                  ></UIcon>
                  <span class="text-gray-500 dark:text-gray-400">{{ item.likeCount }} likes</span>
                </div>
                <a
                  :href="item.link"
                  class="text-blue-500 dark:text-blue-400"
                  tabindex="-1"
                  aria-disabled="true"
                  style="pointer-events: none"
                  >See {{ item.account }}'s</a
                >
              </div>
            </div>
          </blockquote>
        </div>
      </div>
    </div>
  </section>
  <CommonDivider />
</template>

<script setup lang="ts">
import CommentsList from "~/assets/comments.json";
import { formatTimestamp } from "~/utils/date";
</script>

<style scoped></style>
