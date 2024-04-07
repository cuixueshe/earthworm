<template>
  <section class="flex flex-col pt-24 px-10 xl:px-0">
    <div class="mx-auto max-w-screen-xl">
      <CommonTitle
        title="用户反馈"
        :description="[
          '如果您正在使用 Earthworm ，请随时在 Twitter 上向我们提供您的反馈!',
        ]"
      />
      <div class="mt-8 sm:columns-2 sm:gap-6 lg:columns-3 lg:gap-8">
        <div
          v-for="(item, index) in CommentsList"
          :key="index"
          class="mb-8 sm:break-inside-avoid"
        >
          <blockquote
            class="rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl bg-white dark:bg-[#111128] cursor-pointer hover:shadow-purple-500/50 dark:hover:shadow-blue-400/50"
          >
            <div class="flex flex-col justify-between h-full p-6">
              <div class="flex items-center gap-4">
                <img
                  :src="item.avatar"
                  alt=""
                  class="w-9 h-9 md:h-14 md:w-14 rounded-full object-cover border-2 border-purple-400 p-1"
                />
                <div class="flex-grow">
                  <p
                    class="mt-0.5 font-bold dark:text-white text-md md:text-lg"
                  >
                    {{ item.nickname }}
                  </p>
                  <p class="text-gray-500 text-xs md:text-sm">
                    {{ "@" + item.account }}
                  </p>
                </div>
                <img
                  :src="item.icon"
                  class="self-start w-6 md:w-8"
                />
              </div>
              <p
                class="mt-4 text-gray-700 dark:text-gray-300 text-sm md:text-lg"
              >
                {{ item.chinese }}
              </p>
              <div class="flex items-center justify-between my-2">
                <div class="text-gray-500 text-xs md:text-sm">
                  {{ formatTimestamp({ timestamp: item.time }) }}
                </div>
              </div>
              <div class="mx-auto my-1 md:my-4"></div>
              <div class="flex items-center justify-between mt-2 md:mt-4">
                <div class="flex items-center">
                  <svg
                    class="w-4 h-4 md:w-5 md:h-5 mr-2 fill-current text-pink-300 dark:text-blue-300"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                    />
                  </svg>
                  <span
                    class="text-gray-500 dark:text-gray-400 text-xs md:text-sm"
                    >{{ item.likeCount }} likes</span
                  >
                </div>
                <a
                  :href="item.link"
                  class="text-blue-500 dark:text-blue-400 text-xs md:text-sm"
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
