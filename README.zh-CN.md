<div align="center">
  <img alt="Earthworm" width="120" height="120" src="./apps/client/public/logo.png">
  <h1>Earthworm</h1>
  <span>中文 | <a href="./README.md">英文</a></span>
</div>

## ⚡ 介绍

通过连词构句的方式让你更好的学习英语~ 😊

## 🚀 如何开始？

### ⚠️ 注意事项

- **pnpm version >= 8**

  ```bash
  corepack enable
  ```

- **Node.js version >= v20**
  > 使用来自 .node-version 的版本 [支持的工具](https://github.com/shadowspawn/node-version-usage#compatibility-testing)
- **MySQL version >= 8.0.0**
- **Redis version >= 5.0.0**
- 项目依赖 **Docker**，所以请确保你本地已安装并成功运行
- 下面所提到的相关操作基于当前项目的根目录位置，请注意检查不要出错

```bash
docker --version # Docker version 24.0.7, build afdd53b

node --version # v20+

pnpm -v # 8+
```

### 1. 安装依赖

```bash
pnpm install
```

### 2. 复制 `.env.example` 内容到 `./apps/api/.env` 文件

若文件不存在则需要手动创建，Linux 用户可以通过下面的命令进行操作

> 主要存储系统的环境变量信息，如数据库连接地址、用户名、密码、端口、密钥等等，后端服务会从此文件中读取配置，当然你也可以更改为你的配置信息

```bash
cp .env.example ./apps/api/.env
```

### 3. 启动/停止/删除 Docker Compose 服务

后端用到了 MySQL 和 Redis 服务，通过下面在 `package.json` 中配置的命令启动和停止

```bash
# 启动
pnpm docker:start
# 停止
pnpm docker:stop
# 删除
pnpm docker:delete
```

当然如果你更喜欢手动挡

```bash
docker compose up -d
docker compose stop
docker compose down

# 兼容老版本 docker 的命令
docker-compose up -d
```

### 4. 初始化数据库

执行当前命令时，尽量跟上个命令间隔一点点时间，因为我们使用了 `-d` 参数会让其服务挂后台执行，可能还在 running 中，如果发现报错那就再执行一遍~

```bash
pnpm db:init
```

### 5. 创建并上传课程数据（只在第一次初始化数据库时执行）

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

## 常见问题解答

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

## 前端开发规范

1. 不要解构 pinia 的 store
   - 解构会导致响应式丢失问题（ref 类型也会变成普通类型）
     - 使用 storeToRefs 非常的麻烦
   - 带上 store 代码可读性也会更好一点 一眼就能知道数据的来源是哪里
2. composables 里面不要包含 UI 逻辑
   1. useMessage 之类的
   2. router 相关的也不要放进去（不便于测试 我们把 router 划分为 UI 逻辑）

## 贡献者

在此感谢所有为 Earthworm 做出过贡献的人！🎉

<a href="https://github.com//cuixueshe/earthworm/graphs/contributors"><img src="https://contributors.nn.ci/api?repo=cuixueshe/earthworm" /></a>
