<template>
  <header
    :class="[headerClasses]"
    class="top-0 bg-opacity-50 backdrop-blur-xl z-50 font-customFont px-3 w-full"
  >
    <div class="mx-auto max-w-screen-xl mt-2">
      <div class="flex h-16 items-center justify-between">
        <div class="left flex w-full items-center justify-between">
          <NuxtLink to="/">
            <div class="logo flex items-center">
              <img
                width="48"
                height="48"
                class="rounded-md overflow-hidden mr-6"
                src="/logo.png"
                alt="earth-worm-logo"
              />
              <h1
                class="text-2xl font-extrabold leading-normal text-wrap dark:text-white"
              >
                Earthworm
              </h1>
            </div>
          </NuxtLink>

          <nav
            v-if="route.path === '/'"
            aria-label="Global"
            class="hidden md:block mr-8"
          >
            <ul class="flex items-center text-md">
              <template
                v-for="(opt_item, opt_index) in HEADER_OPTIONS"
                :key="opt_index"
              >
                <li class="px-4">
                  <a
                    class="text-gray-500 transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75"
                    :href="`#${opt_item.anchor}`"
                  >
                    {{ opt_item.name }}
                  </a>
                </li>
              </template>
            </ul>
          </nav>
        </div>

        <div class="login-out flex justify-end items-center">
          <button
            class="btn btn-sm btn-ghost rounded-md mx-1 w-8 h-8 p-0"
            @click="toggleDarkMode"
          >
            <svg
              v-if="isDarkMode"
              xmlns="http://www.w3.org/2000/svg"
              width="1.5em"
              height="1.5em"
              viewBox="0 0 256 256"
            >
              <path
                fill="currentColor"
                d="M233.54 142.23a8 8 0 0 0-8-2a88.08 88.08 0 0 1-109.8-109.8a8 8 0 0 0-10-10a104.84 104.84 0 0 0-52.91 37A104 104 0 0 0 136 224a103.09 103.09 0 0 0 62.52-20.88a104.84 104.84 0 0 0 37-52.91a8 8 0 0 0-1.98-7.98m-44.64 48.11A88 88 0 0 1 65.66 67.11a89 89 0 0 1 31.4-26A106 106 0 0 0 96 56a104.11 104.11 0 0 0 104 104a106 106 0 0 0 14.92-1.06a89 89 0 0 1-26.02 31.4"
              />
            </svg>
            <svg
              v-else
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
              />
            </svg>
          </button>

          <div class="flex items-center ml-5">
            <button
              v-show="
                (!userStore.user && route.name !== 'Auth-Login') ||
                route.name === 'Auth-Login'
              "
              @click="
                route.name === 'Auth-Login' ? handleSignup() : handleLogin()
              "
              aria-label="route.name === 'Auth-Login' ? 'Register' : 'Login'"
              class="rounded-md px-5 py-2.5 text-sm font-medium text-white shadow-lg transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 hover:bg-purple-600 focus:ring-purple-700 bg-purple-500"
            >
              {{ route.name === "Auth-Login" ? "Register" : "Login" }}
            </button>
          </div>

          <div class="logged-in flex items-center">
            <div class="mx-2 font-500 truncate max-w-[10em]">{{
              userStore.user?.username
            }}</div>
            <NavMenu
              v-if="userStore.user"
              @updateShowModal="handleLogout"
            />
          </div>
        </div>
      </div>
    </div>
  </header>
  <MessageBox
    v-model:isShowModal="isShowModal"
    title="Notice"
    content="Are you sure to exit?"
    @confirm="handleLogoutConfirm"
  />
</template>

<script setup lang="ts">
import { navigateTo } from "nuxt/app";
import { computed, ref } from "vue";
import { useRoute } from "vue-router";
import Message from "~/components/main/Message/useMessage";
import { Theme, useDarkMode } from "~/composables/darkMode";
import { useUserStore } from "~/store/user";
import { cleanToken } from "~/utils/token";
import NavMenu from "./NavDropMenu.vue";
import MessageBox from "./main/MessageBox/MessageBox.vue";

const route = useRoute();
const userStore = useUserStore();
const isShowModal = ref(false);
const { setDarkMode, toggleDarkMode, darkMode } = useDarkMode();

const isDarkMode = computed(() => darkMode.value === Theme.DARK);

const handleLogin = () => {
  navigateTo("/auth/login");
};

const handleSignup = () => {
  navigateTo("/auth/signup");
};

const handleLogout = () => {
  isShowModal.value = true;
};

const handleLogoutConfirm = () => {
  userStore.logoutUser();
  cleanToken();
  try {
    Message.success("You've been logged out successfully!", {
      duration: 2000,
      onLeave() {
        navigateTo("/");
      },
    });
  } catch (error) {
    Message.error("logout error!");
  }
};
const HEADER_OPTIONS = [
  { name: "Home", anchor: "home" },
  // { name: "What", anchor: "what" },
  { name: "Features", anchor: "features" },
  // { name: "Pricing", anchor: "pricing" },
  { name: "FAQ", anchor: "faq" },
  { name: "Contact", anchor: "contact" },
];

const headerClasses = computed(() => {
  const isHomePage = route.path === "/";

  return {
    sticky: isHomePage,
  };
});
</script>
<style></style>
