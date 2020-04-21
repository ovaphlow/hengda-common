const os = require('os')

const config = {
  env: 'development',
  app: {
    port: 5433,
    numChildProcesses: os.cpus().length
  },
  postgres: {
    user: 'hengda',
    password: 'srd@HD.1123',
    host: '192.168.1.246',
    port: 5432,
    database: 'hengda'
  }
}

module.exports = config
