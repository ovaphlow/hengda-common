const path = require('path');

const Koa = require('koa');
const staticCache = require('koa-static-cache');
const bodyParser = require('koa-bodyparser');

const logger = require('./logger');

const app = new Koa();

app.env = 'production';

app.use(staticCache(path.join(__dirname, '..', 'public'), {
  maxAge: 60 * 60 * 24 * 7,
}));

app.use(bodyParser());

app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set('X-Response-Time', `${ms}ms`);
});

app.use(async (ctx, next) => {
  await next();
  const rt = ctx.response.get('X-Response-Time');
  logger.log(`${new Date()} [${ctx.method}] ${ctx.url} - ${rt}`);
});

app.on('error', (err, ctx) => {
  logger.error('server error', err, ctx);
});

app.use(async (ctx, next) => {
  if (ctx.request.url === '/' && ctx.request.method === 'GET') {
    ctx.redirect('/index.html');
  } else {
    await next();
  }
});

const routerUser = require('./route/user');

(() => {
  app.use(routerUser.routes());
  app.use(routerUser.allowedMethods());
})();

const routerDept = require('./route/dept');

app.use(routerDept.routes());
app.use(routerDept.allowedMethods());

const routerModel = require('./route/model');

app.use(routerModel.routes());
app.use(routerModel.allowedMethods());

const routerTrain = require('./route/train');

app.use(routerTrain.routes());
app.use(routerTrain.allowedMethods());

const routerRoute = require('./route/route');

app.use(routerRoute.routes());
app.use(routerRoute.allowedMethods());

module.exports = app;
