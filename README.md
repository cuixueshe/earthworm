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
