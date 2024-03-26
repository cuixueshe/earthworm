<template>
  <section
    class="text-gray-600 body-font overflow-hidden"
    id="faq"
  >
    <CommonTitle
      title="Frequently Asked Questions"
      :description="[
        'If you can not find what you are looking for, email our support team and if you are lucky someone will get back to you.',
      ]"
    />
    <div class="flex flex-wrap -m-4 mt-10 py-10 px-5">
      <div class="-my-8 divide-y divide-gray-800 w-full">
        <template
          v-for="(qs_item, qs_index) in QUESTIONS"
          :key="qs_index"
        >
          <details
            class="group py-8 [&_summary::-webkit-details-marker]:hidden"
            :open="qs_index === 0"
          >
            <summary class="flex cursor-pointer items-center justify-between">
              <h2 class="text-lg font-medium">{{ qs_item.title }}</h2>

              <span class="relative size-5 shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="absolute inset-0 size-5 opacity-100 group-open:opacity-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="absolute inset-0 size-5 opacity-0 group-open:opacity-100"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </span>
            </summary>

            <template
              v-for="(as_item, as_index) in qs_item.content"
              :key="as_index"
            >
              <div>
                <span v-if="qs_item.content && qs_item.content.length > 1"
                  >{{ as_index + 1 }}.
                </span>
                <span>{{ as_item }}</span>
              </div>
            </template>
          </details>
        </template>
      </div>
    </div>
  </section>
  <CommonDivider />
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

<style scoped></style>
