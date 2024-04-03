<template>
  <button
    class="button dark:bg-[#05051d] bg-white transition-all duration-300 cursor-pointer"
    @click="scrollToTop"
    :data-content="route.path === '/' ? 'Back to Top' : 'Go to Home'"
  >
    <svg
      class="svgIcon w-3 dark:fill-white fill-black transition-all duration-300"
      viewBox="0 0 384 512"
    >
      <path
        d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z"
      ></path>
    </svg>
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
  transform: translateY(-200%);
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
