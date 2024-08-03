import { defineNuxtPlugin } from "nuxt/app";

import { setupHttp } from "../api/http";

export default defineNuxtPlugin(() => {
  setupHttp();
});
