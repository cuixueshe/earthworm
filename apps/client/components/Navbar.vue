<template>
  <header
    class="sticky top-0 bg-opacity-50 backdrop-blur-xl z-50 font-customFont px-3"
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

        <div class="login-out flex justify-end items-center flex-1">
          <!-- <button
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
          </button> -->

          <!-- <div class="flex items-center ml-5">
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
          </div> -->

          <div class="logged-in flex items-center">
            <div class="mx-2 font-500">{{ userStore.user?.username }}</div>
            <div
              v-if="userStore.user"
              class="dropdown dropdown-end"
            >
              <button
                tabindex="0"
                class="h-8 btn btn-sm btn-ghost rounded-md mx-0 px-1"
              >
                <svg
                  t="1711437189034"
                  class="icon"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="9876"
                  width="30"
                  height="30"
                >
                  <path
                    d="M716.714667 912.384a30.378667 30.378667 0 0 0-4.48-3.925333 24.576 24.576 0 0 0-4.266667 3.669333 51.541333 51.541333 0 0 1-35.754667 14.336 50.730667 50.730667 0 0 1-24.917333-6.4l-22.997333-12.8a50.730667 50.730667 0 0 1-23.424-60.672l0.256-0.981333a3.968 3.968 0 0 0-2.901334-3.157334 51.2 51.2 0 0 1-44.16-42.922666 211.456 211.456 0 0 1-2.261333-25.173334 169.216 169.216 0 0 1 2.517333-25.6 51.2 51.2 0 0 1 43.904-42.922666c1.408-0.256 2.901333-1.493333 2.901334-2.517334a4.266667 4.266667 0 0 0-0.256-1.493333 50.901333 50.901333 0 0 1 23.936-60.928l24.661333-13.568a53.077333 53.077333 0 0 1 24.661333-6.4 50.261333 50.261333 0 0 1 35.072 14.08l4.266667 3.669333h0.256a37.248 37.248 0 0 0 4.266667-3.669333 51.498667 51.498667 0 0 1 34.816-13.568 49.578667 49.578667 0 0 1 24.661333 6.4l23.936 13.098667a51.456 51.456 0 0 1 23.68 60.928l-0.256 0.768a3.285333 3.285333 0 0 0 2.986667 3.242666 51.2 51.2 0 0 1 43.904 42.922667 182.016 182.016 0 0 1 2.176 25.6 186.154667 186.154667 0 0 1-2.176 25.6 50.901333 50.901333 0 0 1-43.904 42.666667c-1.493333 0.256-2.986667 1.664-2.986667 2.688a4.266667 4.266667 0 0 0 0.256 1.493333 51.2 51.2 0 0 1-23.936 60.672l-23.936 13.354667a49.578667 49.578667 0 0 1-24.661333 6.4 51.2 51.2 0 0 1-35.84-14.890667z m26.069333-45.098667a102.4 102.4 0 0 1 9.898667 8.533334l23.936-13.312a51.2 51.2 0 0 1-2.986667-16.512 54.442667 54.442667 0 0 1 47.658667-54.229334 173.653333 173.653333 0 0 0 1.664-17.493333 170.666667 170.666667 0 0 0-1.664-17.578667 54.570667 54.570667 0 0 1-47.658667-54.229333 48.64 48.64 0 0 1 2.986667-16.512l-23.68-13.312a80.085333 80.085333 0 0 1-9.898667 7.936 45.013333 45.013333 0 0 1-59.178667 0c-4.266667-3.242667-7.68-6.186667-9.898666-8.149333l-24.661334 13.568a58.026667 58.026667 0 0 1 2.730667 16.512 54.570667 54.570667 0 0 1-47.317333 54.229333 88.789333 88.789333 0 0 0 0 35.072 54.442667 54.442667 0 0 1 47.317333 54.229333 59.733333 59.733333 0 0 1-2.730667 16.512l22.741334 12.8c2.432-2.176 5.674667-5.162667 9.813333-8.533333a52.565333 52.565333 0 0 1 30.336-11.562667 51.797333 51.797333 0 0 1 30.592 12.074667z m-592.768 8.533334a362.965333 362.965333 0 0 1 286.421333-354.517334 219.861333 219.861333 0 1 1 152.917334 0 368.981333 368.981333 0 0 1 82.688 28.416 32.085333 32.085333 0 1 1-28.16 57.685334 294.016 294.016 0 0 0-130.986667-30.336 299.050667 299.050667 0 0 0-298.666667 298.666666 32.042667 32.042667 0 1 1-64 0zM357.674667 316.330667a155.349333 155.349333 0 0 0 155.178666 154.922666 155.221333 155.221333 0 0 0 155.178667-154.922666 155.178667 155.178667 0 0 0-310.314667 0z m292.352 457.685333a62.165333 62.165333 0 1 1 62.165333 62.165333 62.208 62.208 0 0 1-62.122667-62.122666z m42.666666 0a19.498667 19.498667 0 1 0 19.498667-19.498667 19.413333 19.413333 0 0 0-19.456 19.541334z"
                    p-id="9877"
                    fill="currentColor"
                  ></path>
                </svg>
              </button>
              <ul
                tabindex="0"
                class="dropdown-content z-[1] menu p-2 w-52 bg-white border-gray-200 border-2 mt-2 rounded-md"
              >
                <li>
                  <span
                    @click="handleViewUserInfo"
                    class="flex items-center gap-2 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="size-5 opacity-75"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>

                    <span class="text-sm font-medium"> Account Info </span>
                  </span>
                </li>
                <li>
                  <span
                    @click="handleLogout"
                    class="flex items-center gap-2 rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                  >
                    <svg
                      t="1711436550523"
                      class="icon"
                      viewBox="0 0 24 24"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      p-id="2319"
                      width="20"
                      height="20"
                    >
                      <path
                        d="M588.8 409.6a25.6 25.6 0 0 0 25.6-25.6v-204.8c0-42.3424-34.4576-76.8-76.8-76.8h-460.8C34.4576 102.4 0 136.8576 0 179.2v614.4c0 38.1952 27.4944 79.872 62.5664 94.8736l264.2944 113.2544c9.1136 3.8912 18.3808 5.8368 27.2384 5.8368 10.9056 0 21.2992-2.9696 30.1568-8.8064 16.0768-10.5984 25.344-29.44 25.344-51.6096v-76.8h128c42.3424 0 76.8-34.4576 76.8-76.8v-204.8a25.6 25.6 0 0 0-51.2 0v204.8a25.6 25.6 0 0 1-25.6 25.6H409.6v-486.4c0-38.1952-27.4944-79.872-62.5664-94.8736L150.3232 153.5488H537.6a25.6 25.6 0 0 1 25.6 25.6v204.8a25.6 25.6 0 0 0 25.6 25.6zM326.8608 284.9792c16.4864 7.0656 31.5392 29.9008 31.5392 47.8208v614.4c0 5.3248-1.4336 8.2944-2.304 8.8576s-4.1472 0.7168-9.0624-1.3824l-264.2944-113.2544C66.2528 834.3552 51.2 811.5712 51.2 793.6v-614.4c0-4.0448 0.9216-7.8336 2.6112-11.264l273.0496 117.0432z"
                        fill="#bfbfbf"
                        p-id="2320"
                      ></path>
                      <path
                        d="M939.7248 468.2752l-153.6-153.6a25.6 25.6 0 0 0-36.1984 36.1984l109.8752 109.8752H537.6a25.6 25.6 0 0 0 0 51.2h322.2016l-109.8752 109.8752a25.6 25.6 0 0 0 36.2496 36.1984l153.6-153.6a25.6 25.6 0 0 0 0-36.1984z"
                        p-id="2321"
                      ></path>
                    </svg>

                    <span class="text-sm font-medium">Log out</span>
                  </span>
                </li>
                <li>
                  <span
                    @click="handleSetting"
                    class="flex items-center gap-2 rounded-lg bg-gray-100 px-4 py-2 text-gray-700"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="size-5 opacity-75"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                      />
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>

                    <span class="text-sm font-medium"> Setting </span>
                  </span>
                </li>
              </ul>
            </div>
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
import MessageBox from "./main/MessageBox/MessageBox.vue";
const route = useRoute();
const userStore = useUserStore();
const isShowModal = ref(false);
const { setDarkMode, toggleDarkMode, darkMode } = useDarkMode();

const isDarkMode = computed(() => darkMode.value === Theme.DARK);

const handleViewUserInfo = () => {
  navigateTo("/user/info");
};

const handleLogin = () => {
  navigateTo("/auth/login");
};

const handleSignup = () => {
  navigateTo("/auth/signup");
};

const handleLogout = () => {
  isShowModal.value = true;
};

const handleSetting = () => {
  navigateTo("/user/info");
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
  { name: "What", anchor: "what" },
  { name: "Features", anchor: "features" },
  { name: "Pricing", anchor: "pricing" },
  { name: "FAQ", anchor: "faq" },
  { name: "Contact", anchor: "contact" },
];
</script>
<style></style>
