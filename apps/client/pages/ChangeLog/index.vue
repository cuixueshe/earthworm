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
                <span class="text-xs text-black">{{ log_item.version }}</span>
              </span>
              <span class="mt-1 text-gray-500 text-xs ml-1">{{
                log_item.time
              }}</span>
            </div>
            <div class="flex flex-col">
              <template
                v-for="(fn_item, fn_index) in log_item.fns"
                :key="fn_index"
              >
                <div class="md:flex-grow mb-8">
                  <h2
                    class="text-2xl text-gray-900 title-font mb-2 font-semibold dark:text-white dark:opacity-75"
                    >{{ fn_item.title }}
                  </h2>
                  <template
                    v-for="(dc_item, dc_index) in fn_item.lists"
                    :key="dc_index"
                  >
                    <div
                      class="leading-relaxed ml-6 dark:text-white dark:opacity-75"
                    >
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
                      <template
                        v-for="(c_item, c_index) in dc_item.desc"
                        :key="c_index"
                      >
                        <div class="ml-3">
                          <span>- {{ c_item }}</span>
                        </div>
                      </template>
                    </div>
                  </template>
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
</script>

<style scoped></style>
