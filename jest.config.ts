const nextJest = require('next/jest');
const createJestConfig = nextJest({ dir: '.' });
const customConfig = {
  displayName: 'nextjs-chakraui-typescript',
  injectGlobals: true,
  rootDir: '.',
  collectCoverageFrom: ['./**/*', '!**/node_modules/**'],
  coverageDirectory: 'coverage',
  moduleFileExtensions: ['js', 'ts', 'tsx', 'jsx'],
  moduleNameMapper: {
    '\\.(css|sass|scss)$': 'identity-obj-proxy',
  },
  testEnvironment: 'jsdom',
  globals: {
    isolatedModules: true,
  },
};

module.exports = createJestConfig(customConfig);
export {};
