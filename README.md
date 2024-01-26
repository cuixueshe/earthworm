# Earthworm

## How to run

**node version >= 20**  
if you encounter problems installing argon2, you can check [before-installing](https://www.npmjs.com/package/argon2#before-installing)

1. Install dependencies  
    mac:   
    ```bash
    brew install docker orbstack
    ```
    win:  
    install [docker-desktop](https://www.docker.com/products/docker-desktop/)

2. open orbstack

3. run commands
```bash
## In this project directory
## Run sql and redis services
docker compose up -d
## Configure environment variables 
cp .env.example .env
pnpm install
pnpm db:push
pnpm data:init
```
4. run serve
```bash
pnpm serve:dev
```
5. run client
```bash
pnpm client:dev
```


## 前端开发规范

1. 不要解构 pinia 的 store
   - 解构会导致响应式丢失问题（ref 类型也会变成普通类型）
     - 使用 storeToRefs 非常的麻烦
   - 带上 store 代码可读性也会更好一点 一眼就能知道数据的来源是哪里
2. composables 里面不要包含 UI 逻辑
   1. useMessage 之类的
   2. router 相关的也不要放进去（不便于测试 我们把 router 划分为 UI 逻辑）


