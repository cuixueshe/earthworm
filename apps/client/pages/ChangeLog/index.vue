<template>
  <section class="body-font w-full overflow-hidden text-gray-600">
    <div class="container mx-auto px-5 py-24">
      <div class="-my-8 divide-y-2 divide-gray-100 dark:divide-gray-800">
        <template
          v-for="(log_item, log_index) in ChangeLogs"
          :key="log_index"
        >
          <div class="flex flex-nowrap py-8">
            <div class="mb-6 flex flex-shrink-0 flex-col md:mb-0 md:w-52">
              <span
                class="flex w-fit items-center justify-center rounded-md bg-[#fee8d2] px-2.5 py-1"
              >
                <span class="text-xs text-black">{{ log_item.version }}</span>
              </span>
              <span class="ml-1 mt-1 text-xs text-gray-500">{{ log_item.time }}</span>
            </div>
            <div class="flex flex-col">
              <template
                v-for="(fn_item, fn_index) in log_item.fns"
                :key="fn_index"
              >
                <div class="mb-8 md:flex-grow">
                  <h2
                    class="title-font mb-2 text-2xl font-semibold text-gray-900 dark:text-white dark:opacity-75"
                  >
                    {{ fn_item.title_ch }}
                  </h2>
                  <template
                    v-for="(dc_item, dc_index) in fn_item.lists"
                    :key="dc_index"
                  >
                    <div class="ml-6 leading-relaxed dark:text-white dark:opacity-75">
                      <div>
                        <span class="mr-1">{{ dc_index + 1 }}.</span>
                        <span> {{ dc_item.title_ch }}</span>
                        <span
                          class="ml-4 cursor-pointer text-blue-400"
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
                          <span>- {{ c_item && c_item.title_ch }}</span>
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
