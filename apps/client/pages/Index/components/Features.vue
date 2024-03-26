<template>
  <div
    class="w-full flex-col mt-16"
    id="features"
  >
    <CommonTitle
      title="Dive into powerful features"
      :description="[
        'Take your tab management to the next level with these powerful features',
      ]"
    />
    <section class="text-gray-500">
      <div
        class="grid grid-cols-1 gap-8 md:mt-8 md:grid-cols-2 md:gap-12 lg:grid-cols-3"
      >
        <template
          v-for="(fe_item, fe_index) in FEATURES"
          :key="fe_index"
        >
          <div class="flex items-start gap-4">
            <span class="shrink-0 rounded-lg bg-white p-4 dark:bg-gray-800">
              <svg
                class="h-5 w-5"
                fill="none"
                :stroke="isDarkMode ? 'white' : 'currentColor'"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 14l9-5-9-5-9 5 9 5z"></path>
                <path
                  d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                ></path>
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                ></path>
              </svg>
            </span>

            <div>
              <h2 class="text-lg font-bold dark:text-white">{{
                fe_item.title
              }}</h2>

              <p class="mt-1 text-sm text-gray-500 dark:text-white opacity-90">
                {{ fe_item.desc }}
              </p>
            </div>
          </div>
        </template>
      </div>
    </section>
  </div>
  <CommonDivider />
</template>

<script setup lang="ts">
import { computed } from "vue";
import { Theme, useDarkMode } from "~/composables/darkMode";
const { darkMode } = useDarkMode();
const isDarkMode = computed(() => darkMode.value === Theme.DARK);

const FEATURES = [
  {
    icon: "",
    title: "Lorem, ipsum dolor.",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Error cumque tempore est ab possimus quisquam reiciendis tempora animi! Quaerat, saepe?",
  },
  {
    icon: "",
    title: "Lorem, ipsum dolor.",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Error cumque tempore est ab possimus quisquam reiciendis tempora animi! Quaerat, saepe?",
  },
  {
    icon: "",
    title: "Lorem, ipsum dolor.",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Error cumque tempore est ab possimus quisquam reiciendis tempora animi! Quaerat, saepe?",
  },
  {
    icon: "",
    title: "Lorem, ipsum dolor.",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Error cumque tempore est ab possimus quisquam reiciendis tempora animi! Quaerat, saepe?",
  },
  {
    icon: "",
    title: "Lorem, ipsum dolor.",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Error cumque tempore est ab possimus quisquam reiciendis tempora animi! Quaerat, saepe?",
  },
  {
    icon: "",
    title: "Lorem, ipsum dolor.",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Error cumque tempore est ab possimus quisquam reiciendis tempora animi! Quaerat, saepe?",
  },
];
</script>

<style scoped></style>
