<template>
  <div class="container w-full mb-14">
    <NoticeBar v-if="showNoticeBar" />
    <section
      class="text-gray-500 mt-16"
      id="home"
    >
      <CommonTitle
        title="An Friendly English learning tool."
        :description="[
          'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciuntillo tenetur fuga ducimus numquam ea!',
        ]"
      >
        <div class="my-10 flex flex-wrap justify-center gap-4">
          <a
            class="block w-full rounded border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-opacity-75 sm:w-auto"
            href="#"
          >
            Get Started
          </a>

          <a
            class="block w-full rounded border border-blue-600 px-12 py-3 text-sm font-medium text-black hover:bg-white focus:outline-none focus:ring active:bg-blue-500 sm:w-auto dark:text-white"
            href="#"
          >
            Learn More
          </a>
        </div>

        <div class="w-full flex justify-center">
          <img
            alt=""
            src="https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
            class="w-3/4 object-cover sm:h-80 lg:h-96 border"
          />
        </div>
      </CommonTitle>
      <CommonDivider />
    </section>
    <Introduce />
    <Comments />
    <Features />
    <PayCard />
    <Question />
    <Contact />
  </div>
</template>

<script setup>
import { ref } from "vue";
import Comments from "./components/Comments.vue";
import Contact from "./components/Contact.vue";
import Features from "./components/Features.vue";
import Introduce from "./components/Introduce.vue";
import NoticeBar from "./components/NoticeBar.vue";
import PayCard from "./components/PayCard.vue";
import Question from "./components/Questions.vue";

const showNoticeBar = ref(false);
</script>

<style scoped></style>
