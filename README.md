# Earthworm

## How to run


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
pnpm db:init
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