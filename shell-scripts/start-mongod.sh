#!/bin/sh

[ -e /data/db/mongod.lock ] && rm /data/db/mongod.lock
mongod -f mongodb.conf