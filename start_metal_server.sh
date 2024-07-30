#!/bin/bash

source venv/bin/activate
uvicorn webserver:app --host "0.0.0.0" --port 80 &
