# 如何配置 Logto？

### 新贡献者可直接跳过前面三步

1. 如果你是新贡献者
2. 之前没有跑过项目
3. 已经过了一遍 README 中 **如何开始？** 执行步骤

可以直接跳过前面三个执行步骤，从第四步配置 `env` 文件开始，前面三步主要是为了确保旧版贡献者们配置迁移过来的环境是一致的，所以先删一删 😊

## 1. 删除 Docker Volumes

打开 Docker Desktop → Volumes

> 之前存储在本地的 Volumes 数据 **earthworm_data**

![1712924416987.png](https://cdn.jsdelivr.net/gh/fengstats/blogcdn@main/2024/1712924416987.png)

```bash
pnpm docker:down
```

执行结果

> earthworm_data 被删除掉了

![](https://cdn.jsdelivr.net/gh/fengstats/blogcdn@main/2024/20240412202140.png)

## 2. 启动 Docker Compose

需要等待安装 Logto/postgress 的镜像，可能会有点慢，参考配置一下镜像源会快很多：[Docker Hub 镜像加速配置](https://zhiurl.cn/NL3i9)

```bash
pnpm docker:start
```

执行结果

![](https://cdn.jsdelivr.net/gh/fengstats/blogcdn@main/2024/20240412202845.png)

## 3. 创建 MySQL 并上传数据

```bash
# 创建数据库表结构
pnpm db:init

# 上传数据
pnpm db:upload
```

## 4. 配置 env 文件（新）

需要将这两个文件内容复制到对应目录下的 `.env` 文件中，提供命令如下

```bash
# 后端
cp apps/api/.env.example apps/api/.env

# 前端
cp apps/client/.env.example apps/client/.env
```

关于前后端两个 `.env.example` 示例文件部分变量的简单说明（先看看就行，后面跟着文档来写空缺的变量）

![1712927166302.png](https://cdn.jsdelivr.net/gh/fengstats/blogcdn@main/2024/1712927166302.png)

## 5. 注册 Logto 控制台管理用户

检查 Docker Containers 中 **Logto** 相关服务是否正常启动，如果没有启动或者压根没有容器服务，可以先通过下面命令来启动

```bash
pnpm docker:start
```

手动访问地址：http://localhost:3011/

![1713369950949.png](https://cdn.jsdelivr.net/gh/fengstats/blogcdn@main/2024/1713369950949.png)

### 首页

点击 **Create account** 按钮创建账号

![1712982200571.png](https://cdn.jsdelivr.net/gh/fengstats/blogcdn@main/2024/1712982200571.png)

### 注册页

必须从首页跳转过来，不要直接访问（否则会 404，注意这是管理用户的创建页面而不是普通用户的哦）

![1712925724038.png](https://cdn.jsdelivr.net/gh/fengstats/blogcdn@main/2024/1712925724038.png)

输入用户名 + 密码注册一个账号（密码要稍微复杂一点，不过貌似 QQ 也行 ^-^）

![1712925836734.png](https://cdn.jsdelivr.net/gh/fengstats/blogcdn@main/2024/1712925836734.png)

### 配置页面

先切中文！（因为英文看不懂 😢，其实我是看得懂的，主要还是怕一些小伙伴看不懂 [手动狗头]

![1712926029628.png](https://cdn.jsdelivr.net/gh/fengstats/blogcdn@main/2024/1712926029628.png)

## 6. 创建 API 资源

### 创建 API

点击左侧 **API 资源** 创建

![1712933145000.png](https://cdn.jsdelivr.net/gh/fengstats/blogcdn@main/2024/1712933145000.png)

选择 **Express** 立即开始

![1713370511857.png](https://cdn.jsdelivr.net/gh/fengstats/blogcdn@main/2024/1713370511857.png)

### 配置 Logto API Identifier

将 `apps/api/.env` 文件中

- `BACKEND_ENDPOINT` → **API Identifier**

![1712929579464.png](https://cdn.jsdelivr.net/gh/fengstats/blogcdn@main/2024/1712929579464.png)

### 配置 `apps/api/.env` 文件

前面已经配置好的小伙伴也需要配置一下这步哦~ 😊

![1712987005566.png](https://cdn.jsdelivr.net/gh/fengstats/blogcdn@main/2024/1712987005566.png)

- **Logto Management API** → `LOGTO_M2M_API`

![1712987146956.png](https://cdn.jsdelivr.net/gh/fengstats/blogcdn@main/2024/1712987146956.png)

至此 API 资源部分配置完成 🎉

## 7. 创建 Logto 前端应用

### 构建应用

可以选择构建一个 **Vue** 应用

![1712926336778.png](https://cdn.jsdelivr.net/gh/fengstats/blogcdn@main/2024/1712926336778.png)

点击 **完成**

![1712926387675.png](https://cdn.jsdelivr.net/gh/fengstats/blogcdn@main/2024/1712926387675.png)

### 配置 `apps/client/.env` 文件

点击左侧 **全部应用** 会看到多了一个应用，复制 App ID

![1712927434604.png](https://cdn.jsdelivr.net/gh/fengstats/blogcdn@main/2024/1712927434604.png)

- `App ID` → `LOGTO_APP_ID`

![1712927512555.png](https://cdn.jsdelivr.net/gh/fengstats/blogcdn@main/2024/1712927512555.png)

### 配置 Logto URI

将 `apps/client/.env` 中

- `LOGTO_SIGN_IN_REDIRECT_URI` → 重定向 URIs
- `LOGTO_SIGN_OUT_REDIRECT_URI` → 退出登录后重定向 URIs

![1712928382489.png](https://cdn.jsdelivr.net/gh/fengstats/blogcdn@main/2024/1712928382489.png)

**注意**：更改内容最后要记得点击 **保存更改** 哈！至此前端部分配置完成 🎉

## 8. 创建 Logto 后端应用

### 构建应用

找 **MACHINE-TO-MACHINE** 开始构建

![1712927621139.png](https://cdn.jsdelivr.net/gh/fengstats/blogcdn@main/2024/1712927621139.png)

和前端应用创建差不多，输入内容后点击完成就好了

![1712927785070.png](https://cdn.jsdelivr.net/gh/fengstats/blogcdn@main/2024/1712927785070.png)

### 配置 `apps/api/.env` 文件

点击刚刚创建的后端应用，来到应用详情页，复制下面参数值

![1712927838413.png](https://cdn.jsdelivr.net/gh/fengstats/blogcdn@main/2024/1712927838413.png)

- 应用 ID → `LOGTO_CLIENT_ID`
- 应用密钥 → `LOGTO_CLIENT_SECRET`

![1712928155542.png](https://cdn.jsdelivr.net/gh/fengstats/blogcdn@main/2024/1712928155542.png)

至此后端应用部分配置完成 🎉

## 9. 创建管理员

创建管理员并设置权限（步骤点击稍多，别遗漏步骤哦）

![1712928633391.png](https://cdn.jsdelivr.net/gh/fengstats/blogcdn@main/2024/1712928633391.png)

给 **admin** 角色分配刚刚创建的 **后端应用**

![1712928711243.png](https://cdn.jsdelivr.net/gh/fengstats/blogcdn@main/2024/1712928711243.png)

## 10. 重新启动后端 + 前端服务

```bash
# 启动后端服务
pnpm dev:serve

# 启动前端服务
pnpm dev:client
```

来到首页，点击导航栏右上角的 **登录** 按钮后

![1713370798010.png](https://cdn.jsdelivr.net/gh/fengstats/blogcdn@main/2024/1713370798010.png)

看到下面的页面则视为配置成功 🎉

![1712929901698.png](https://cdn.jsdelivr.net/gh/fengstats/blogcdn@main/2024/1712929901698.png)

如果你跟着文档到这一步，请不要使用上面注册的管理员账号来尝试登录，然后问我为什么登录不上去，具体见最后的 **常见问题**

所以这里应该是点击底部 **注册** 来到注册页面（后续看看直接让用户先到注册页面，不然确实会有一点歧义）

![1713371160239.png](https://cdn.jsdelivr.net/gh/fengstats/blogcdn@main/2024/1713371160239.png)

可以多测测对应的注册和登录，注册的用户可以在 **管理控制台页面** 的 **用户管理** 中查看

![1712931035305.png](https://cdn.jsdelivr.net/gh/fengstats/blogcdn@main/2024/1712931035305.png)

至此，恭喜你完成了所有 Logto 配置，愉快的编码叭！

## 常见问题

### **管理员账号** 和 **普通用户账号** 是分开的

有小伙伴分不清下面两个 Logto 页面，简单说明一下

- http://localhost:3010/ - 给 **普通用户** 使用，只有在首页点击登录用才能访问，因为需要携带 token 信息校验，相当于我们之前的 **登录/注册** 页面
- http://localhost:3011/ - 给 **控制台管理员** 使用，只能注册一个账号，有对应的配置后台，可以管理上面用户信息还有对应的应用
