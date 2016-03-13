#!/usr/bin/env bash
set -e

cd app
npm install
./node_modules/.bin/webpack
cd -

# 停用app server
cd assembly
docker-compose kill node-app
cd -

cp -r app/* assembly/assemble/node-app

# 启动app server
cd assembly
docker-compose up -d
cd -
