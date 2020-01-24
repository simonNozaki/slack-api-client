#!/bin/bash

# ------------------------------------------------------------------
# 
# This script initialize the .env file and Docker container.
# After doing this, modify property SLACK_API_TOKEN and SLACK_CHANNEL_ID
# in the .env file.
# The client parse these properties and execute requesting for API.
#
# ------------------------------------------------------------------

# generate initialized environment file
touch .env
echo "SLACK_API_TOKEN=token" >> .env
echo "SLACK_CHANNEL_ID=id" >> .env

# give the permission to execute
chmod +x run_container.sh destroy_container.sh display_output.sh

# the destination of JSON file
mkdir dest

# run container
./run_container