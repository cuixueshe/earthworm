<template>
  <button
    class="button cursor-pointer bg-white transition-all duration-300 dark:bg-[#05051d]"
    :data-content="route.path === '/' ? 'Back to Top' : 'Go to Home'"
    @click="scrollToTop"
  >
    <UIcon
      name="i-ph-arrow-up-bold"
      class="svgIcon h-5 w-5 fill-black transition-all duration-300 dark:fill-white"
    ></UIcon>
  </button>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";

const route = useRoute();

const scrollToTop = () => {
  if (route.path === "/") {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    return;
  } else {
    window.location.href = "/";
  }
};
</script>

<style scoped>
.button {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: none;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 0px 0px 4px rgba(180, 160, 255, 0.253);
  cursor: pointer;
  transition-duration: 0.3s;
  overflow: hidden;
  position: relative;
}

.button:hover {
  width: 140px;
  border-radius: 50px;
  transition-duration: 0.3s;
  background-color: rgb(181, 160, 255);
  align-items: center;
}

.button:hover .svgIcon {
  /* width: 20px; */
  transition-duration: 0.3s;
  opacity: 0;
}

.button::before {
  position: absolute;
  bottom: -20px;
  content: attr(data-content);
  /* content: "Back to Top"; */
  color: white;
  /* transition-duration: .3s; */
  font-size: 0px;
}

.button:hover::before {
  font-size: 13px;
  opacity: 1;
  bottom: unset;
  /* transform: translateY(-30px); */
  transition-duration: 0.3s;
}
</style>
