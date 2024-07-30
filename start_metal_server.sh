#!/bin/bash

cd ~/jspsych_experiment/server
sudo su
source venv/bin/activate
uvicorn webserver:app --host "0.0.0.0" --port 80 &
