import { defineAppConfig } from "#imports";

export default defineAppConfig({
  ui: {
    primary: "purple",
    gray: "cool",
    modal: {
      container: "items-center",
      overlay: {
        background: "bg-black/75 dark:bg-black/75",
      },
      background: "dark:bg-gray-800",
    },
    slideover: {
      overlay: {
        background: "bg-black/75 dark:bg-black/75",
      },
      background: "bg-white dark:bg-gray-800",
    },
  },
});
