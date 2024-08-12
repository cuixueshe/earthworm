<template>
  <section
    class="body-font overflow-hidden pt-24 text-gray-600"
    id="faq"
  >
    <CommonTitle
      title="常见问题解答"
      :description="[`如果您找不到所需的内容，请加入 Telegram 群组`, `我们会尽快回复您！`]"
    />
    <div class="divide-y divide-gray-100 py-16 dark:divide-gray-800">
      <template
        v-for="(qsItem, qsIndex) in QUESTIONS"
        :key="qsIndex"
      >
        <details
          class="group"
          :open="qsIndex === 0"
        >
          <summary class="flex cursor-pointer items-center justify-between py-5">
            <h2 class="text-base font-medium text-black dark:text-gray-300 lg:text-lg">
              {{ qsItem.title }}
            </h2>
            <UIcon
              name="i-ph-caret-right-bold"
              class="icon h-6 w-6"
            ></UIcon>
          </summary>
          <div
            class="transition-max-height mb-4 overflow-hidden duration-500 ease-in-out dark:text-gray-500"
          >
            <template
              v-for="(asItem, asIndex) in qsItem.content"
              :key="`content-${asIndex}`"
            >
              <p class="py-2 text-sm lg:text-base">
                <span v-if="qsItem.content.length > 1">{{ asIndex + 1 }}. </span>
                {{ asItem }}
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
    title: "如何向开发团队提出更多的功能需求？",
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
    title: "如何为 Earthworm 贡献代码？",
    content: [
      "我们提供了完整的贡献代码指南，可以先读一读(页脚处有链接)",
      "去 github/issues 逛一逛， 也可以基于你在使用中遇到的问题提一个 issue 并且自己尝试修复",
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
.icon {
  transition: transform 0.5s ease;
}

details[open] .icon {
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
