module.exports = {
  automock: false,
  clearMocks: true,
  errorOnDeprecated: true,
  testPathIgnorePatterns: ['<rootDir>/cypress/'],
  testEnvironment: 'jest-environment-node',
  collectCoverageFrom: ['src/**/*.{js,jsx}'],
  reporters: ['default', 'github-actions'],
  transform: {
    '^.+\\.(t|j)sx?$': '@swc/jest',
  },
};
