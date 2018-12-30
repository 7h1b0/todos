const NodeEnvironment = require('jest-environment-node');
const puppeteer = require('puppeteer');

class PuppeteerEnvironment extends NodeEnvironment {
  async setup() {
    const browser = await puppeteer.launch({
      headless: process.env.CI != null,
      slowMo: process.env.CI ? 0 : 50,
    });
    this.global.browser = browser;
  }

  async teardown() {
    this.global.browser.close();
  }
}

module.exports = PuppeteerEnvironment;
