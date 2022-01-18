module.exports = {
  automock: false,
  clearMocks: true,
  errorOnDeprecated: true,
  testPathIgnorePatterns: ['<rootDir>/cypress/'],
  testEnvironment: 'jest-environment-node',
  collectCoverageFrom: ['src/**/*.{js,jsx}'],
  transform: {
    '^.+\\.(t|j)sx?$': '@swc/jest',
  },
};
