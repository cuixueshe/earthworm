# Earthworm

通过连词构句的方式让你更好的学习英语~ 😊

## 如何开始？

### ⚠️ 开始前的注意事项

- **Node.js version >= v20**
- 该项目依赖 **Docker**，所以请确保你本地已安装并成功运行
- 下面所提到的相关操作基于当前项目的根目录位置，请注意检查不要出错

```bash
docker --version # Docker version 24.0.7, build afdd53b

node --version # v20+
```

### 1. 安装依赖

```bash
pnpm install
```

### 2. 复制 `.env.example` 内容到 `.env` 文件

若文件不存在则需要手动创建，Linux 用户可以通过下面的命令进行操作

> 主要存储系统的环境变量信息，如数据库连接地址、用户名、密码、端口、密钥等等，后端服务会从此文件中读取配置，当然你也可以更改为你的配置信息

```bash
cp .env.example .env
```

### 3. 启动/停止/删除 Docker 服务

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
pnpm serve:dev
```

### 7. 启动前端服务

```bash
pnpm client:dev
```

## 常见问题解答

### 如何正确的更新课程数据？

⚠️ 多次执行 `pnpm db:upload` 会导致数据库中课程 `id` 持续自增并覆盖，所以当你发现有错误的课程数据并更改对应 `json` 文件后，应当使用下面的命令将课程数据更新到数据库中

```bash
pnpm db:update
```

### 数据库中的课程 id 被脚本自增覆盖后导致后端服务报错？

**尝试删除掉 Docker 容器，但重新启动后还是保留了之前的数据？**

因为数据是被存储在本地的 Docker Volumes 中，具体在 [docker-compose.yml](./docker-compose.yml) 最顶层中的配置参数 `volumes` 可以看到，所以即使你停止或者删除掉了容器，但数据还是会保留的。

⚠️ 要解决这个问题其实很简单，把 volumes 数据删除即可，当然我们也提供了一个命令给你，但需要注意的是使用之后，会删除数据库中的所有数据，你也需要重新跑一遍 **如何开始** 的步骤（从步骤 3 开始即可）

```bash
pnpm docker:down

# 本质上就是执行下面这个，意思是停止并删除容器服务 + 创建的 volumes 数据
docker-compose down --volumes
```

**TODO**: 后面看看有没有更优雅的方式规避或解决这个问题，一开始本来是想着直接删数据库数据，但是发现有外键约束。

## 前端开发规范

1. 不要解构 pinia 的 store
   - 解构会导致响应式丢失问题（ref 类型也会变成普通类型）
     - 使用 storeToRefs 非常的麻烦
   - 带上 store 代码可读性也会更好一点 一眼就能知道数据的来源是哪里
2. composables 里面不要包含 UI 逻辑
   1. useMessage 之类的
   2. router 相关的也不要放进去（不便于测试 我们把 router 划分为 UI 逻辑）
