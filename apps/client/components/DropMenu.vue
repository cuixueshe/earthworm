<template>
  <div
    class="dropdown dropdown-end"
    @click="toggleDropdown"
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
      v-if="showDropdown"
      ref="dropdownContainer"
      tabindex="0"
      class="dropdown-content menu p-2 w-52 bg-white border-gray-200 border-2 mt-2 rounded-md z-[1] dark:bg-theme-dark dark:border-gray-600"
    >
      <li
        v-for="(item, index) in showMenuOptions"
        :index="index"
      >
        <span
          @click="item.eventName"
          class="flex items-center gap-2 rounded-lg hover:text-gray-700 hover:bg-gray-100 dark:hover:text-white dark:hover:bg-fuchsia-500"
        >
          <span v-html="item.icon"></span>

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
    icon: `<svg
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
      </svg>`,
  },
  {
    title: "返回游戏",
    name: GO_BACK_GAME_NAME,
    eventName: handleGoBackGamePage,
    icon: `<svg xmlns="http://www.w3.org/2000/svg" class="size-5 opacity-75" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 11h4M8 9v4m7-1h.01M18 10h.01m-.69-5H6.68a4 4 0 0 0-3.978 3.59l-.017.152C2.604 9.416 2 14.456 2 16a3 3 0 0 0 3 3c1 0 1.5-.5 2-1l1.414-1.414A2 2 0 0 1 9.828 16h4.344a2 2 0 0 1 1.414.586L17 18c.5.5 1 1 2 1a3 3 0 0 0 3-3c0-1.545-.604-6.584-.685-7.258q-.01-.075-.017-.151A4 4 0 0 0 17.32 5"/></svg>`,
  },
  {
    title: "设置",
    name: "setting",
    eventName: handleSetting,
    icon: `<svg
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
    </svg>`,
  },
  {
    title: "登出",
    name: "logout",
    eventName: handleLogout,
    icon: `<svg xmlns="http://www.w3.org/2000/svg" class="size-5 opacity-75" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4m7 14l5-5l-5-5m5 5H9"/></svg>`,
  },
];
const showMenuOptions = computed(() => {
  return MENU_OPTIONS.filter(
    (menu) => menu.name !== GO_BACK_GAME_NAME || route.name !== "Main-id"
  );
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
