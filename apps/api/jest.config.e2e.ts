import type { Config } from "jest";

import baseConfig from "./jest.config";

const config: Config = {
  ...baseConfig,
  testRegex: ".*\\.e2e-spec\\.ts$",
};

export default config;
