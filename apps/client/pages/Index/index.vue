<template>
  <div class="container w-full font-customFont">
    <NoticeBar v-if="showNoticeBar" />
    <section
      class="text-gray-500 mt-28"
      id="home"
    >
      <CommonTitle
        title="An Friendly English learning tool."
        :description="[
          `Use conjunctions, task splitting, repetition, i +1 to help you learn English`,
          `Most importantly, you will have good positive feedback`,
        ]"
      >
        <div class="my-10 flex flex-wrap justify-center gap-4 font-customFont items-center">
          <button
            class="btn"
            type="button"
          >
            <strong>Get Started</strong>
            <div id="container-stars">
              <div id="stars"></div>
            </div>

            <div id="glow">
              <div class="circle"></div>
              <div class="circle"></div>
            </div>
          </button>
          <div class='dark:text-white ml-8'>Start your English study.</div>
          <!-- <a
            class="block w-full rounded border border-purple-600 bg-purple-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-purple-600 focus:outline-none focus:ring active:text-opacity-75 sm:w-auto"
            href="#"
          >
            Get Started
          </a>

          <a
            class="block w-full rounded border border-purple-600 px-12 py-3 text-sm font-medium text-black hover:bg-purple-600 focus:outline-none focus:ring active:bg-blue-500 sm:w-auto dark:text-white"
            href="#"
          >
            Learn More
          </a> -->
        </div>

        <div class="w-full flex justify-center mt-20">
          <img
            alt=""
            src="https://s1.locimg.com/2024/03/30/adb39233f2b18.jpg"
            class="w-3/4 object-cover sm:h-80 lg:h-96"
          />
        </div>
      </CommonTitle>
      <CommonDivider />
    </section>
    <Introduce />
    <Comments />
    <PayCard />
    <!-- <Features /> -->
    <Question />
    <Contact />
  </div>
</template>

<script setup>
import { ref } from "vue";
import Comments from "./components/Comments.vue";
import Contact from "./components/Contact.vue";
// import Features from "./components/Features.vue";
import Introduce from "./components/Introduce.vue";
import NoticeBar from "./components/NoticeBar.vue";
import PayCard from "./components/PayCard.vue";
import Question from "./components/Questions.vue";

const showNoticeBar = ref(false);
</script>

<style scoped>
.btn {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 13rem;
  overflow: hidden;
  height: 3rem;
  background-size: 300% 300%;
  backdrop-filter: blur(1rem);
  border-radius: 5rem;
  transition: 0.5s;
  animation: gradient_301 5s ease infinite;
  border: double 4px transparent;
  background-image: linear-gradient(#05051d, #05051d),  linear-gradient(137.48deg, #ffdb3b 10%,#FE53BB 45%, #8F51EA 67%, #0044ff 87%);
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
  font-family: 'Avalors Personal Use';
  font-size: 15px;
  letter-spacing: 5px;
  color: #FFFFFF;
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
  transform: scale(1.1)
}

.btn:active {
  border: double 4px #FE53BB;
  background-origin: border-box;
  background-clip: content-box, border-box;
  animation: none;
}

.btn:active .circle {
  background: #FE53BB;
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
