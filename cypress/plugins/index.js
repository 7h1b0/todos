const task = require('@cypress/code-coverage/task');

module.exports = (on, config) => {
  task(on, config);

  return config;
};
