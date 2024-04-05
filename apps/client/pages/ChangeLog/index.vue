<template>
  <section class="text-gray-600 body-font overflow-hidden w-full">
    <div class="container px-5 py-24 mx-auto">
      <div class="-my-8 divide-y-2 divide-gray-100 dark:divide-gray-800">
        <template
          v-for="(log_item, log_index) in ChangeLogs"
          :key="log_index"
        >
          <div class="py-8 flex flex-nowrap">
            <div class="md:w-52 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
              <span
                class="w-fit flex items-center justify-center rounded-md bg-[#fee8d2] px-2.5 py-1"
              >
                <span class="text-xs text-black">{{
                  log_item.version
                }}</span>
              </span>
              <span class="mt-1 text-gray-500 text-xs">{{
                log_item.time
              }}</span>
            </div>
            <div class="flex flex-col">
              <template
                v-for="(fn_item, fn_index) in log_item.fns"
                :key="fn_index"
              >
                <div class="md:flex-grow mb-8">
                  <h2 class="text-2xl text-gray-900 title-font mb-2 font-semibold dark:text-white dark:opacity-75"
                    >{{ fn_item.title }}
                  </h2>
                  <template
                    v-for="(dc_item, dc_index) in fn_item.lists"
                    :key="dc_index"
                  >
                    <div class="leading-relaxed ml-6 dark:text-white dark:opacity-75">
                      <div>
                        <span class="mr-1">{{ dc_index + 1 }}.</span>
                        <span> {{ dc_item.title }}</span>
                        <span
                          class="ml-4 text-blue-400 cursor-pointer"
                          v-if="dc_item.author"
                          :href="dc_item.link"
                          >@{{ dc_item.author }}</span
                        >
                      </div>
                      <!-- <div class="w-full flex justify-center items-center" v-if='dc_item.url'>
                        <img v-if="getFileType(dc_item.url) === 'image'" :src="dc_item.url" class="max-w-96"/>
                        <video v-else control src="https://www.bilibili.com/video/BV1UJ4m1L7VF/?share_source=copy_web&vd_source=d42554f47179de3a2556b0e175436937"></video>
                      </div> -->
                      <template
                        v-for="(c_item, c_index) in dc_item.desc"
                        :key="c_index"
                      >
                        <div class="ml-3">
                          <span>- {{ c_item }}</span>
                          <!-- <a
                            class="ml-4 text-blue-400 cursor-pointer"
                            v-if="dc_item.author"
                            :href="dc_item.link"
                            >@{{ dc_item.author }}</a
                          > -->
                        </div>
                      </template>
                    </div>
                  </template>
                  <!-- <a class="text-indigo-500 inline-flex items-center mt-4"
                  >Learn More
                  <svg
                    class="w-4 h-4 ml-2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M5 12h14"></path>
                    <path d="M12 5l7 7-7 7"></path>
                  </svg>
                </a> -->
                </div>
              </template>
            </div>
          </div>
        </template>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import ChangeLogs from "~/assets/changeLogs.json";

// const LOGS = [
//   {
//     version: "V1.0.1",
//     time: "2024.4.1",
//     fns: [
//       {
//         title: "News",
//         prefix_icon: "🎁",
//         lists: [
//           {
//             title: "Leader board Added Week/Month/Total",
//             desc: [],
//             url: "https://s1.locimg.com/2024/04/02/be7f8897c0a8b.png", // img / video
//             link: "", // branch / commit / pr  link
//             author: "author1",
//           },
//           {
//             title: "Optimize the way answers are displayed",
//             desc: [
//               "Change the overall answer display length",
//               "Answer three times automatically pop up the answer tip page",
//             ],
//             url: "", // img / video
//             link: "",
//             author: "author1",
//           },
//         ],
//       },
//       {
//         title: "Fixes",
//         prefix_icon: "🐞",
//         lists: [
//           {
//             title: "Adapt to the style of the small screen (ipad)",
//             desc: [],
//             url: "https://s1.locimg.com/2024/04/02/be7f8897c0a8b.png", // img / video
//             author: "author1",
//             link: "",
//           },
//         ],
//       },
//       {
//         title: "Refactor",
//         prefix_icon: "♻️",
//         lists: [
//           {
//             title: "Refactoring to get next lesson logic",
//             desc: [],
//             url: "", // img / video
//             author: "author1",
//             link: "",
//           },
//         ],
//       },
//     ],
//   },
//   {
//     version: "V1.0.1",
//     time: "2024.4.1",
//     fns: [
//       {
//         title: "News",
//         prefix_icon: "🎁",
//         lists: [
//           {
//             title: "Leader board Added Week/Month/Total",
//             desc: [],
//             url: "https://s1.locimg.com/2024/04/02/be7f8897c0a8b.png", // img / video
//             link: "", // branch / commit / pr  link
//             author: "author1",
//           },
//           {
//             title: "Optimize the way answers are displayed",
//             desc: [
//               "Change the overall answer display length",
//               "Answer three times automatically pop up the answer tip page",
//             ],
//             url: "", // img / video
//             link: "",
//             author: "author1",
//           },
//         ],
//       },
//       {
//         title: "Fixes",
//         prefix_icon: "🐞",
//         lists: [
//           {
//             title: "Adapt to the style of the small screen (ipad)",
//             desc: [],
//             url: "https://s1.locimg.com/2024/04/02/be7f8897c0a8b.png", // img / video
//             author: "author1",
//             link: "",
//           },
//         ],
//       },
//       {
//         title: "Refactor",
//         prefix_icon: "♻️",
//         lists: [
//           {
//             title: "Refactoring to get next lesson logic",
//             desc: [],
//             url: "", // img / video
//             author: "author1",
//             link: "",
//           },
//         ],
//       },
//     ],
//   },
// ];

// const getFileType = url => {
//   if (!url) return;

//   let isPrefix = url.indexOf("imageView2"); // 七牛云 rules
//   const IMAGE_TYPES = [".png", ".jpg", ".jpeg", ".gif", "webp"];
//   const VIDEO_TYPES = [".mp4", ".mov", ".avi", ".3gp", ".m3u8"];

//   if (VIDEO_TYPES.some(type => url.endsWith(type))) {
//     return "video";
//   } else if (isPrefix > 0 || IMAGE_TYPES.some(type => url.endsWith(type))) {
//     return "image";
//   }
// };
</script>

<style scoped></style>
