#!/usr/bin/env bash
set -e

cd task-queue
npm install
cd -

# 停用task-queue server
# cd assembly
# docker-compose kill task-queue
# cd -

# 将文件拷贝到目标地址
cp -r task-queue/* assembly/assemble/task-queue

# 写入配置文件
cp assembly/assemble/conf/task-queue-conf.yml assembly/assemble/task-queue/config.yml

# 启动app server
# cd assembly
# docker-compose up -d
# cd -
