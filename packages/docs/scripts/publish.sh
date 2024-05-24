#!/bin/bash

PROJECT_DIR="../../docs/"

DIST_DIR="${PROJECT_DIR}/.vitepress/dist"

SSH_USER="ssh_username"
SSH_HOST="ssh_host"
SSH_PORT="ssh_port" # 如果使用默认端口22，可以省略这个变量

DEPLOY_DIR=""

cd "$PROJECT_DIR" || exit
npm run docs:build

rsync -avz --delete -e "ssh -p $SSH_PORT" "$DIST_DIR/" "$SSH_USER@$SSH_HOST:$DEPLOY_DIR"

# 如果你的 ssh 端口是默认的 22 端口，可以省略 -e "ssh -p $SSH_PORT" 部分
# rsync -avz --delete "$DIST_DIR/" "$SSH_USER@$SSH_HOST:$DEPLOY_DIR"

echo "Deployment completed."
