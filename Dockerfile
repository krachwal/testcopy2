# syntax=docker/dockerfile:1
# This docker container runs the web server
FROM ubuntu:latest
LABEL description="AutoRA Web Experiment Server"

# set working directory - feel free to change to suit
ENV BASE_PATH=/srv
WORKDIR ${BASE_PATH}

# this argument defines where the application will be hosted - specify "localhost", an IP address or a domain name
ARG public_ip_or_hostname=localhost
ENV HOST=$public_ip_or_hostname

# install system dependencies
RUN apt-get update && apt-get -y install python3 python3-pip python3-venv npm curl
RUN npm i -g n && n lts && npm i -g npm@latest

# Copy in web interface 
COPY experiment ${BASE_PATH}/experiment
WORKDIR ${BASE_PATH}/experiment
# install NodeJS dependencies
RUN npm ci
# expose hostname to Javascript code
RUN echo "VITE_HOST=${HOST}" > .env.production
# generate deployable artifacts
RUN npm run build

# create virtual environment for FastAPI web server and install dependencies
WORKDIR ${BASE_PATH}
COPY server ${BASE_PATH}/server
# copy previously built HTML+Javascript files to FastAPI web server directory
RUN cp -rf experiment/dist ${BASE_PATH}/server/dist
WORKDIR ${BASE_PATH}/server
# create new Python virtual environment
RUN rm -rf venv
RUN python3 -m venv venv
RUN . venv/bin/activate
# install Python dependencies into virtual environment
RUN ./venv/bin/python -m pip install -r ${BASE_PATH}/server/requirements.txt
ENV PATH=${BASE_PATH}/server
RUN unset VIRTUAL_ENV

# expose web port
EXPOSE 80

# start web and gRPC servers
WORKDIR ${BASE_PATH}
COPY start_docker_server.sh ./server/start_docker_server.sh
WORKDIR ${BASE_PATH}/server
CMD ./start_docker_server.sh