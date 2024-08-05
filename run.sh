#!/usr/bin/env bash
id=$(docker run -d postman-var-injector)
docker cp $id:/app/output/post_inject.json ./output/post_inject.json