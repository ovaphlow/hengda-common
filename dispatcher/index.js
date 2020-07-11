const cluster = require('cluster');
const http = require('http');
const os = require('os');

const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const mount = require('koa-mount');

const logger = require('./util/logger');
const setting = require('./setting');

const PORT = 8000;

const app = new Koa();

app.env = 'production';

app.use(bodyParser({
  encoding: 'utf-8',
  formLimit: '56kb',
  jsonLimit: '1mb',
}));

app.use(async (ctx, next) => {
  logger.info('-->', ctx.request.method, ctx.request.url);
  await next();
  logger.info('<--', ctx.request.method, ctx.request.url);
});

app.use(mount('/', setting));

if (cluster.isMaster) {
  logger.info(`主进程 PID:${process.pid}`);

  for (let i = 0; i < os.cpus().length; i += 1) {
    cluster.fork();
  }

  cluster.on('online', (worker) => {
    logger.info(`子进程 PID:${worker.process.pid}, 端口:${PORT}`);
  });

  cluster.on('exit', (worker, code, signal) => {
    logger.info(`子进程 PID:${worker.process.pid}终止，错误代码:${code}，信号:${signal}`);
    logger.info(`由主进程(PID:${process.pid})创建新的子进程`);
    cluster.fork();
  });
} else {
  http.createServer(app.callback()).listen(PORT);
}
