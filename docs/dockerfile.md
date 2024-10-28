# Detailed Walkthrough of the Generated Dockerfile

The `Dockerfile` comprises instructions to build an image that can be used to spin up a Docker container locally and/or on a server.

```Dockerfile
syntax=docker/dockerfile:1
```
This is a boilerplate directive that usually has this value. See the official docs [here](https://docs.docker.com/reference/dockerfile/#syntax) for more information.

```Dockerfile
FROM ubuntu:latest
```
The "base image" is specified here. You can browse the available images [here](https://hub.docker.com/search?q=&type=image&image_filter=official&_gl=1*1732611*_ga*MTU0MTYzMTMwNi4xNzIyNjI3ODMz*_ga_XJWPQMJYHQ*MTcyMjYyNzgzMy4xLjEuMTcyMjYyODU1My42MC4wLjA.). See the official docs [here](https://docs.docker.com/reference/dockerfile/#from) for more information.

```Dockerfile
LABEL description="AutoRA Web Experiment Server"
```
Metadata is added to a Docker image with the `LABEL` instruction. You can add multiple `LABEL`s. See more in the official docs [here](https://docs.docker.com/reference/dockerfile/#label).

```Dockerfile
ENV BASE_PATH=/srv
```
We are setting the base path of all of the operations we will perform by setting an environment variable. You can include instructions to set any number of environment variables if you require. See the official docs [here](https://docs.docker.com/reference/dockerfile/#env) for more details.

```Dockerfile
WORKDIR ${BASE_PATH}
```
You change the operating directory with the `WORKDIR` instruction, like you would with the `cd` command in most shells/terminals. Subsequent instructions in the `Dockerfile` are issued from this path unless another call to `WORKDIR` occurs.

```Dockerfile
ARG public_ip_or_hostname=localhost
```
This instruction sets a default value for the optional `docker build` command line argument that defines where the application will be hosted. An IP address or a domain name can also be specified here. For more details about `ARG` usage refer to the [official documentation](https://docs.docker.com/reference/dockerfile/#arg).

```Dockerfile
ENV HOST=$public_ip_or_hostname
```
Here we set an environment variable with the host information from the command line argument or its default in the previous instruction.

```Dockerfile
RUN apt-get update && apt-get -y install python3 python3-pip python3-venv npm curl
```
The `RUN` instruction allows us to run command line operations on the container. In this case we are installing dependencies for our web application, namely Python and `npm` for to help us manage Javascript dependencies. More on the RUN instruction can be found [here](https://docs.docker.com/reference/dockerfile/#run).

```Dockerfile
RUN npm i -g n && n lts && npm i -g npm@latest
```
Now that we have `npm` from the previous run command, we can issue these commands to set up NodeJS and update npm to its latest version.

```Dockerfile
COPY experiment ${BASE_PATH}/experiment
```
The `COPY` instruction allows to transfer files form our local environment to the Docker container. In this case we are operating from the same folder as the Dockerfile and we are copying the local `experiment` folder, which houses the Vite vanilla Javascript web application with our jsPsych boilerplate code into the Docker image.

```Dockerfile
WORKDIR ${BASE_PATH}/experiment
```
After copying in the experiment folder, we can now change directory into that folder.

```Dockerfile
RUN npm ci
```
This `RUN` instructions installs all of our NodeJS dependencies. We have to be in the folder in which the package.json lives, which, in this case is the `experiment` folder.

```Dockerfile
RUN echo "VITE_HOST=${HOST}" > .env.production
```
This instruction is not strictly necessary, but it transfers the host information to an environment variable that will be accessible in the Javascript code should it be useful in your scenario.

```Dockerfile
RUN npm run build
```
Now that we have all of our Javascript files and dependencies installed, we can "build" the Vite + jsPsych frontend that comprises our user interface.

```Dockerfile
WORKDIR ${BASE_PATH}
```
Now that we have attended to the frontend, we are changing back to the base path so that we can build the web server backend.

```Dockerfile
COPY experiment-server ${BASE_PATH}/experiment-server
```
We are copying in the Python FastAPI backend code which lives in the `experiment-server` folder.

```Dockerfile
RUN cp -rf experiment-ui/dist ${BASE_PATH}/experiment-server/dist
```
In order for FastAPI to server up HTML+JS, we need to copy the "built" Javascript app into the `server` directory, which is what we are doing with this instruction.

```Dockerfile
WORKDIR ${BASE_PATH}/experiment-server
```
We now change into the web server directory so we can install our Python dependencies and build the web application.

```Dockerfile
RUN rm -rf venv
RUN python3 -m venv venv
```
We are creating a Python virtual environment after cleaning up any venv that may be laying around from the copy operation.

```Dockerfile
RUN . venv/bin/activate
```
We activate the Python virtual environment.

```Dockerfile
RUN ./venv/bin/python -m pip install -r ${BASE_PATH}/experiment-server/requirements.txt
```
Here we install the Python dependencies from our `requirements.txt` file.

```Dockerfile
ENV PATH=${BASE_PATH}/experiment-server
RUN unset VIRTUAL_ENV
```
We are prepending our new venv to the image `PATH`, so that the container looks for dependencies in this directory first, and then we "unset" the virtual environment so that subsequent commands are not run in the context of our virtual environment.

```Dockerfile
EXPOSE 80
```
If you are serving a web application from a Docker container you must expose a port. It does not need to be `80` but that is the default port for web applications so that is what we are using. See more on `EXPOSE` [here](https://docs.docker.com/reference/dockerfile/#expose).

```Dockerfile
WORKDIR ${BASE_PATH}
COPY _start_docker_server.sh ./experiment-server/_start_docker_server.sh
```
We have a bash script that starts up the application and we are copying it into the container here.

```Dockerfile
WORKDIR ${BASE_PATH}/server
CMD ./_start_docker_server.sh
```
We invoke the startup script and that should start up the FastAPI server. An `ENTRYPOINT` or `CMD` instruction always comes last in a `Dockerfile`. More on the `CMD` instruction can be found [here](https://docs.docker.com/reference/dockerfile/#cmd).