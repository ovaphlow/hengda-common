const path = require('path');

const bunyan = require('bunyan');

const logger = bunyan.createLogger({
  name: 'harold-dispatcher',
  streams: [
    {
      level: 'info',
      stream: process.stdout,
    },
    {
      level: 'error',
      path: path.join(__dirname, '..', 'hengda-setting-error.log'),
    },
  ],
});

module.exports = logger;
