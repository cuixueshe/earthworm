<template>
  <header
    :class="{
      'sticky top-0 z-20': isStickyNavBar,
      'glass bg-gradient-to-r from-transparent via-white/20 to-transparent shadow-md drop-shadow-sm':
        isScrolled,
    }"
    class="w-full px-5 font-customFont transition-all"
  >
    <div class="mx-auto max-w-screen-xl">
      <div class="flex h-16 items-center justify-between">
        <div class="flex flex-1 items-center justify-between">
          <NuxtLink to="/">
            <div class="logo flex items-center">
              <img
                width="48"
                height="48"
                class="mr-6 hidden overflow-hidden rounded-md min-[800px]:block"
                src="/logo.png"
                alt="earth-worm-logo"
              />
              <h1 class="text-wrap text-2xl font-extrabold leading-normal dark:text-white">
                Earthworm
              </h1>
            </div>
          </NuxtLink>

          <nav
            v-if="route.path === '/' && !isAuthenticated()"
            aria-label="Global"
            class="hidden md:block"
          >
            <ul class="flex items-center text-base">
              <template
                v-for="(optItem, optIndex) in HEADER_OPTIONS"
                :key="optIndex"
              >
                <li class="px-4">
                  <a
                    class="text-nowrap hover:text-purple-600 dark:text-white dark:hover:text-purple-400"
                    :href="`#${optItem.anchor}`"
                  >
                    {{ optItem.name }}
                  </a>
                </li>
              </template>
            </ul>
          </nav>
        </div>

        <div class="flex items-center">
          <!-- 显示用户信息 -->
          <div
            v-if="isAuthenticated()"
            class="logged-in flex items-center"
          >
            <div class="font-500 mx-2 max-w-[4em] truncate min-[500px]:max-w-[6em]">
              {{ userStore.userInfo?.username }}
            </div>
            <DropMenu @update-show-modal="handleLogout" />
          </div>

          <!-- 登录/注册 -->
          <button
            v-else
            aria-label="Login"
            class="btn btn-sm mr-1 border-none bg-purple-500 text-white shadow-md hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-700"
            @click="signIn()"
          >
            登录
          </button>

          <!-- 切换主题 -->
          <button
            class="btn btn-ghost btn-sm ml-1 h-8 w-8 rounded-md p-0"
            @click="toggleDarkMode"
          >
            <span
              class="h-6 w-6"
              :class="isDarkMode ? 'i-ph-moon' : 'i-ph-sun'"
            ></span>
          </button>
        </div>
      </div>
    </div>
  </header>
  <MainMessageBox
    v-model:isShowModal="isShowModal"
    title="提示"
    content="是否确认退出登录？"
    @confirm="signOut()"
  />
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from "vue";
import { useRoute } from "vue-router";

import { Theme, useDarkMode } from "~/composables/darkMode";
import { isAuthenticated, signIn, signOut } from "~/services/auth";
import { useUserStore } from "~/store/user";

const route = useRoute();
const userStore = useUserStore();
const { darkMode, toggleDarkMode } = useDarkMode();

const isShowModal = ref(false);
const isScrolled = ref(false);
const HEADER_OPTIONS = [
  { name: "功能", anchor: "features" },
  { name: "问题", anchor: "faq" },
  { name: "联系我们", anchor: "contact" },
];

const isDarkMode = computed(() => darkMode.value === Theme.DARK);
const isStickyNavBar = computed(() => ["index", "User-Info"].includes(route.name as string));

const handleLogout = () => {
  isShowModal.value = true;
};

const onScroll = () => {
  isScrolled.value = document.documentElement.scrollTop > 8;
};

onMounted(() => {
  window.addEventListener("scroll", onScroll);
});
onUnmounted(() => {
  window.removeEventListener("scroll", onScroll);
});
</script>
