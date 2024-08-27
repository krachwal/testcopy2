#!/bin/bash
# This script is used by the GitHub Actions yaml file found in ./.github/workflows/deploy.yaml
# It is not meant to be used outside of GitHub Actions
# To launch the web app locally, please use start.sh

source venv/bin/activate
nohup uvicorn webserver:app --host "0.0.0.0" --port 80 &
