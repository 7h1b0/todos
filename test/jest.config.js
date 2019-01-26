module.exports = {
  displayName: 'e2e',
  testEnvironment: './puppeteer-environment',
  setupFilesAfterEnv: ['<rootDir>/setupTest.js'],
  moduleDirectories: ['node_modules', '.'],
  coveragePathIgnorePatterns: ['.'],
};
