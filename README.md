<div align="center">
  <img alt="Earthworm" width="120" height="120" src="./apps/client/public/logo.png">
  <h1>Earthworm</h1>
  <span>English | <a href="./README.zh-CN.md">中文</a></span>
</div>

## ⚡ Introduction

By constructing sentences with conjunctions, it helps you learn English better~ 😊

## 🚀 How to start ?

### ⚠️ Requirements

- **pnpm version >= 8**
- **Node.js version >= v20**
- **MySQL version >= 8.0.0**
- **Redis version >= 5.0.0**
- **Docker**. please make sure it is installed and running successfully on your local machine.
- The mentioned operations below are based on the root directory of the current project, please be attentive to ensure there are no errors.

```bash
docker --version # Docker version 24.0.7, build afdd53b

node --version # v20+

pnpm -v # 8+
```

### 1. Install dependencies

```bash
pnpm install
```

### 2. Copy the contents of `.env.example` to the `.env` file

If the file doesn't exist, you need to create it manually. Linux users can perform the operation with the following command.

> It primarily stores environmental variable information for the main storage system, such as database connection addresses, usernames, passwords, ports, keys, and so on. The backend service will read configuration from this file. Of course, you can also customize it with your own configuration information.

```bash
cp .env.example .env
```

### 3. Start/stop/delete Docker Compose service

The backend relies on MySQL and Redis services. Start and stop these services using the commands configured in `package.json` below.

```bash
# start
pnpm docker:start
# stop
pnpm docker:stop
# delete
pnpm docker:delete
```

If you prefer manual, you can use the commands below.

```bash
docker compose up -d
docker compose stop
docker compose down

# commands compatible with older versions of Docker
docker-compose up -d
# clear the cache(mysql cache)
docker-compose down -v
```

### 4. Initialize Database

When executing the current command, try to wait for a short interval after the previous command, as we are using the `-d` parameter, which runs the services in the background. They might still be in a 'running' state. If you encounter an error, try running the command again.

```bash
pnpm db:init
```

### 5. Create and upload course data (only execute this during the initial database initialization)

```bash
pnpm db:upload
```

### 6. Start the backend service

```bash
pnpm dev:serve
```

### 7. Start the frontend service

```bash
pnpm dev:client
```

## FAQ

### How to correctly update course data ?

when you identify incorrect course data and make modifications, you should use the following command to update the course data in the database.

```bash
pnpm db:update
```

### pnpm install Error?

Some dependencies require compilation during installation, necessitating the presence of relevant build environments.
If these environments are not available, the compilation process may fail. Additionally, different modules may require different build environments, so specific issues need to be analyzed individually.
Below are specific problems encountered along with their solutions.

First try the following command to update `pnpm`

```shell
pnpm i -g
# or
pnpm i -g pnpm
# or
npx pnpm i -g pnpm@latest
```

**Error installing the argon2 module on Windows**

- Install Visual Studio 2015 or later, specifically the "Desktop development with C++" component. (In practice, any component containing C++ development tools and libraries will suffice.)
- If you encounter Chinese characters display issues during compilation, execute `chcp 437` in the command prompt, then rerun the install command.

### Docker Permission Denied in Docker?

When using WSL2 as a development environment in Windows, the following error occurs when starting Docker with `docker compose up -d` :

```bash
permission denied while trying to connect to the Docker daemon socket at unix:///var/run/docker.sock: Get "http://%2Fvar%2Frun%2Fdocker.sock/v1.24/containers/json": dial unix /var/run/docker.sock: connect: permission denied
```

> Solution

Add the current user to the docker group

```bash
# Add docker user group
sudo groupadd docker
# Add the logged-in user to the docker user group
sudo gpasswd -a $USER docker
# Update user group
newgrp docker
# Test if docker command is working properly
docker images
```

## Frontend Development Guideline

1. Do not Destructure Pinia store.
   - The readability will be better when using `store`
   - Destructuring can lead to reactivity loss and using `storeToRefs` is also quite cumbersome
2. Avoid including UI logic in composables.
   1. Such as `useMessage`
   2. We categorize the router as UI logic, and for ease of testing, avoid including routerrelated logic in there

## Contributing

Thanks to everyone who has already contributed to Earthworm! 🎉

<a href="https://github.com//cuixueshe/earthworm/graphs/contributors"><img src="https://contributors.nn.ci/api?repo=cuixueshe/earthworm" /></a>
