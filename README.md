# hengda-setting

## setting 公共信息

铁路项目公用设置，包括部门、车型、车次、车组、用户。

### 运行

在 setting 目录下运行：

```shell
npm run watch
```

启动前端工程。

运行：

```shell
npm run serve
```

启动服务。

### 部署

setting 目录下运行：

```shell
npm run build
```

成功后，将 dispatcher，node_modules，public，package.json 复制到目标服务器中，运行

```shell
npm run serve
```

（需要Node.js环境）
