<template>
  <section
    class="text-gray-500 pt-28"
    id="home"
  >
    <div class="mx-auto text-center my-5">
      <h2
        class="text-4xl md:text-5xl lg:text-5xl xl:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-gray-200 dark:from-purple-600 dark:to-gray-100"
      >
        让你上瘾的英语学习工具
      </h2>

      <div class="mt-5">
        <p class="pt-2 text-center dark:text-gray-300 text-gray-500 lg:text-xl">
          使用<span class="dark:text-purple-200 text-purple-400">
            连词成句 </span
          >、<span class="dark:text-purple-200 text-purple-400"> i + 1 </span
          >、<span class="dark:text-purple-200 text-purple-400"> 以终为始 </span
          >等学习理论来帮助你习得英语
        </p>
        <p class="pt-2 text-center dark:text-gray-300 text-gray-500 lg:text-xl">
          通过不断的<span class="dark:text-purple-200 text-purple-400">
            重复 </span
          >形成肌肉记忆
        </p>
        <p class="pt-2 text-center dark:text-gray-300 text-gray-500 lg:text-xl">
          最重要的是<span class="dark:text-purple-200 text-purple-400">
            游戏化 </span
          >的形式让学习英语从此不再痛苦
        </p>
      </div>
    </div>
    <div
      class="my-10 flex flex-wrap justify-center gap-4 font-customFont items-center"
    >
      <button
        @click="handleKeydown"
        class="btn"
        type="button"
      >
        <strong>开启Earthworm</strong>
        <div id="container-stars">
          <div id="stars"></div>
        </div>

        <div id="glow">
          <div class="circle"></div>
          <div class="circle"></div>
        </div>
      </button>
      <a href="https://github.com/cuixueshe/earthworm" rel="noreferrer noopener" target="_blank" class="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-full px-6 duration-500 cursor-pointer">
        <div class="relative inline-flex -translate-x-0 items-center transition group-hover:-translate-x-6">
          <div class="absolute translate-x-0 opacity-100 transition group-hover:-translate-x-6 group-hover:opacity-0 text-purple-600">
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5">
              <path d="M7.22303 0.665992C7.32551 0.419604 7.67454 0.419604 7.77702 0.665992L9.41343 4.60039C9.45663 4.70426 9.55432 4.77523 9.66645 4.78422L13.914 5.12475C14.18 5.14607 14.2878 5.47802 14.0852 5.65162L10.849 8.42374C10.7636 8.49692 10.7263 8.61176 10.7524 8.72118L11.7411 12.866C11.803 13.1256 11.5206 13.3308 11.2929 13.1917L7.6564 10.9705C7.5604 10.9119 7.43965 10.9119 7.34365 10.9705L3.70718 13.1917C3.47945 13.3308 3.19708 13.1256 3.25899 12.866L4.24769 8.72118C4.2738 8.61176 4.23648 8.49692 4.15105 8.42374L0.914889 5.65162C0.712228 5.47802 0.820086 5.14607 1.08608 5.12475L5.3336 4.78422C5.44573 4.77523 5.54342 4.70426 5.58662 4.60039L7.22303 0.665992Z" fill="currentColor"></path>
            </svg>
          </div>
          <span class="pl-6 font-medium bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-gray-300">Star us on GitHub</span>
          <div class="absolute right-0 translate-x-12 opacity-0 transition group-hover:translate-x-6 group-hover:opacity-100 text-purple-400">
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5">
              <path d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path>
            </svg>
          </div>
        </div>
      </a>
    </div>
    <div class="w-full flex justify-center mt-20">
      <img
        alt=""
        src="~/assets/home-page-preview.png"
        class="w-3/4"
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
    linear-gradient(
      137.48deg,
      #ffdb3b 10%,
      #fe53bb 45%,
      #8f51ea 67%,
      #0044ff 87%
    );
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
