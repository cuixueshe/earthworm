<template>
  <nav class="h-20 flex items-center justify-between shrink-0">
    <NuxtLink to="/">
      <div class="logo flex items-center">
        <img width="48" height="48" class="rounded-md overflow-hidden mr-6" src="/logo.png" alt="earth-worm-logo" />
        <h1 class="text-2xl leading-none font-black leading-normal text-wrap text-fuchsia-400">
          Earthworm
        </h1>
      </div>
    </NuxtLink>
    <div class="flex items-center">
      <button v-if="!userStore.user && route.name !== 'Auth-Login'" class="btn btn-sm btn-ghost mx-1 h-8 px-2"
        @click="handleLogin">
        Log in
      </button>
      <button v-else-if="!userStore.user && route.name !== 'Auth-Signup'" class="btn btn-sm btn-ghost mx-1 h-8 px-2"
        @click="handleSignup">
        Sign up
      </button>
      <div v-else class="dropdown dropdown-end">
        <button tabindex="0" class="btn btn-sm btn-ghost rounded-md mx-1 w-8 h-8 p-0">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
            class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
          </svg>
        </button>
        <ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-32">
          <li><a>User info</a></li>
          <li @click="handleLogout"><a>Log out</a></li>
          <!-- <li><a>Item 2</a></li> -->
        </ul>
      </div>
      <button class="btn btn-sm btn-ghost rounded-md mx-1 w-8 h-8 p-0" @click="toggleDarkMode">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
          class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
        </svg>
      </button>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useUserStore } from "~/store/user";
const route = useRoute();

const userStore = useUserStore();

const isAppearanceTransition =
  // @ts-expect-error: Transition API
  document.startViewTransition &&
  !window.matchMedia(`(prefers-reduced-motion: reduce)`).matches

const toggle = (isDark: boolean) => {
  if (!isDark) {
    document.documentElement.setAttribute("data-theme", "dark");
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.setAttribute("data-theme", "light");
    document.documentElement.classList.remove("dark");
  }
};

const toggleDarkMode = (event: MouseEvent) => {
  const isDark = document.documentElement.classList.contains("dark");

  if (!isAppearanceTransition) {
    toggle(isDark)
    return
  }
  const x = event.clientX
  const y = event.clientY
  const endRadius = Math.hypot(
    Math.max(x, innerWidth - x),
    Math.max(y, innerHeight - y)
  )

  // @ts-expect-error: Transition API
  const transition = document.startViewTransition(() => {
    toggle(isDark)
  })

  transition.ready.then(() => {
    const clipPath = [
      `circle(0px at ${x}px ${y}px)`,
      `circle(${endRadius}px at ${x}px ${y}px)`
    ]
    document.documentElement.animate(
      {
        clipPath: isDark ? clipPath : [...clipPath].reverse()
      },
      {
        duration: 300,
        easing: 'ease-in',
        pseudoElement: isDark
          ? '::view-transition-new(root)'
          : '::view-transition-old(root)'
      }
    )
  })
};

const setDarkMode = (state = false) => {
  if (state) {
    document.documentElement.setAttribute("data-theme", "dark");
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.setAttribute("data-theme", "light");
    document.documentElement.classList.remove("dark");
  }
};

const handleLogin = () => {
  navigateTo("/auth/login");
};

const handleSignup = () => {
  navigateTo("/auth/signup");
};

const message = useMessage();
const handleLogout = () => {
  userStore.logoutUser();
  cleanToken();
  message.success("logout success", {
    duration: 500,
    onLeave() {
      navigateTo("/");
    },
  });
};

onMounted(() => {
  const state =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;
  setDarkMode(state);
});
</script>
<style></style>