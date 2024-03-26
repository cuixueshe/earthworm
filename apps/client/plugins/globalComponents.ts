import { defineNuxtPlugin } from "nuxt/app";
import Divider from "~/components/common/Divider.vue";
import Title from "~/components/common/Title.vue";

const globalComponents = [
  { name: "Title", component: Title },
  { name: "Divider", component: Divider },
];

export default defineNuxtPlugin(nuxtApp => {
  globalComponents.forEach(comp => {
    nuxtApp.vueApp.component(comp.name, comp.component);
  });
});
