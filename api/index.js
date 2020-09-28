const Koa = require('koa');
const Router = require('@koa/router');
const bodyParser = require('koa-bodyparser');

const logger = require('../../hengda-pitchfork/dispatcher/util/bunyan');
const postgres = require('../../hengda-pitchfork/dispatcher/util/postgres');

const app = new Koa();

app.use(bodyParser());

const router = new Router({
  prefix: '/api/setting',
});

router.get('/', async (ctx) => {
  ctx.response.body = 'hengda-setting';
});

app.use(router.routes());
app.use(router.allowedMethods());

module.exports = app;
