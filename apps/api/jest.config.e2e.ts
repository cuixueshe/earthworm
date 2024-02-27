import baseConfig from './jest.config';
import type { Config } from 'jest';

const config: Config = {
  ...baseConfig,
  testRegex: '.*\\.e2e-spec\\.ts$',
};

export default config;
