#!/bin/bash

docker pull mongo:4
cd .. && docker-compose -f dev_env/docker-compose.yml build frontend-dev backend-dev