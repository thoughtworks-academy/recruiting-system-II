#!/usr/bin/env bash

set -e

rm -fr assembly/assemble/jetty-api/*
cp -r api/* assembly/assemble/jetty-api
cp assembly/conf/config.properties assembly/assemble/jetty-api/src/main/resources/config.properties
cp assembly/conf/gradle.properties assembly/assemble/jetty-api/gradle.properties

cd assembly/assemble/jetty-api
./gradlew clean
./gradlew war
./gradlew flywayMigrate
cd -

mkdir -p assembly/assemble/tmp

cp assembly/assemble/jetty-api/build/libs/jetty-api.war assembly/assemble/tmp
rm -fr assembly/assemble/jetty-api/*
cp assembly/assemble/tmp/jetty-api.war assembly/assemble/jetty-api

rm -fr mkdir -p assembly/assemble/tmp

## 修改apiserver migrate配置项
#mv ./api/gradle.properties ./api/gradle.properties.bak
#cp ./assembly/assemble/jetty-api/gradle.properties ./api/gradle.properties
## 数据库迁移
#./gradlew flywayMigrate
## 恢复apiserver migrate配置项
#mv ./api/gradle.properties.bak ./api/gradle.properties
#
## 修改apiserver配置项
#mv ./api/src/main/resources/config.properties ./api/src/main/resources/config.properties.bak
#cp ./assembly/assemble/jetty-api/config.properties ./api/src/main/resources/config.properties
#./gradlew clean
#./gradlew war
#
## 停用api server
#cd assembly
#docker-compose kill jetty-api
#cd -
#
## 将生成好的api war包放入指定目录
#cp api/build/libs/api.war assembly/assemble/jetty-api
## 恢复配置项
#mv ./api/src/main/resources/config.properties.bak ./api/src/main/resources/config.properties
#
## 启动api server
#cd assembly
#docker-compose up -d
#cd -