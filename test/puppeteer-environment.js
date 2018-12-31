const NodeEnvironment = require('jest-environment-node');
const puppeteer = require('puppeteer');

class PuppeteerEnvironment extends NodeEnvironment {
  async setup() {
    const browser = await puppeteer.launch({
      headless: process.env.CI != null,
      slowMo: process.env.CI ? 0 : 30,
    });
    this.global.browser = browser;

    this.global.visit = async url => {
      const page = await browser.newPage();
      await page.goto(url);
      this.global.page = page;

      return page;
    };
  }

  async teardown() {
    await this.global.browser.close();
  }
}

module.exports = PuppeteerEnvironment;
