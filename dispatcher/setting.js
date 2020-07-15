const path = require('path');

const Koa = require('koa');
const serve = require('koa-static');
const bodyParser = require('koa-bodyparser');
const Router = require('@koa/router');

const logger = require('./util/logger');
const postgres = require('./util/postgres');

const app = new Koa();

app.env = 'production';

app.use(serve(path.join(__dirname, 'public'), {
  // maxage: 1000 * 60 * 60 * 24 * 7,
  gzip: true,
}));

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

const router = new Router({
  prefix: '/api/setting',
});

router.post('/user/sign-in/super', async (ctx) => {
  const client = await postgres.connect();
  try {
    const sql = `
      select u.id, u.master_id, u.username, u.name, u.phone, u.remark, u.auth_super, u.dept_id, u.master_id,
        (select v from public.common_data where id = u.master_id) as dept2,
        (select v from public.common_data where id = u.dept_id) as dept
      from public.user as u
      where username = $1 and password = $2 and auth_super = 1
    `;
    const result = await client.query(sql, [
      ctx.request.body.username,
      ctx.request.body.password,
    ]);
    if (result.rows.length === 1) {
      ctx.response.body = { message: '', content: result.rows[0] };
    } else {
      ctx.response.body = { message: '用户名或密码错误' };
    }
  } catch (err) {
    logger.error(err.stack);
    ctx.response.body = { message: '服务器错误' };
  } finally {
    client.release();
  }
});

router.get('/user/:id', async (ctx) => {
  const client = await postgres.connect();
  try {
    const sql = `
      select u.id, u.master_id, u.username, u.name, u.phone, u.remark, u.auth_super, u.dept_id, u.master_id,
        (select v from public.common_data where id = u.master_id) as dept2,
        (select v from public.common_data where id = u.dept_id) as dept
      from public.user as u
      where id = $1
      limit 1
    `;
    const result = await client.query(sql, [parseInt(ctx.params.id, 10)]);
    ctx.response.body = {
      message: '',
      content: result.rows.length === 1 ? result.rows[0] : {},
    };
  } catch (err) {
    logger.error(err.stack);
    ctx.response.body = { message: '服务器错误' };
  } finally {
    client.release();
  }
});

router.put('/user/:id', async (ctx) => {
  const client = await postgres.connect();
  try {
    const sql = `
      update public.user
      set username = $1, name = $2, phone = $3, master_id = $4, remark = $5, dept_id = $6
      where id = $7
    `;
    const result = await client.query(sql, [
      ctx.request.body.username,
      ctx.request.body.name,
      ctx.request.body.phone,
      parseInt(ctx.request.body.master_id, 10),
      ctx.request.body.remark,
      parseInt(ctx.request.body.dept_id, 10),
      parseInt(ctx.params.id, 10),
    ]);
    ctx.response.body = { message: '', content: result };
  } catch (err) {
    logger.error(err.stack);
    ctx.response.body = { message: '服务器错误' };
  } finally {
    client.release();
  }
});

router.delete('/user/:id', async (ctx) => {
  const client = await postgres.connect();
  try {
    const sql = `
      delete from public.user where id = $1
    `;
    await client.query(sql, [parseInt(ctx.params.id, 10)]);
    ctx.response.body = { message: '', content: '' };
  } catch (err) {
    logger.error(err.stack);
    ctx.response.body = { message: '服务器错误' };
  } finally {
    client.release();
  }
});

router.get('/user/', async (ctx) => {
  const client = await postgres.connect();
  try {
    const sql = `
      select u.id, u.master_id, u.username, u.name, u.phone, u.remark, u.auth_super as super, u.dept_id, u.master_id,
        (select v from public.common_data where id = u.master_id) as dept2,
        (select v from public.common_data where id = u.dept_id) as dept
      from public.user as u
      order by id desc
    `;
    const result = await client.query(sql);
    ctx.response.body = { message: '', content: result.rows };
  } catch (err) {
    logger.error(err.stack);
    ctx.response.body = { message: '服务器错误' };
  } finally {
    client.release();
  }
});

router.post('/user/', async (ctx) => {
  const client = await postgres.connect();
  try {
    const sql = `
      insert into public.user
        (master_id, username, password, name, phone, remark, auth_super, position)
      values ($1, $2, $3, $4, $5, $6, 0, '')
      returning id
    `;
    const result = await client.query(sql, [
      ctx.request.body.master_id,
      ctx.request.body.username,
      ctx.request.body.password,
      ctx.request.body.name,
      ctx.request.body.phone,
      ctx.request.body.remark,
    ]);
    ctx.response.body = { message: '', content: result[0] };
  } catch (err) {
    logger.error(err.stack);
    ctx.response.body = { message: '服务器错误' };
  } finally {
    client.release();
  }
});

router.get('/train/:id', async (ctx) => {
  const client = await postgres.connect();
  try {
    const sql = `
      select * from public.train where id = $1 limit 1
    `;
    const result = await client.query(sql, [parseInt(ctx.params.id, 10)]);
    ctx.response.body = {
      message: '',
      content: result.rows.length === 1 ? result.rows[0] : {},
    };
  } catch (err) {
    logger.error(err.stack);
    ctx.response.body = { message: '服务器错误' };
  } finally {
    client.release();
  }
});

router.put('/train/:id', async (ctx) => {
  const client = await postgres.connect();
  try {
    const sql = `
      update public.train
      set master_id = $1,
        name = $2,
        remark = $3
      where id = $4
    `;
    const result = await client.query(sql, [
      ctx.request.body.master_id,
      ctx.request.body.name,
      ctx.request.body.remark,
      parseInt(ctx.params.id, 10),
    ]);
    ctx.response.body = { message: '', content: result };
  } catch (err) {
    logger.error(err.stack);
    ctx.response.body = { message: '服务器错误' };
  } finally {
    client.release();
  }
});

router.delete('/train/:id', async (ctx) => {
  const client = await postgres.connect();
  try {
    const sql = `
      delete from public.train where id = $1
    `;
    const result = await client.query(sql, [parseInt(ctx.params.id, 10)]);
    ctx.response.body = { message: '', content: result };
  } catch (err) {
    logger.error(err.stack);
    ctx.response.body = { message: '服务器错误' };
  } finally {
    client.release();
  }
});

router.get('/train/', async (ctx) => {
  const client = await postgres.connect();
  try {
    const sql = `
      select
        *,
        (select v from public.common_data as cd where cd.id = t.master_id) as model
      from
        public.train as t
      order by id desc
    `;
    const result = await client.query(sql);
    ctx.response.body = { message: '', content: result.rows };
  } catch (err) {
    logger.error(err.stack);
    ctx.response.body = { message: '服务器错误' };
  } finally {
    client.release();
  }
});

router.post('/train/', async (ctx) => {
  const client = await postgres.connect();
  try {
    const sql = `
      insert into
        public.train (master_id, name, remark)
        values ($1, $2, $3)
      returning id
    `;
    const result = await client.query(sql, [
      ctx.request.body.master_id,
      ctx.request.body.name,
      ctx.request.body.remark,
    ]);
    ctx.response.body = { message: '', content: result };
  } catch (err) {
    logger.error(err.stack);
    ctx.response.body = { message: '服务器错误' };
  } finally {
    client.release();
  }
});

router.get('/common/:id/sub/', async (ctx) => {
  const client = await postgres.connect();
  try {
    const sql = `
      select * from public.common_data where master_id = $1 order by id desc
    `;
    const result = await client.query(sql, [ctx.params.id]);
    ctx.response.body = { message: '', content: result.rows };
  } catch (err) {
    logger.error(err.stack);
    ctx.response.body = { message: '服务器错误' };
  } finally {
    client.release();
  }
});

router.post('/common/:id/sub', async (ctx) => {
  const client = await postgres.connect();
  try {
    const sql = `
      insert into public.common_data
        (master_id, category, k, v, remark)
      values ($1, $2, '', $3, $4)
      returning id
    `;
    const result = await client.query(sql, [
      parseInt(ctx.params.id, 10),
      ctx.request.query.category,
      ctx.request.body.v,
      ctx.request.body.remark,
    ]);
    ctx.response.body = { message: '', content: result.rows[0] };
  } catch (err) {
    logger.error(err.stack);
    ctx.response.body = { message: '服务器错误' };
  } finally {
    client.release();
  }
});

router.get('/common/:id', async (ctx) => {
  const client = await postgres.connect();
  try {
    const sql = `
      select * from public.common_data where id = $1 limit 1
    `;
    const result = await client.query(sql, [parseInt(ctx.params.id, 10)]);
    ctx.response.body = {
      message: '',
      content: result.rows.length === 1 ? result.rows[0] : {},
    };
  } catch (err) {
    logger.error(err.stack);
    ctx.response.body = { message: '服务器错误' };
  } finally {
    client.release();
  }
});

router.put('/common/:id', async (ctx) => {
  const client = await postgres.connect();
  try {
    const sql = `
      update public.common_data
      set v = $1 , remark = $2
      where id = $3
    `;
    const result = await client.query(sql, [
      ctx.request.body.v,
      ctx.request.body.remark,
      parseInt(ctx.params.id, 10),
    ]);
    ctx.response.body = { message: '', content: result };
  } catch (err) {
    logger.error(err.stack);
    ctx.response.body = { message: '服务器错误' };
  } finally {
    client.release();
  }
});

router.delete('/common/:id', async (ctx) => {
  const client = await postgres.connect();
  const sql = `
    delete from public.common_data where id = $1 or master_id = $2
  `;
  try {
    const result = await client.query(sql, [
      parseInt(ctx.params.id, 10),
      parseInt(ctx.params.id, 10),
    ]);
    ctx.response.body = { message: '', content: result };
  } catch (err) {
    logger.error(err.stack);
    ctx.response.body = { message: '服务器错误' };
  } finally {
    client.release();
  }
});

router.get('/common/', async (ctx) => {
  const client = await postgres.connect();
  try {
    const sql = `
      select *,
        (select count(*) from public.common_data where master_id = cd.id) as qty
      from public.common_data as cd
      where category = $1
      order by id desc
    `;
    const result = await client.query(sql, [ctx.request.query.category]);
    ctx.response.body = { message: '', content: result.rows };
  } catch (err) {
    logger.error(err.stack);
    ctx.response.body = { message: '服务器错误' };
  } finally {
    client.release();
  }
});

router.post('/common/', async (ctx) => {
  const client = await postgres.connect();
  try {
    const sql = `
      insert into public.common_data
        (master_id, category, k, v, remark)
      values (0, $1, '', $2, $3)
      returning id
    `;
    const result = await client.query(sql, [
      ctx.request.query.category,
      ctx.request.body.v,
      ctx.request.body.remark,
    ]);
    ctx.response.body = {
      message: '',
      content: result.rows.length === 1 ? result.rows[0] : {},
    };
  } catch (err) {
    logger.error(err.stack);
    ctx.response.body = { message: '服务器错误' };
  } finally {
    client.release();
  }
});

app.use(router.routes());
app.use(router.allowedMethods());

module.exports = app;
