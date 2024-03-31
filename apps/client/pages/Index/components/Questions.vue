<template>
  <section
    class="text-gray-600 body-font overflow-hidden pt-24"
    id="faq"
  >
    <CommonTitle
      title="Frequently Asked Questions"
      :description="[
        `If you can't find what you're looking for, please send an email to our team`,
        `we'll get back to you as soon as possible!`,
      ]"
    />
    <div class="divide-y divide-gray-800 space-y-4 py-16">
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
  <CommonDivider />
</template>

<script setup lang="ts">
const QUESTIONS = [
  {
    title: "How can I recover or reset my account password if I forget it?",
    content: [
      `If you forget your account password, you can click on the "Forgot password" link on the login page and follow the instructions for the password reset process.`,
    ],
  },
  {
    title: "How can I update my personal profile or account information?",
    content: [
      "To update your personal profile or account information, you can log in to your account and navigate to the personal settings page where you can update your information and save the changes.",
    ],
  },
  {
    title: "What should I do if I encounter issues while using the application and need technical support?",
    content: [
      "If you encounter issues while using the application and need technical support, you can contact our technical support team. You can find the relevant contact information in the application's help center or contact page.",
    ],
  },
  {
    title: "How should I report an error or bug I encountered in the app to the development team?",
    content: [
      "If you come across an error or bug in the app, you can report the issue to the development team through our official website or the app's feedback channel, providing detailed descriptions and steps to reproduce the problem. ",
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
