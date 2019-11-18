const Router = require('@koa/router')

const postgres = require('../postgres')

const router = new Router({
  prefix: '/api/common/train'
})

router
  .get('/', async ctx => {
    const client = await postgres.connect()
    try {
      const sql = `
        select
          *,
          (select v from public.common_data as cd where cd.id = t.master_id) as model
        from
          public.train as t
        order by id desc
      `
      const result = await client.query(sql)
      ctx.response.body = { message: '', content: result.rows }
    } catch (err) {
      console.error(err.stack)
      ctx.response.body = {message: '服务器错误'}
    } finally {
      client.release()
    }
  })
  .post('/', async ctx => {
    const client = await postgres.connect()
    try {
      const sql = `
        insert into
          public.train (master_id, name, remark)
          values ($1, $2, $3)
        returning id
      `
      const result = await client.query(sql, [
        ctx.request.body.master_id,
        ctx.request.body.name,
        ctx.request.body.remark
      ])
      ctx.response.body = { message: '', content: result.rows[0] }
    } catch (err) {
      console.error(err.stack)
      ctx.response.body = {message: '服务器错误'}
    } finally {
      client.release()
    }
  })

router
  .get('/:id', async ctx => {
    const client = await postgres.connect()
    try {
      const sql = `
        select * from public.train where id = $1 limit 1
      `
      const result = await client.query(sql, [ctx.params.id])
      ctx.response.body = {
        message: '',
        content: result.rows.length === 1 ? result.rows[0] : {}
      }
    } catch (err) {
      console.error(err.stack)
      ctx.response.body = {message: '服务器错误'}
    } finally {
      client.release()
    }
  })
  .put('/:id', async ctx => {
    const client = await postgres.connect()
    try {
      const sql = `
        update public.train
        set master_id = $1,
          name = $2,
          remark = $3
        where id = $4
      `
      const result = await client.query(sql, [
        ctx.request.body.master_id,
        ctx.request.body.name,
        ctx.request.body.remark,
        ctx.request.body.id
      ])
      ctx.response.body = { message: '', content: '' }
    } catch (err) {
      console.error(err.stack)
      ctx.response.body = {message: '服务器错误'}
    } finally {
      client.release()
    }
  })
  .delete('/:id', async ctx => {
    const client = await postgres.connect()
    try {
      const sql = `
        delete from public.train where id = $1
      `
      const result = await client.query(sql, [ctx.params.id])
      ctx.response.body = { message: '', content: '' }
    } catch (err) {
      console.error(err.stack)
      ctx.response.body = {message: '服务器错误'}
    } finally {
      client.release()
    }
  })

module.exports = router
