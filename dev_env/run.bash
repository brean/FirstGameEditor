#!/bin/bash

docker-compose up -d frontend-dev backend-dev
terminator -g conf/terminator.conf
docker-compose down