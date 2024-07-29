# Using Docker
The Dockerfile included in this repository builds and runs the web application inside of a Docker container. Docker desktop [must be installed](https://docs.docker.com/engine/install/) on your system if you would like to use the Dockerfile locally. 

Once you have Docker Desktop installed, you can build the Docker image with the following command:

```docker build . -t autora-web-experiment-server:latest```

Feel free to replace "autora-web-experiment-server" in the command above with a label of your choice.

The Dockerfile is also used in the GitHub Action to deploy to a web server, during the course of which process the value of the target host changes with the `--build-arg public_ip_or_hostname=...` parameter to `docker build`. You can also specify a custom IP address or hostname when you build locally if you so choose.

You can run the built Docker image with the command:
```docker run -p 80:80 -d autora-web-experiment-server:latest```

Which should make the application available at `localhost` in your web browser, assuming you have nothing else running on port 80. If you do have a port conflict, you can set the first port in the `docker run -p 80:80` command to any port you have available on your machine. The second port, after the `:`, is the port on which the web server is running inside the Docker container and should not need to be modified.

# Deploying to PyPI
In order to deploy changes made to this repository to PyPI, the PYPI_API_TOKEN secret must be set in the GitHub Actions configuration found [here](https://github.com/gt-sse-center/AutoRA-experiment-server/settings/secrets/actions).

![image](static/github_actions_secret.png)