<template>
  <div class="flex min-h-full flex-1 justify-center px-6 py-12 lg:px-8">
    <UserMenus
      :menus="userMenus"
      :defaultMenuName="defaultMenuName"
      @changeMenu="handleChangeMenu"
    />
    <div class="flex-1 pl-4">
      <component :is="currentComponent"></component>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, shallowRef, watchEffect } from "vue";
import { useRoute } from "vue-router";
import UserHome from "~/components/user/Home.vue";
import UserMenus from "~/components/user/Menu.vue";
import UserSetting from "~/components/user/Setting.vue";

interface ComponentMap {
  Home: typeof UserHome;
  Setting: typeof UserSetting;
}

interface Menu {
  name: string;
  component: keyof ComponentMap;
}

const route = useRoute();
const userMenus = ref([
  { name: "主页", component: "Home" },
  { name: "设置", component: "Setting" },
]);
const componentMap: ComponentMap = {
  Home: UserHome,
  Setting: UserSetting,
};
const currentComponent = shallowRef(componentMap.Home); // shallowRef is used to fixed Vue warn

const defaultMenuName = computed(() =>
  route.query.displayComponent === "Setting" ? "设置" : "主页"
);

watchEffect(() => {
  const routeComponent = route.query.displayComponent;
  currentComponent.value =
    componentMap[routeComponent as keyof typeof componentMap] ||
    componentMap.Home;
});

function handleChangeMenu(menu: Menu) {
  currentComponent.value = componentMap[menu.component];
}
</script>
