#!/bin/bash

# build the container
docker build -t slack-api-client:1.0.0 .
docker run --name slack-api-client -d -p 8080:8080 -p 8009:8009 slack-api-client:1.0.0
