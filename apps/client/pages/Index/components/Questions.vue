<template>
  <section
    class="text-gray-600 body-font overflow-hidden pt-24"
    id="faq"
  >
    <CommonTitle
      title="常见问题解答"
      :description="[
        `如果您找不到所需的内容，请发送电子邮件给我们的团队`,
        `我们会尽快回复您！`,
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
            <h2 class="text-lg font-medium dark:text-white opacity-75">
              {{ qs_item.title }}
            </h2>
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
    title: "如果我忘记了账户密码，该如何恢复或重置密码？",
    content: [
      `如果您忘记了账户密码，可以在登录页面点击“忘记密码”链接，并按照密码重置流程的指示操作。`,
    ],
  },
  {
    title: "如何更新我的个人资料或账户信息？",
    content: [
      "要更新您的个人资料或账户信息，您可以登录到您的账户，并导航至个人设置页面，在那里您可以更新您的信息并保存更改。",
    ],
  },
  {
    title: "如果我在使用应用时遇到问题，需要技术支持，该怎么办？",
    content: [
      "如果您在使用应用时遇到问题，需要技术支持，可以联系我们的技术支持团队。您可以在应用的帮助中心或联系页面找到相关的联系信息。",
    ],
  },
  {
    title: "我应该如何向开发团队报告我在应用中遇到的错误或漏洞？",
    content: [
      "如果您在应用中发现了错误或漏洞，可以通过我们的官方网站或应用的反馈渠道向开发团队报告问题，提供详细的描述和重现问题的步骤。",
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
