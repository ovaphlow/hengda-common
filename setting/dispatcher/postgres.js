const { Pool } = require('pg');

const logger = require('./logger');

const pool = new Pool({
  user: 'hengda',
  password: 'srd@HD.1123',
  host: '192.168.1.246',
  port: 5432,
  database: 'hengda',
});

pool.on('error', (err, client) => {
  logger.error(client, err);
  process.exit(-1);
});

module.exports = pool;
