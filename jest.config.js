module.exports = {
  testEnvironment: './test/puppeteer-environment',
  moduleDirectories: ['node_modules'],
  automock: false,
  clearMocks: true,
  errorOnDeprecated: true,
  coveragePathIgnorePatterns: ['/node_modules/', '/test/'],
};
