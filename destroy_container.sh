#!/bin/bash

docker container stop slack-api-client
docker rm slack-api-client
docker rmi slack-api-client:1.0.0
