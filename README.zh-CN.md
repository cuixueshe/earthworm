<div align="center">
  <img alt="Earthworm" width="120" height="120" src="./apps/client/public/logo.png">
  <h1>Earthworm</h1>
  <span>中文 | <a href="./README.md">英文</a></span>
</div>

## ⚡ 介绍

通过连词构句的方式让你更好的学习英语~ 😊

## 🚀 如何开始？

**以下所有相关操作都基于项目根目录位置，请注意检查不要出错！**

### 0. 注意事项

- **pnpm version >= 8**

  ```bash
  corepack enable
  ```

- **Node.js version >= v20**
  > 使用来自 .node-version 的版本 [支持的工具](https://github.com/shadowspawn/node-version-usage#compatibility-testing)
- **MySQL version >= 8.0.0**
- **Redis version >= 5.0.0**
- 项目依赖 **Docker**，所以请确保你本地已安装并成功运行

```bash
docker --version # Docker version 24.0.7, build afdd53b

node --version # v20+

pnpm -v # 8+
```

### 1. 安装依赖

```bash
pnpm install
```

### 2. 配置 `.env` 文件

可以选择将 `./apps/api/.env.example` 文件内容复制到 `./apps/api/.env`，请注意 `example` 文件中的是示例配置，主要是一些系统的环境变量信息，比如：数据库连接地址、用户名、密码、端口、密钥等等，后端服务会从此文件中读取配置信息，**当然你也可以更改成你自己的配置信息**

Windows 用户推荐快捷键复制粘贴，Linux 用户可以通过下面的命令进行操作

```bash
cp ./apps/api/.env.example ./apps/api/.env
```

### 3. 启动 Docker Compose 服务

后端用到了 MySQL 和 Redis 服务，通过下面在 `package.json` 中配置的命令启动和停止

```bash
# 启动
pnpm docker:start

# 下面这些命令等你用的时候在执行，不要傻乎乎的刚启动就停止哈 😊
# 停止
pnpm docker:stop
# 删除
pnpm docker:delete
# 完全删除（包括 Volume 数据）
pnpm docker:down
```

当然如果你更喜欢手动挡

```bash
docker compose up -d
docker compose stop
docker compose down

# 兼容老版本 docker 的命令
docker-compose up -d
```

### 4. 初始化数据库表结构

执行这个命令时，尽量与上个命令间隔一点时间，因为刚刚使用的 `-d` 参数会让其服务挂起在后台执行，此时 docker 服务可能还在 running 中，若是发现报错了那就再执行一遍 😊

```bash
pnpm db:init
```

### 5. 创建并上传课程数据

**只有第一次初始化数据库后需要执行**

```bash
pnpm db:upload
```

### 6. 启动后端服务

```bash
pnpm dev:serve
```

### 7. 启动前端服务

```bash
pnpm dev:client
```

## ⚒ 关于测试

**提交 commit 前先跑测试，测试通过后再提交代码，以免产生多次 commit 来解决测试问题的情况出现**

### 前端测试

主要就是 Vitest 的单测以及 cypress 的自动化测试，执行以下命令：

```bash
# 进入前端项目目录
cd apps/client

# vitest
pnpm test:unit:run
# cypress
pnpm test:e2e:run

# 监听 vitest，方便热更新看测试结果
pnpm test:unit:watch
```

### 后端测试

主要就是 Jest 的单测和端对端测试，但需要接入测试的数据库，所以需要先确保

1. Docker Compose 中的 testdb 和 testRedis 服务正常启动
2. `.env.test` 文件中的配置信息是正确的，如果没有这个文件，可以复制 `apps/api/.env.test.example` 文件内容到 `apps/api/.env.test` 文件，下面有提供命令直接用

执行以下命令：

```bash
# 进入后端项目目录
cd apps/api

# 如果有 .env.test 文件，就不需要跑这一步了
cp .env.test.example .env.test

# 单测
pnpm test:unit:run
# 端对端测试
pnpm test:e2e:run
# 单测和端对端测试一起跑
pnpm test
```

## ❓ 常见问题解答

### 数据库连接不上

我的 Docker 和里面的数据库都正常跑起来了，但是跑 `db:init` 命令时还是报错，提示数据库连接失败

可以检查下 `.env` 文件中的数据库配置是否正确，甚至是这个文件有没有！😠

### 如何正确的更新课程数据？

当你发现有错误的课程数据并修改后，应当使用下面的命令将课程数据更新到数据库中

```bash
pnpm db:update
```

### pnpm install 报错？

某些依赖模块需要编译安装，因此需要相关编译环境。如果没有对应环境则会编译失败， 且不同模块所需编译环境不同，因此具体问题需要具体分析。
以下列出已经碰到过的具体问题。

先尝试使用下面的命令更新 `pnpm`

```shell
pnpm i -g
# or
pnpm i -g pnpm
# or
npx pnpm i -g pnpm@latest
```

**在 Windows 上安装 argon2 模块失败的处理方式**

- 安装 Visual Studio 2015 以上版本的组件，具体来说是 “使用 C++的桌面开发” 这个组件。（实际上包含 C++相关开发工具库的组件都可以）
- 编译过程中遇到中文乱码时，在命令行中执行 `chcp 437` 后，再重新运行 install 命令。

### WSL2 中 docker 无权访问?

在 Windows 中使用 wsl2 做为开发环境时，通过 `docker compose up -d` 启动 docker 出现如下错误：

```bash
permission denied while trying to connect to the Docker daemon socket at unix:///var/run/docker.sock: Get "http://%2Fvar%2Frun%2Fdocker.sock/v1.24/containers/json": dial unix /var/run/docker.sock: connect: permission denied
```

> 解决方法

将当前的用户添加到 docker 组中

```bash
# 添加 docker 用户组
sudo groupadd docker
# 将登录用户加入到 docker 用户组中
sudo gpasswd -a $USER docker
# 更新用户组
newgrp docker
# 测试 docker 命令是否正常使用
docker images
```

## 🤝 前端开发规范

1. 不要解构 pinia 的 store
   - 解构会导致响应式丢失问题（ref 类型也会变成普通类型）
     - 使用 storeToRefs 非常的麻烦
   - 带上 store 代码可读性也会更好一点 一眼就能知道数据的来源是哪里
2. composables 里面不要包含 UI 逻辑
   1. useMessage 之类的
   2. router 相关的也不要放进去（不便于测试 我们把 router 划分为 UI 逻辑）

## 🌟 贡献者

在此感谢所有为 Earthworm 做出过贡献的人！🎉

<a href="https://github.com//cuixueshe/earthworm/graphs/contributors"><img src="https://contributors.nn.ci/api?repo=cuixueshe/earthworm" /></a>
