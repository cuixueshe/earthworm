<template>
  <div
    class="dropdown dropdown-end h-8 w-8"
    @click="toggleDropdown"
  >
    <button
      tabindex="0"
      class="btn btn-ghost btn-sm rounded-md px-1"
    >
      <span class="i-ph-user h-6 w-6"></span>
    </button>
    <ul
      v-if="showDropdown"
      ref="dropdownContainer"
      tabindex="0"
      class="menu dropdown-content z-[1] mt-2 w-52 rounded-md border-2 border-gray-200 bg-white p-2 dark:border-gray-600 dark:bg-theme-dark"
    >
      <li
        v-for="(item, index) in showMenuOptions"
        :index="index"
      >
        <span
          @click="item.eventName"
          class="flex items-center gap-2 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-fuchsia-500 dark:hover:text-white"
        >
          <span
            class="h-6 w-6"
            :class="item.icon"
          ></span>
          <span class="text-sm font-medium">
            {{ item.title }}
          </span>
        </span>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { onClickOutside } from "@vueuse/core";
import { navigateTo } from "nuxt/app";
import { computed, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const emit = defineEmits(["update-show-modal"]);
const route = useRoute();
const router = useRouter();
const showDropdown = ref(false);
const dropdownContainer = ref(null);
const GO_BACK_GAME_NAME = "goBackGamePage";
const MENU_OPTIONS = [
  // {
  //   title: "返回游戏",
  //   name: GO_BACK_GAME_NAME,
  //   eventName: handleGoBackGamePage,
  //   icon: "i-ph-game-controller",
  // },
  {
    title: "设置",
    name: "setting",
    eventName: handleSetting,
    icon: "i-ph-gear",
  },
  {
    title: "登出",
    name: "logout",
    eventName: handleLogout,
    icon: "i-ph-sign-out",
  },
];
const showMenuOptions = computed(() => {
  return MENU_OPTIONS;
  // TODO
  // return MENU_OPTIONS.filter((menu) => menu.name !== GO_BACK_GAME_NAME || route.name !== "Main-id");
});

onClickOutside(dropdownContainer, () => {
  showDropdown.value = false;
});

function toggleDropdown() {
  showDropdown.value = !showDropdown.value;
}

async function handleGoBackGamePage() {
  // TODO 处理回到游戏
}

function handleSetting() {
  navigateTo("/user/setting");
}

function handleLogout() {
  emit("update-show-modal", true);
}
</script>
