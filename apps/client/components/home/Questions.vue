<template>
  <section
    class="text-gray-600 body-font overflow-hidden pt-24 px-10 xl:px-0"
    id="faq"
  >
    <CommonTitle
      title="常见问题解答"
      :description="[
        `如果您找不到所需的内容，请加入 Telegram 群组`,
        `我们会尽快回复您！`,
      ]"
    />
    <div class="divide-y divide-gray-200 dark:divide-gray-800 space-y-4 py-16">
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
            <div class="text-md font-medium dark:text-white  md:text-lg">
              {{ qs_item.title }}
            </div>
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
              <p class="py-2 text-xs md:text-sm">
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
    title: "如何向开发团队提出更多的功能需求",
    content: [
      "可以加入我们官方 Telegram 群组, 详细的描述您想要的功能以及告知这个功能想要解决的问题是什么",
      "也可以去 github/issues 来提交您想要的功能需求",
    ],
  },
  {
    title: "如何向开发团队报告我在应用中遇到的错误或漏洞？",
    content: [
      "如果您在应用中发现了错误或漏洞，可以加入我们官方 Telegram 群组，提供详细的描述和重现问题的步骤，当然最好提供一个小视频 🤪",
    ],
  },
  {
    title: "如何为 Earthworm 贡献代码",
    content: [
      "我们提供了完整的贡献代码指南，可以先读一读(页脚处有链接)",
      "去 github/issues 逛一逛， 也可以基于你在使用中遇到的问题提一个 issue 并且自己尝试修复",
    ],
  },
  {
    title: "如果我忘记了账户密码，该如何恢复或重置密码？",
    content: [
      `加入 Telegram 群组，联系阿崔，告诉阿崔你的帐号`,
      `暂时没有修改密码的功能, 只能注销帐号然后重新注册`,
    ],
  },
  {
    title: "Earthworm 项目是完全免费的吗？",
    content: [
      "不完全免费，因为想要长久发展收费是必然的。未来会采用订阅模式，为会员提供更多的学习内容和功能",
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
