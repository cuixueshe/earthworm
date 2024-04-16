<template>
  <div
    class="dropdown dropdown-end"
    @click="toggleDropdown"
  >
    <button
      tabindex="0"
      class="btn btn-ghost btn-sm mx-0 h-8 rounded-md px-1"
    >
      <i class="i-ph-user-gear h-6 w-6"></i>
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
          <!-- <span v-html="item.icon"></span> -->
          <i
            class="h-6 w-6"
            :class="item.icon"
          ></i>

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

import { useGameStore } from "~/store/game";

const emit = defineEmits(["update-show-modal"]);
const route = useRoute();
const router = useRouter();
const gameStore = useGameStore();
const showDropdown = ref(false);
const dropdownContainer = ref(null);
const GO_BACK_GAME_NAME = "goBackGamePage";
const MENU_OPTIONS = [
  {
    title: "用户信息",
    name: "accountInfo",
    eventName: handleViewUserInfo,
    icon: "i-ph-user",
  },
  {
    title: "返回游戏",
    name: GO_BACK_GAME_NAME,
    eventName: handleGoBackGamePage,
    icon: "i-ph-game-controller",
  },
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
  return MENU_OPTIONS.filter((menu) => menu.name !== GO_BACK_GAME_NAME || route.name !== "Main-id");
});

onClickOutside(dropdownContainer, () => {
  showDropdown.value = false;
});

function toggleDropdown() {
  showDropdown.value = !showDropdown.value;
}

function handleViewUserInfo() {
  navigateTo("/user/info");
}

async function handleGoBackGamePage() {
  const { courseId } = await gameStore.startGame();
  router.push(`/main/${courseId}`);
}

function handleSetting() {
  navigateTo({
    path: "/user/info",
    query: { displayComponent: "Setting" },
  });
}

function handleLogout() {
  emit("update-show-modal", true);
}
</script>
