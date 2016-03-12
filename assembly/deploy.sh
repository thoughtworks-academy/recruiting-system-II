#!/usr/bin/env bash

set -e

#docker-compose kill
#docker-compose rm -f
#docker-compose up -d
cd assembly
docker-compose kill jetty-api
cd -

mv ./api/gradle.properties ./api/gradle.properties.bak
cp ./assembly/assemble/jetty-api/gradle.properties ./api/gradle.properties
./gradlew flywayMigrate
mv ./api/gradle.properties.bak ./api/gradle.properties


mv ./api/src/main/resources/config.properties ./api/src/main/resources/config.properties.bak
cp ./assembly/assemble/jetty-api/config.properties ./api/src/main/resources/config.properties
./gradlew clean
./gradlew war
cp api/build/libs/api.war assembly/assemble/jetty-api
mv ./api/src/main/resources/config.properties.bak ./api/src/main/resources/config.properties

cd assembly
docker-compose up -d
cd -
#rm -fr assembly/assemble/*
#git archive --format=zip HEAD:api -o assembly/assemble/api.zip
#cd assembly/assemble
#unzip api.zip -d api/
#cd -
#
#cd assembly/assemble/api
#./gradlew assemble
#cd -