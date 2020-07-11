# hengda-setting

## setting 公共信息

铁路项目公用设置，包括部门、车型、车次、车组、用户。

### 运行

在 ui 目录下运行：

```shell
npm run watch

# 或
yarn watch
```

启动前端工程。

在 dispatcher 目录下运行：

```shell
npm run serve

# 或
yarn serve
```

启动服务。

### 部署

#### 1. 单独运行

ui 目录下运行：

```shell
npm run build

# 或
yarn build
```

构建前端工程。

成功后，将 dispatcher 目录复制到目标服务器中，运行：

```shell
npm run serve

# 或
node index.js
```

#### 2. 嵌入至其它 koa 程序

目标 koa 程序需要满足前置条件：

```shell
npm install @koa/router koa-mount koa-bodyparser koa-static pg

# 或
yarn add @koa/router koa-mount koa-bodyparser koa-static pg
```

以及在 util 目录下包括 logger.js 和 postgres.js 文件。

ui 目录下运行：

```shell
npm run build

# 或
yarn build
```

构建前端工程。

成功后复制 setting.js, public/ 到目标工程中。

在目标工程的主文件中增加：

```javascript
const mount = require('koa-mount');

const setting = require('./setting');

app.use(mount('/', setting));
```

之后再运行目标工程。
