module.exports = {
  displayName: 'e2e',
  testEnvironment: './puppeteer-environment',
  setupTestFrameworkScriptFile: '<rootDir>/setupTest.js',
  moduleDirectories: ['node_modules', '.'],
  coveragePathIgnorePatterns: ['.'],
};
