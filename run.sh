#!/usr/bin/env bash
id=$(docker run -d postman-var-injector)
sleep 2
docker cp $id:/app/output/collection.json ./output/collection.json