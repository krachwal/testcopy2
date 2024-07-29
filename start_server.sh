#!/bin/bash

# Start the web server
cd /srv/server
source venv/bin/activate
uvicorn webserver:app --host "0.0.0.0" --port 80 &
deactivate

# Wait for process to exit
wait -n

# Exit with status of process that exited
exit $?