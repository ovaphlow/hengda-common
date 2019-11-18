const { Pool } = require('pg')

const config = require('./config')

const pool = new Pool({
  user: config.postgres.user,
  password: config.postgres.password,
  host: config.postgres.host,
  port: config.postgres.port,
  database: config.postgres.database
})

pool.on('error', (err, client) => {
  console.error(err)
  process.exit(-1)
})

module.exports = pool
