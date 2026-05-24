<template>
  <section
    class="pt-28 text-gray-500"
    id="home"
  >
    <div class="mx-auto my-5 text-center">
      <h2
        class="bg-gradient-to-r from-purple-600 to-gray-200 bg-clip-text text-3xl font-extrabold tracking-tight text-transparent dark:from-purple-600 dark:to-gray-100 lg:text-4xl xl:text-5xl"
      >
        Công cụ học tiếng Anh gây nghiện
      </h2>

      <div class="mt-5 text-sm md:text-base xl:text-lg">
        <p class="pt-2 text-center text-gray-500 dark:text-gray-300 lg:text-xl">
          Sử dụng các phương pháp như
          <span class="text-purple-400 dark:text-purple-200"> ghép từ thành câu </span>、<span
            class="text-purple-400 dark:text-purple-200"
          >
            i + 1 </span
          >、<span class="text-purple-400 dark:text-purple-200"> học từ mục tiêu </span>để giúp bạn
          tiếp thu tiếng Anh
        </p>
        <p class="pt-2 text-center text-gray-500 dark:text-gray-300 lg:text-xl">
          Thông qua việc <span class="text-purple-400 dark:text-purple-200"> lặp lại </span> liên
          tục để tạo ra phản xạ tự nhiên
        </p>
        <p class="pt-2 text-center text-gray-500 dark:text-gray-300 lg:text-xl">
          Quan trọng nhất là hình thức
          <span class="text-purple-400 dark:text-purple-200"> trò chơi hóa </span>giúp việc học
          tiếng Anh không còn nhàm chán nữa
        </p>
      </div>
    </div>
    <div class="my-10 flex flex-wrap items-center justify-center gap-4 font-customFont">
      <button
        @click="handleKeydown"
        class="btn relative"
        type="button"
      >
        <strong>Bắt đầu Earthworm</strong>
        <div id="container-stars">
          <div id="stars"></div>
        </div>

        <div id="glow">
          <div class="circle"></div>
          <div class="circle"></div>
        </div>
      </button>
      <a
        href="https://github.com/cuixueshe/earthworm"
        rel="noreferrer noopener"
        target="_blank"
        class="group relative inline-flex h-12 cursor-pointer items-center justify-center overflow-hidden rounded-full px-6 duration-500"
      >
        <div
          class="relative inline-flex -translate-x-0 items-center transition group-hover:-translate-x-6"
        >
          <div
            class="absolute flex translate-x-0 items-center justify-center text-purple-600 opacity-100 transition group-hover:-translate-x-6 group-hover:opacity-0"
          >
            <UIcon
              name="i-ph-star-fill"
              class="h-5 w-5"
            ></UIcon>
          </div>
          <span
            class="bg-gradient-to-r from-purple-600 to-gray-300 bg-clip-text pl-6 font-medium text-transparent"
            >Star us on GitHub</span
          >
          <div
            class="absolute right-0 flex translate-x-12 items-center justify-center text-purple-400 opacity-0 transition group-hover:translate-x-6 group-hover:opacity-100"
          >
            <UIcon
              name="i-ph-arrow-right"
              class="h-5 w-5"
            ></UIcon>
          </div>
        </div>
      </a>
    </div>
    <div class="mt-20 flex w-full justify-center">
      <img
        alt=""
        src="~/assets/home-page-preview.png"
        class="w-4/5 lg:w-3/4"
      />
    </div>

    <CommonDivider />
  </section>
</template>

<script setup lang="ts">
const emit = defineEmits(["start-earthworm"]);

function handleKeydown() {
  emit("start-earthworm");
}
</script>

<style scoped>
.btn {
  display: flex;
  justify-content: center;
  align-items: center;
  width: fit-content;
  overflow: hidden;
  height: 3rem;
  background-size: 300% 300%;
  backdrop-filter: blur(1rem);
  border-radius: 5rem;
  transition: 0.5s;
  animation: gradient_301 5s ease infinite;
  border: double 4px transparent;
  background-image: linear-gradient(#05051d, #05051d),
    linear-gradient(137.48deg, #ffdb3b 10%, #fe53bb 45%, #8f51ea 67%, #0044ff 87%);
  background-origin: border-box;
  background-clip: content-box, border-box;
}

#container-stars {
  position: absolute;
  z-index: -1;
  width: 100%;
  height: 100%;
  overflow: hidden;
  transition: 0.5s;
  backdrop-filter: blur(1rem);
  border-radius: 5rem;
  background-color: #05051d;
}

strong {
  z-index: 2;
  font-family: "Avalors Personal Use";
  font-size: 15px;
  letter-spacing: 5px;
  color: #ffffff;
  /* text-shadow: 0 0 4px white; */
}

#glow {
  position: absolute;
  display: flex;
  width: 12rem;
}

.circle {
  width: 100%;
  height: 30px;
  filter: blur(2rem);
  animation: pulse_3011 4s infinite;
  z-index: -1;
}

.circle:nth-of-type(1) {
  background: rgba(254, 83, 186, 0.636);
}

.circle:nth-of-type(2) {
  background: rgba(142, 81, 234, 0.704);
}

.btn:hover #container-stars {
  z-index: 1;
  background-color: #05051d;
}

.btn:hover {
  transform: scale(1.1);
}

.btn:active {
  border: double 4px #fe53bb;
  background-origin: border-box;
  background-clip: content-box, border-box;
  animation: none;
}

.btn:active .circle {
  background: #fe53bb;
}

#stars {
  position: relative;
  background: transparent;
  width: 200rem;
  height: 200rem;
}

#stars::after {
  content: "";
  position: absolute;
  top: -10rem;
  left: -100rem;
  width: 100%;
  height: 100%;
  animation: animStarRotate 90s linear infinite;
}

#stars::after {
  background-image: radial-gradient(#ffffff 1px, transparent 1%);
  background-size: 50px 50px;
}

#stars::before {
  content: "";
  position: absolute;
  top: 0;
  left: -50%;
  width: 170%;
  height: 500%;
  animation: animStar 60s linear infinite;
}

#stars::before {
  background-image: radial-gradient(#ffffff 1px, transparent 1%);
  background-size: 50px 50px;
  opacity: 0.5;
}

@keyframes animStar {
  from {
    transform: translateY(0);
  }

  to {
    transform: translateY(-135rem);
  }
}

@keyframes animStarRotate {
  from {
    transform: rotate(360deg);
  }

  to {
    transform: rotate(0);
  }
}

@keyframes gradient_301 {
  0% {
    background-position: 0% 50%;
  }

  50% {
    background-position: 100% 50%;
  }

  100% {
    background-position: 0% 50%;
  }
}

@keyframes pulse_3011 {
  0% {
    transform: scale(0.75);
    box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.7);
  }

  70% {
    transform: scale(1);
    box-shadow: 0 0 0 10px rgba(0, 0, 0, 0);
  }

  100% {
    transform: scale(0.75);
    box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
  }
}
</style>
