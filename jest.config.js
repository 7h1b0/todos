module.exports = {
  testEnvironment: './test/puppeteer-environment',
  setupTestFrameworkScriptFile: '<rootDir>/test/setupTest.js',
  moduleDirectories: ['node_modules', 'test'],
  automock: false,
  clearMocks: true,
  errorOnDeprecated: true,
  coveragePathIgnorePatterns: ['/node_modules/', '/test/'],
};
