#!/bin/bash
# This script is used by the GitHub Actions yaml file found in ./.github/workflows/deploy_w_docker.yaml
# It is not meant to be used outside of GitHub Actions
# To launch the web app locally, please use start.sh

# Start the web server
cd /srv/experiment-server
source venv/bin/activate
uvicorn webserver:app --host "0.0.0.0" --port 80 &
deactivate

# Wait for process to exit
wait -n

# Exit with status of process that exited
exit $?