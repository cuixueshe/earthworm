// @ts-check

/** @typedef  { import("@ianvs/prettier-plugin-sort-imports").PluginConfig } SortImportsConfig */
/** @typedef  { import("prettier").Config } PrettierConfig */

/** @type { PrettierConfig | SortImportsConfig } */
export default {
  semi: true,
  singleQuote: false,
  printWidth: 80,
  trailingComma: "all",
  singleAttributePerLine: true,
  plugins: ["@ianvs/prettier-plugin-sort-imports"],
  importOrderParserPlugins: ["typescript", "jsx", "decorators-legacy"],
  importOrderTypeScriptVersion: "5.0.0",
  importOrder: [
    "<TYPES>^(node:)",
    "<TYPES>",
    "<TYPES>^[.]",
    "<BUILTIN_MODULES>", // Node.js built-in modules
    "<THIRD_PARTY_MODULES>", // Imports not matched by other special words or groups.
    "^[.]",
  ],
};
