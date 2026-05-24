<template>
  <div
    class="mt-16 w-full flex-col"
    id="what"
  >
    <CommonTitle
      title="What is Earthworm?"
      :description="['An open-source, collaborative, user-friendly English learning tool.']"
    />
    <section class="flex w-full justify-around py-8">
      <div
        class="flex h-[360px] w-[45%] flex-shrink-0 items-center justify-center rounded-2xl border border-gray-700 bg-[#111128]"
      >
        <div
          class="hide-scrollbar h-[96%] w-[97%] overflow-y-auto overflow-x-hidden rounded-xl border border-gray-700 bg-[#17172e] px-5 py-4"
        >
          <h2 class="mb-3 rounded-lg bg-[#232339] py-4 text-center text-xl font-bold">
            Bắt đầu nhanh
          </h2>
          <h3 class="pb-2 text-base font-semibold">Trang hiện tại</h3>
          <p class="py-1">
            Nhấn nút
            <span
              class="mx-1 inline-block rounded-lg border border-solid border-fuchsia-300 px-1 text-fuchsia-300"
              >Bắt đầu</span
            >
            <span class="text-gray-500">(hoặc phím tắt Enter ⏎)</span>
            để bắt đầu bài học đầu tiên!
          </p>
          <h3 class="py-2 text-base font-semibold">Trang làm bài</h3>
          <p class="py-1 leading-7">
            Khi thấy
            <span class="text-fuchsia-500">gạch dưới màu tím</span>
            sáng lên, nhập từ, nhấn phím cách
            <span class="text-gray-500">(Space ␣)</span>
            để chuyển sang từ tiếp theo, sau khi nhập xong nhấn Enter
            <span class="text-gray-500">(Enter ⏎)</span>
            để gửi câu trả lời
          </p>
          <p class="py-1 leading-7">
            Sau khi gửi, nếu có từ hiển thị
            <span class="text-red-500">màu đỏ</span>
            và gạch dưới, tức là từ đó có lỗi cần sửa. Lúc này nhấn phím cách
            <span class="text-gray-500">(Space ␣)</span>
            để nhảy đến từ sai đầu tiên và xóa, sau khi sửa xong nhấn cách tiếp để đến từ sai tiếp
            theo
          </p>
          <p class="py-1 leading-7">
            Nếu phát hiện từ sai trước chưa sửa đúng, nhấn phím Backspace
            <span class="text-gray-500">(Backspace ⌫)</span>
            để quay lại từ sai trước đó, cho đến khi tất cả từ sai được sửa xong, nhấn Enter để gửi
          </p>
          <p class="py-1 leading-7">
            Sau khi xác minh đúng, trang đáp án sẽ hiển thị, đồng thời phát âm câu tương ứng để hỗ
            trợ ghi nhớ.
          </p>
          <h3 class="py-2 text-base font-semibold">Mẹo làm bài</h3>
          <p class="py-1 leading-7">
            Nút ở bảng gợi ý phía dưới
            <a
              class="ml-1 text-[#3498db] hover:text-theme-dark"
              href="https://www.bilibili.com/video/BV1py421q7Mp/"
            >
              👉 Nhấn vào đây để tìm hiểu nhanh trong 1 phút</a
            >
          </p>
          <p class="p-1">
            <button class="instruction-btn">⌃ Ctrl+'</button>
            <span class="text-gray-500">(hoặc phím tắt Ctrl+')</span>
            Phát âm câu hỏi
          </p>
          <p class="p-1">
            <button class="instruction-btn">⌃ Ctrl+;</button>
            <span class="text-gray-500">(hoặc phím tắt Ctrl+;)</span>
            Hiển thị đáp án
          </p>
          <h3 class="py-2 text-base font-semibold">Trang đáp án</h3>
          <p class="py-1 leading-7">Các nút bên dưới đáp án</p>
          <p class="py-1">
            <button class="instruction-btn">again</button>
            <span class="text-gray-500">(hoặc phím tắt Ctrl+;)</span>
            Làm lại, chắc chắn sẽ thuộc!
          </p>
          <p class="py-1">
            <button class="instruction-btn">next</button>
            <span class="text-gray-500">(hoặc phím tắt Enter)</span>
            Câu tiếp theo, tiến lên nhé! 🏄‍♂️
          </p>

          <h2 class="py-4 text-xl font-bold">Trợ giúp</h2>
          <h3 class="pb-2 text-base font-semibold">Trang khóa học</h3>
          <p class="py-1 leading-7">
            Khi gạch dưới toàn màu xám, không có
            <span class="text-fuchsia-500">màu tím</span>
            sáng lên thì không thể nhập, bạn cần di chuột và nhấn vào ô nhập để focus nhé~
          </p>
          <h3 class="py-2 text-base font-semibold">Trang cài đặt người dùng</h3>
          <p class="py-1 leading-7">
            Nhấn vào biểu tượng góc phải trên vào User Info chuyển sang trang cài đặt, tùy chỉnh
            phím tắt yêu thích, điều khiển phát âm tự động, độ dài gạch dưới cố định, dùng phím cách
            để gửi... nhiều cài đặt cá nhân hơn sẽ được cập nhật liên tục 😊
            <i
              class="mx-2 inline h-8 w-1 animate-wink bg-slate-900 p-[2px] text-sm dark:bg-white"
            ></i>
          </p>
        </div>
      </div>
      <div
        class="flex h-[360px] w-[45%] flex-shrink-0 items-center justify-center rounded-2xl border border-gray-700 bg-[#111128]"
      >
        <div
          class="hide-scrollbar h-[96%] w-[97%] overflow-y-auto overflow-x-hidden rounded-xl border border-gray-700 bg-[#17172e] px-5 py-4"
        >
          <h2 class="mb-3 rounded-lg bg-[#232339] py-4 text-center text-xl font-bold">
            Nguyên lý học tập: Luyện tập tiếng Anh qua phương pháp ghép từ thành câu 😄
          </h2>
          <h3 class="pb-2 text-base font-semibold">Lấy câu làm cốt lõi</h3>
          <p class="py-1">
            Mỗi câu bao gồm từ vựng/cụm từ/ngữ pháp, nên khi học được một câu, bạn có thể diễn đạt
            rõ ràng.
          </p>
          <h3 class="py-2 text-base font-semibold">Chia nhỏ nhiệm vụ</h3>
          <p class="py-1 leading-7">Chia một câu dài khó thành các đơn vị nhỏ (từ vựng/cụm từ)</p>
          <h3 class="py-2 text-base font-semibold">Lặp lại</h3>
          <p class="py-1 leading-7">Thông qua việc lặp lại liên tục để tạo phản xạ tự nhiên</p>
          <h3 class="py-2 text-base font-semibold">i+1</h3>
          <p class="py-1 leading-7">
            Tăng dần độ khó, bắt đầu từ câu đơn giản nhất rồi đến những khái niệm phong phú hơn
          </p>
          <h3 class="pb-2 text-base font-semibold">Phản hồi tích cực đến nhanh</h3>
          <p class="py-1 leading-7">
            Khi có thể viết được câu dài khó, bạn sẽ rất có thành tựu cảm, nên càng học càng muốn
            học. Phá vỡ phương pháp học tiếng Anh truyền thống nhàm chán — học thuộc từ vựng (bạn
            còn nhớ abandon không? oh không, giờ là aback rồi)
          </p>
        </div>
      </div>
    </section>
  </div>
  <CommonDivider />
</template>

<script setup lang="ts"></script>

<style scoped>
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}

.hide-scrollbar::-webkit-scrollbar-track {
  background-color: transparent;
}

.hide-scrollbar::-webkit-scrollbar-thumb {
  background-color: transparent;
}
</style>
