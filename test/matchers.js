expect.extend({
  async toContainText(receiver, text) {
    let pass = false;
    try {
      await receiver.waitForFunction(
        text => {
          if (text != null) {
            return document.body.textContent
              .replace(/\s+/g, ' ')
              .includes(text);
          }
          return false;
        },
        {
          polling: 'raf',
          timeout: 500,
        },
        text,
      );
      pass = true;
    } catch (error) {
      pass = false;
    }
    if (pass) {
      return {
        message: () => `expected "${text}" not to be found`,
        pass: true,
      };
    } else {
      return {
        message: () => `expected "${text}" to be found`,
        pass: false,
      };
    }
  },
});
