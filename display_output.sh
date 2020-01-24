#!/bin/bash

# ------------------------------------------------------------------
# 
# This script diplays the output json file.
# The work perfectly completes when you saw json contents on 
# standard output.
# 
# ------------------------------------------------------------------

# Copy the json from container to the runtime
docker cp slack-api-client:/usr/src/app/json/output.json dest/output.json

cd dest/
cat output.json