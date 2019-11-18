const Router = require('@koa/router')

const config = require('../config')

const router = new Router({
  prefix: '/api/train'
})

router
  .get('/', async ctx => {
  })
  .post('/', async ctx => {
  })

router
  .get('/:id', async ctx => {
  })
  .put('/:id', async ctx => {
  })
  .delete('/:id', async ctx => {
  })

module.exports = router
