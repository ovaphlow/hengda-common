const path = require('path')

const Koa = require('koa')
const staticCache = require('koa-static-cache')
const bodyParser = require('koa-bodyparser')

const config = require('./config')

const app = new Koa()

app.env = config.env

app.use(staticCache(path.join(__dirname, 'public'), {
  maxAge: 30 * 24 * 60 * 60
}))

app.use(bodyParser())

app.use(async (ctx, next) => {
  await next()
  const rt = ctx.response.get('X-Response-Time')
  console.log(`${new Date()} [${ctx.method}] ${ctx.url} - ${rt}`)
})

app.use(async (ctx, next) => {
  const start = Date.now()
  await next()
  const ms = Date.now() - start
  ctx.set('X-Response-Time', `${ms}ms`)
})

app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
})

const userRouter = require('./routes/user')
app.use(userRouter.routes())
app.use(userRouter.allowedMethods())

const deptRouter = require('./routes/dept')
app.use(deptRouter.routes())
app.use(deptRouter.allowedMethods())

const modelRouter = require('./routes/model')
app.use(modelRouter.routes())
app.use(modelRouter.allowedMethods())

const trainRouter = require('./routes/train')
app.use(trainRouter.routes())
app.use(trainRouter.allowedMethods())

const routeRouter = require('./routes/route')
app.use(routeRouter.routes())
app.use(routeRouter.allowedMethods())

module.exports = app
