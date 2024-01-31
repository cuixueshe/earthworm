
<template>
  <div class="w-24 border-r border-solid border-gray-200">
    <div v-for="(menu, index) in menus" :key="index" class="box-content h-8 leading-8 py-2 cursor-pointer" :class="currentMenu === menu.name
      ? 'border-r-2 border-solid border-r-fuchsia-500 text-fuchsia-500'
      : ''
      " @click="handleChangeMenu(menu)">
      {{ menu.name }}
    </div>
  </div>
</template>

<script setup lang="ts">
type Menu = {
  name: string;
  component: any;
};

const props = defineProps<{
  menus: Menu[];
}>();

const emits = defineEmits(["changeMenu"]);

let currentMenu = ref<string>("");
const handleChangeMenu = (menu: Menu) => {
  currentMenu.value = menu.name;
  emits("changeMenu", menu);
};

const setDefaultMenu = () => {
  handleChangeMenu(props.menus[0])
}
onMounted(() => setDefaultMenu())
</script>
