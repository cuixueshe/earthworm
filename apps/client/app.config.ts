import { defineAppConfig } from "#imports";

export default defineAppConfig({
  ui: {
    primary: "purple",
    gray: "cool",
    modal: {
      width: "w-auto sm:max-w-none",
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
    card: {
      background: "dark:bg-gray-800",
    },
    container: {
      base: "py-5",
    },
    tooltip: {
      wrapper: "flex justify-center items-center",
      strategy: "override",
    },
    kbd: {
      default: {
        size: "md",
      },
    },
  },
});
