<template>
  <div class="container w-full mb-14">
    <!-- notice bar -->
    <NoticeBar v-if="showNoticeBar" />
    <!-- nav -->
    <header
      class="sticky top-0 bg-transparent bg-opacity-50 backdrop-blur-xl z-50"
    >
      <div class="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div class="flex h-16 items-center justify-between">
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
                class="text-purple-500 text-3xl font-black font-extrabold leading-normal text-wrap"
              >
                Earthworm
              </h1>
            </div>
          </NuxtLink>

          <div class="md:flex md:items-center md:gap-12">
            <nav
              aria-label="Global"
              class="hidden md:block"
            >
              <ul class="flex items-center text-md gap-8">
                <template
                  v-for="(opt_item, opt_index) in HEADER_OPTIONS"
                  :key="opt_index"
                >
                  <li>
                    <a
                      class="text-gray-500 transition hover:text-gray-500/75 dark:text-white"
                      :href="`#${opt_item.anchor}`"
                    >
                      {{ opt_item.name }}
                    </a>
                  </li>
                </template>
              </ul>
            </nav>

            <div class="logged-in">
              <div class="mx-2">{{ userStore.user?.username }}</div>
              <div
                v-if="userStore.user"
                class="dropdown dropdown-end"
              >
                <button
                  tabindex="0"
                  class="h-8 btn btn-sm btn-ghost rounded-md mx-0 px-1"
                >
                  <svg
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
                      d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                    />
                  </svg>
                </button>
                <ul
                  tabindex="0"
                  class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-32"
                >
                  <li @click="handleViewUserInfo"><a>User Info</a></li>
                  <li @click="handleLogout"><a>Log out</a></li>
                </ul>
              </div>
            </div>
            <div class="flex items-center gap-4">
              <div class="sm:flex sm:gap-4">
                <button
                  v-show="
                    !userStore.user &&
                    (route.name === 'Auth-SignUp' ||
                      route.name !== 'Auth-Login')
                  "
                  class="rounded-md bg-purple-400 px-5 py-2.5 text-sm font-medium text-white shadow"
                  @click="handleLogin"
                >
                  Login
                </button>

                <div class="hidden sm:flex">
                  <button
                    v-show="route.name === 'Auth-Login'"
                    class="rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-purple-400"
                    @click="handleSignup"
                  >
                    Register
                  </button>
                </div>
              </div>

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
            </div>
          </div>
        </div>
      </div>
    </header>
    <!-- header -->
    <section class="text-gray-500" id="home">
      <div class="mx-auto w-full px-4 py-16 lg:flex">
        <div class="mx-auto text-center">
          <p
            class="w-full bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text font-extrabold text-transparent s-5xl leading-30"
          >
            An Friendly English learning tool.
          </p>

          <p class="mx-auto mt-4 max-w-2xl sm:text-xl/relaxed">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt
            illo tenetur fuga ducimus numquam ea!
          </p>

          <div class="mt-8 flex flex-wrap justify-center gap-4">
            <a
              class="block w-full rounded border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-white focus:outline-none focus:ring active:text-opacity-75 sm:w-auto"
              href="#"
            >
              Get Started
            </a>

            <a
              class="block w-full rounded border border-blue-600 px-12 py-3 text-sm font-medium text-gray-500 hover:bg-blue-600 focus:outline-none focus:ring active:bg-blue-500 sm:w-auto"
              href="#"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>
      <div class="w-full flex justify-center">
      <img
        alt=""
        src="https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
        class="w-3/4 object-cover sm:h-80 lg:h-96 border"
      />
    </div>
    </section>
    <Divider />
    <!-- what is earthworm -->
    <Introduce />
    <Divider />
    <!-- user feedback -->
    <Comments />
    <Divider />
    <!-- features -->
    <Features />
    <Divider />
    <!-- pay -->
    <PayCard />
    <Divider />
    <!-- question -->
    <Question />
    <Divider />
    <!-- footer -->
    <Contact />
  </div>
  <MessageBox
    v-model:isShowModal="isShowModal"
    title="Notice"
    content="Are you sure to exit?"
    @confirm="handleLogoutConfirm"
  />
</template>

<script setup>
import { navigateTo } from "nuxt/app";
import { computed, ref } from "vue";
import { useRoute } from "vue-router";
import Comments from "./components/Comments.vue";
import Contact from "./components/Contact.vue";
import Divider from "./components/Divider.vue";
import Features from "./components/Features.vue";
import Introduce from "./components/Introduce.vue";
import NoticeBar from "./components/NoticeBar.vue";
import PayCard from "./components/PayCard.vue";
import Question from "./components/Questions.vue";

const route = useRoute();

// theme
import { Theme, useDarkMode } from "~/composables/darkMode";
const { setDarkMode, toggleDarkMode, darkMode } = useDarkMode();
const isDarkMode = computed(() => darkMode.value === Theme.DARK);

// userStore
import { useUserStore } from "~/store/user";
const userStore = useUserStore();

// login
import MessageBox from "~/components/main/MessageBox/MessageBox.vue";
const isShowModal = ref(false);
const handleLogin = () => {
  navigateTo("/auth/login");
};

const handleSignup = () => {
  navigateTo("/auth/signup");
};

const handleLogout = () => {
  isShowModal.value = true;
};

const showNoticeBar = ref(false);

// Header
const HEADER_OPTIONS = [
  { name: "Home", anchor: "home" },
  { name: "What", anchor: "what" },
  { name: "Features", anchor: "features" },
  { name: "Pricing", anchor: "pricing" },
  { name: "FAQ", anchor: "faq" },
  { name: "Contact", anchor: "contact" },
];


</script>

<style scoped>
.s-5xl {
  font-size: 3rem;
}
.gradient-border {
  border: 2px solid;
  border-image: linear-gradient(to right, #00ff00, #0000ff, #800080) 1;
  border-image-slice: 1;
}
</style>
