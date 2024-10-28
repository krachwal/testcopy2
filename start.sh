#!/bin/bash
# Use this script to build the ui and launch the web experiment locally

cd experiment-ui
npm run build
cd ..
cp -rf experiment-ui/dist experiment-server
cd experiment-server
python -m venv venv
source venv/bin/activate
python -m pip install -r requirements.txt
uvicorn webserver:app --host "0.0.0.0" --port 80 &
