<template>
  <div
    class="mt-16 flex flex-col items-center justify-center"
    id="pricing"
  >
    <div class="bg-opacity-75 py-16 text-center text-white">
      <div class="mb-6">
        <p
          class="relative pb-4 text-sm font-bold tracking-wider text-gray-500 before:absolute before:inset-x-0 before:bottom-0 before:mb-0 before:h-0.5 before:bg-gradient-to-r before:from-purple-500"
        >
          Giá
        </p>
      </div>
      <h2
        class="bg-gradient-to-r from-purple-400 to-gray-300 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent dark:from-purple-600 dark:to-gray-500 md:text-5xl"
      >
        Bảng giá đơn giản và minh bạch <br />
        Dành cho tất cả mọi người
      </h2>
      <p class="mt-6 text-sm leading-relaxed text-gray-500 dark:text-gray-300">
        <span>Thanh toán một lần, sử dụng không giới hạn, cập nhật miễn phí trọn đời.</span><br />
        <span>Tùy chỉnh dịch vụ của bạn</span>
      </p>
    </div>

    <div class="flex items-center justify-around space-x-20">
      <div
        v-for="(feature, index) in features"
        :key="index"
        class="card relative w-96 max-w-sm border-transparent p-8 shadow-xl"
        :class="{ 'lifetime-animation': feature.type === 'Trọn đời' }"
      >
        <button
          class="button-unlock"
          v-if="feature.type === 'Trọn đời'"
        >
          <UIcon
            name="i-ph-crown-simple-fill"
            class="crown h-6 w-6 text-[#f09f33]"
          ></UIcon>
          Mở khóa Pro
        </button>

        <div class="mb-6 text-left">
          <h2 class="text-gradient text-3xl font-bold">{{ feature.type }}</h2>
          <p class="program-description">
            {{
              feature.type === "Miễn phí"
                ? "Gói cơ bản đã bao gồm nhiều nội dung, bạn hoàn toàn có thể bắt đầu hành trình Earthworm với nó!"
                : "Dịch vụ trọn đời với nhiều tùy chọn, trải nghiệm tất cả tính năng, Earthworm sẽ đồng hành toàn diện cùng bạn!"
            }}
          </p>
        </div>
        <div class="mb-8 text-left">
          <span class="mr-2 text-5xl font-extrabold text-black dark:text-white">
            {{ feature.type === "Miễn phí" ? "$0" : "$19" }}
          </span>
          <span class="gradient-text">{{
            feature.type === "Miễn phí" ? "Dùng ngay" : "Trải nghiệm sớm"
          }}</span>
        </div>
        <div class="text-left">
          <button
            @click="handleUpgrade(feature.type)"
            :class="
              feature.type === 'Miễn phí'
                ? 'bg-gray-600 hover:bg-gray-700'
                : 'bg-purple-600 hover:bg-purple-700'
            "
            class="w-full transform rounded-lg px-8 py-3 font-bold text-white transition duration-300 ease-in-out hover:scale-105"
          >
            {{ feature.type === "Miễn phí" ? "Bắt đầu" : "Nâng cấp ngay" }}
          </button>
          <ul class="mt-4">
            <li
              v-for="(item, itemIndex) in feature.list"
              :key="`feature-${index}-item-${itemIndex}`"
              class="mb-6 mt-6 flex items-center"
            >
              <UIcon
                name="i-ph-check-bold"
                class="mr-2 h-5 w-5"
                :class="item.unique ? 'text-green-500' : 'text-gray-500'"
              ></UIcon>
              {{ item.text }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  <div class="mt-6 bg-opacity-75 py-10 text-center text-white">
    <p class="text-xs text-gray-800 dark:text-gray-400 md:text-sm">
      Người dùng mới mua nếu muốn hoàn tiền, <br class="md:hidden" />
      <span
        class="bg-gradient-to-r from-purple-400 via-purple-400 to-gray-400 bg-clip-text text-transparent dark:from-purple-600 dark:via-purple-600 dark:to-gray-500"
        >được hoàn tiền 100% trong vòng 7 ngày</span
      >
      kể từ ngày mua.<br />
      Sau khi mua giấy phép Earthworm,
      <span
        class="bg-gradient-to-r from-purple-400 via-purple-400 to-gray-400 bg-clip-text text-transparent dark:from-purple-600 dark:via-purple-600 dark:to-gray-500"
        >đăng nhập</span
      >
      và
      <span
        class="bg-gradient-to-r from-purple-400 via-purple-400 to-gray-400 bg-clip-text text-transparent dark:from-purple-600 dark:via-purple-600 dark:to-gray-500"
        >đăng ký giấy phép</span
      >
      để mở khóa tất cả tính năng
    </p>
  </div>
  <CommonDivider />
</template>

<script setup>
const features = [
  {
    type: "Miễn phí",
    list: [
      { text: "Tối đa 5 không gian, đồng bộ đám mây", unique: false },
      { text: "Tối đa 1000 URL, hỗ trợ phân nhóm AI", unique: false },
      { text: "Phân nhóm AI tự động (sắp ra mắt)", unique: true },
      { text: "Hỗ trợ cơ bản", unique: true },
      { text: "Cập nhật miễn phí trọn đời!", unique: true },
    ],
  },
  {
    type: "Trọn đời",
    list: [
      { text: "Không gian không giới hạn, đồng bộ đám mây", unique: true },
      { text: "URL không giới hạn, hỗ trợ phân nhóm AI", unique: true },
      { text: "Phân nhóm AI tự động (sắp ra mắt)", unique: true },
      { text: "Hỗ trợ cao cấp trọn đời", unique: true },
      { text: "Cập nhật miễn phí trọn đời!", unique: true },
    ],
  },
];

async function handleUpgrade(type) {
  if (type === "Miễn phí") {
  } else {
  }
}
</script>

<style scoped>
.card {
  position: relative;
  overflow: hidden;
  border-radius: 6px;
  border: 1px solid rgba(138, 100, 226, 0.25);
  transition:
    box-shadow 0.3s ease-in-out,
    transform 0.3s ease-in-out,
    background-color 0.3s ease-in-out; /* 添加背景色过渡 */
  will-change: transform;
}

.card:hover {
  transform: translateY(-5px);
  animation:
    dynamic-shadow 2s infinite alternate,
    pulse 2s infinite alternate;
}
button {
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease-in-out;
}

button::after {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(120deg, transparent, rgba(255, 255, 255, 0.4), transparent);
  transition: all 0.3s ease-in-out;
}

button:hover::after {
  left: 100%;
}
@keyframes dynamic-shadow {
  0% {
    box-shadow:
      0 0 10px rgba(139, 92, 246, 0.5),
      0 0 20px rgba(139, 92, 246, 0.4),
      0 0 40px rgba(139, 92, 246, 0.3);
  }
  100% {
    box-shadow:
      0 0 10px rgba(139, 92, 246, 0.7),
      0 0 25px rgba(139, 92, 246, 0.6),
      0 0 55px rgba(139, 92, 246, 0.5);
  }
}

@keyframes pulse {
  0% {
    background-color: rgba(10, 3, 3, 0.05);
  }
  100% {
    background-color: rgba(154, 101, 240, 0.1);
  }
}
.lifetime-animation {
  animation:
    dynamic-shadow 2s infinite alternate,
    pulse 2s infinite alternate;
}
.text-smaller,
.program-description {
  font-size: 0.875rem;
}

.program-description {
  color: #7087aa;
}

.dark .program-description {
  color: #9ca3af;
}

.gradient-text {
  background: linear-gradient(to right, #7e22ce, #adafb3);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.text-gradient {
  background: linear-gradient(to right, #7e22ce, #adafb3);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.button-unlock {
  width: fit-content;
  display: flex;
  align-items: center;
  padding: 5px 10px;
  gap: 0.4rem;
  border: none;
  font-weight: bold;
  border-radius: 30px;
  cursor: pointer;
  text-shadow: 2px 2px 3px rgb(136 0 136 / 50%);
  background: linear-gradient(
      15deg,
      #880088,
      #aa2068,
      #cc3f47,
      #de6f3d,
      #f09f33,
      #de6f3d,
      #cc3f47,
      #aa2068,
      #880088
    )
    no-repeat;
  background-size: 300%;
  background-position: left center;
  transition: background 0.3s ease;
  color: #fff;
  position: absolute;
  right: 8px;
  top: 8px;
}

.button-unlock:hover {
  background-size: 320%;
  background-position: right center;
}

.button-unlock:hover .crown {
  color: #fff;
}

.button-unlock .crown {
  transition: 0.3s ease;
}
</style>
