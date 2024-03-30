<template>
  <section
    class="text-gray-600 body-font overflow-hidden"
    id="faq"
  >
    <CommonTitle
      title="Frequently Asked Questions"
      :description="[
        `If you can't find what you're looking for, please send an email to our team`,
        `we'll get back to you as soon as possible!`,
      ]"
    />
    <div class="divide-y divide-gray-500 space-y-4 py-16">
      <template
        v-for="(qs_item, qs_index) in QUESTIONS"
        :key="qs_index"
      >
        <details
          class="group"
          :open="qs_index === 0"
        >
          <summary
            class="flex justify-between items-center cursor-pointer py-5"
          >
            <h2 class="text-lg font-medium dark:text-white opacity-75">{{ qs_item.title }}</h2>
            <span class="icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </span>
          </summary>
          <div
            class="transition-max-height duration-500 ease-in-out overflow-hidden"
          >
            <template
              v-for="(as_item, as_index) in qs_item.content"
              :key="`content-${as_index}`"
            >
              <p class="py-2">
                <span v-if="qs_item.content.length > 1"
                  >{{ as_index + 1 }}.
                </span>
                {{ as_item }}
              </p>
            </template>
          </div>
        </details>
      </template>
    </div>
  </section>
</template>

<script setup lang="ts">
const QUESTIONS = [
  {
    title: "How to give priority to the latest version?",
    content: [
      "If you are our Pro user, use xxx-> xxx to update the API. Thank you.",
    ],
  },
  {
    title: "Will there be an one-to-one service if you buy the Pro version?",
    content: [
      "At present, for our Pro users, we have special customer service personnel to dock with you to help you solve all your problems. Thank you.",
      "At present, for our Pro users, we have special customer service personnel to dock",
    ],
  },
  {
    title: "How to give priority to the latest version?",
    content: [
      "If you are our Pro user, use xxx-> xxx to update the API. Thank you.",
    ],
  },
  {
    title: "Will there be an one-to-one service if you buy the Pro version?",
    content: [
      "At present, for our Pro users, we have special customer service personnel to dock with you to help you solve all your problems. Thank you.",
    ],
  },
];
</script>

<style scoped>
.icon svg {
  transition: transform 0.5s ease;
}

details[open] .icon svg {
  transform: rotate(90deg);
}

.transition-max-height {
  max-height: 0;
  transition: max-height 0.5s ease-in-out;
}

details[open] .transition-max-height {
  max-height: 500px;
}
</style>
