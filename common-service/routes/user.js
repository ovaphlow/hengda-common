const Router = require('@koa/router')

const postgres = require('../postgres')

const router = new Router({
  prefix: '/api/common/user'
})

module.exports = router

router.post('/sign-in/super', async ctx => {
  const client = await postgres.connect()
  try {
    const sql = `
      select u.id, u.master_id, u.username, u.name, u.phone, u.remark, u.auth_super, u.dept_id, u.master_id,
        (select v from public.common_data where id = u.master_id) as dept2,
        (select v from public.common_data where id = u.dept_id) as dept
      from public.user as u
      where username = $1 and password = $2 and auth_super = 1
    `
    const result = await client.query(sql, [
      ctx.request.body.username,
      ctx.request.body.password
    ])
    if (result.rows.length === 1) {
      ctx.response.body = {message: '', content: result.rows[0]}
    } else {
      ctx.response.body = {message: '用户名或密码错误'}
    }
  } catch (err) {
    console.error(err.stack)
    ctx.response.body = {message: '服务器错误'}
  } finally {
    client.release()
  }
})

router.put('/password', async ctx => {
  const client = await postgres.connect()
  try {
    let sql = `
      select password from public.user where id = $1 limit 1
    `
    const result = await client.query(sql, [ctx.request.body.id])
    if (result.rows[0].password !== ctx.request.body.password) {
      ctx.response.body = {message: '原密码输入错误'}
      return
    }
    sql = `
      update public.user
      set password = $1
      where id = $2
    `
    await client.query(sql, [ctx.request.body.password1, ctx.request.body.id])
    ctx.response.body = {message: '', content: ''}
  } catch (err) {
    console.error(err.stack)
    ctx.response.body = {message: '服务器错误'}
  } finally {
    client.release()
  }
})

router.get('/:id', async ctx => {
  const client = await postgres.connect()
  try {
    const sql = `
      select u.id, u.master_id, u.username, u.name, u.phone, u.remark, u.auth_super, u.dept_id, u.master_id,
        (select v from public.common_data where id = u.master_id) as dept2,
        (select v from public.common_data where id = u.dept_id) as dept
      from public.user as u
      where id = $1
      limit 1
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
    let sql = `
      update public.user
      set username = $1, name = $2, phone = $3, master_id = $4, remark = $5, dept_id = $6
      where id = $7
    `
    const result = await client.query(sql, [
      ctx.request.body.username,
      ctx.request.body.name,
      ctx.request.body.phone,
      parseInt(ctx.request.body.master_id),
      ctx.request.body.remark,
      parseInt(ctx.request.body.dept_id),
      parseInt(ctx.params.id)
    ])
    ctx.response.body = { message: '', content: result }
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
    let sql = `
      delete from public.user where id = $1
    `
    await client.query(sql, [ctx.params.id])
    ctx.response.body = { message: '', content: '' }
  } catch (err) {
    console.error(err.stack)
    ctx.response.body = {message: '服务器错误'}
  } finally {
    client.release()
  }
})

router.get('/', async ctx => {
  const client = await postgres.connect()
  try {
    const sql = `
      select u.id, u.master_id, u.username, u.name, u.phone, u.remark, u.auth_super as super, u.dept_id, u.master_id,
        (select v from public.common_data where id = u.master_id) as dept2,
        (select v from public.common_data where id = u.dept_id) as dept
      from public.user as u
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
    let sql = `
      insert into public.user
        (master_id, username, password, name, phone, remark, auth_super, position)
      values ($1, $2, $3, $4, $5, $6, 0, '')
      returning id
    `
    const result = await client.query(sql, [
      ctx.request.body.master_id,
      ctx.request.body.username,
      ctx.request.body.password,
      ctx.request.body.name,
      ctx.request.body.phone,
      ctx.request.body.remark
    ])
    sql = `
      insert into cheliangduan.auth
        (master_id, super)
      values ($1, $2)
    `
    await client.query(sql, [result.rows[0].id, ctx.request.body.super])
    ctx.response.body = {message: '', content: ''}
  } catch (err) {
    console.error(err.stack)
    ctx.response.body = {message: '服务器错误'}
  } finally {
    client.release()
  }
})
