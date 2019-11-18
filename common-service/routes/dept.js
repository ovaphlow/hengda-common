const Router = require('@koa/router')

const postgres = require('../postgres')

const router = new Router({
  prefix: '/api/common/dept'
})

router
  .get('/', async ctx => {
    const client = await postgres.connect()
    try {
      const sql = `
        select *,
          (select count(*) from public.common_data where master_id = cd.id) as qty
        from public.common_data as cd
        where category = '车间'
        order by id desc
      `
      const result = await client.query(sql)
      ctx.response.body = {message: '', content: result.rows}
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
        insert into public.common_data
          (master_id, category, k, v, remark)
        values (0, '车间', '', $1, $2)
        returning id
      `
      const result = await client.query(sql, [
        ctx.request.body.v,
        ctx.request.body.remark
      ])
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

router
  .get('/sub/', async ctx => {
    const client = await postgres.connect()
    try {
      const sql = `
        select * from public.common_data where category = '部门' order by id desc
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

router
  .get('/:id', async ctx => {
    const client = await postgres.connect()
    try {
      const sql = `
        select * from public.common_data where id = $1 limit 1
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
        update public.common_data
        set v = $1 , remark = $2
        where id = $3
      `
      const result = await client.query(sql, [
        ctx.request.body.v,
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

router
  .get('/:id/sub', async ctx => {
    const client = await postgres.connect()
    try {
      const sql = `
        select * from public.common_data where master_id = $1 order by id desc
      `
      const result = await client.query(sql, [ctx.params.id])
      ctx.response.body = { message: '', content: result.rows }
    } catch (err) {
      console.error(err.stack)
      ctx.response.body = {message: '服务器错误'}
    } finally {
      client.release()
    }
  })
  .post('/:id/sub', async ctx => {
    const client = await postgres.connect()
    try {
      const sql = `
        insert into public.common_data
          (master_id, category, k, v, remark)
        values ($1, '部门', '', $2, $3)
        returning id
      `
      const result = await client.query(sql, [
        ctx.params.id,
        ctx.request.body.v,
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

module.exports = router
