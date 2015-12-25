#!/bin/bash
mysql -u BronzeSword -p12345678 -D BronzeSword < ./quize-items.seed.sql
mysql -u BronzeSword -p12345678 -D BronzeSword < ./paper.seed.sql