// @ts-check

/** @typedef { import("@ianvs/prettier-plugin-sort-imports").PluginConfig } SortImportsConfig */
/** @typedef { import("prettier").Config } PrettierConfig */
/** @typedef { import("prettier-plugin-tailwindcss").PluginOptions } TailwindConfig */

/** @type { PrettierConfig | SortImportsConfig | TailwindConfig } */
export default {
  printWidth: 100,
  singleAttributePerLine: true,
  plugins: ["@ianvs/prettier-plugin-sort-imports", "prettier-plugin-tailwindcss"],
  tailwindConfig: "./apps/client/tailwind.config.js",
  importOrderParserPlugins: ["typescript", "jsx", "decorators-legacy"],
  importOrderTypeScriptVersion: "5.0.0",
  importOrder: [
    "<TYPES>",
    "",
    "<THIRD_PARTY_MODULES>",
    "",
    "<TYPES>^@earthworm",
    "^@earthworm/(.*)$",
    "<TYPES>^[.|..|~]",
    "^~/",
    "^[../]",
    "^[./]",
  ],
};
