#!/usr/bin/env bash
id=$(docker run -d postman-var-injector)
docker cp $id:/app/output/collection.json ./output/collection.json