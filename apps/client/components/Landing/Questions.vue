<template>
  <section
    class="body-font overflow-hidden pt-24 text-gray-600"
    id="faq"
  >
    <CommonTitle
      title="Câu hỏi thường gặp"
      :description="[
        `Nếu bạn không tìm thấy thông tin cần, hãy tham gia nhóm Telegram`,
        `Chúng tôi sẽ phản hồi sớm nhất có thể!`,
      ]"
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
    title: "Làm thế nào để đề xuất thêm tính năng cho đội ngũ phát triển?",
    content: [
      "Bạn có thể tham gia nhóm Telegram chính thức, mô tả chi tiết tính năng bạn muốn và vấn đề mà tính năng đó giải quyết",
      "Hoặc bạn cũng có thể gửi yêu cầu tính năng tại github/issues",
    ],
  },
  {
    title: "Làm thế nào để báo cáo lỗi hoặc vấn đề trong ứng dụng?",
    content: [
      "Nếu bạn phát hiện lỗi trong ứng dụng, hãy tham gia nhóm Telegram chính thức, cung cấp mô tả chi tiết và các bước tái hiện vấn đề, tốt nhất là kèm theo một video ngắn 🤪",
    ],
  },
  {
    title: "Làm thế nào để đóng góp mã cho Earthworm?",
    content: [
      "Chúng tôi có hướng dẫn đóng góp mã hoàn chỉnh, hãy đọc trước nhé (có liên kết ở chân trang)",
      "Tham khảo github/issues, hoặc tạo issue dựa trên vấn đề bạn gặp phải và tự thử sửa chữa",
    ],
  },
  {
    title: "Earthworm có hoàn toàn miễn phí không?",
    content: [
      "Không hoàn toàn miễn phí, vì để phát triển lâu dài thì thu phí là điều tất yếu. Tương lai sẽ áp dụng mô hình đăng ký, cung cấp thêm nội dung và tính năng cho thành viên",
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
