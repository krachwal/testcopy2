# GitHub Actions Workflow: Build and Deploy to Cloud with Docker

## Overview

This GitHub Actions workflow automates the process of building a Docker image for your application and deploying it to a cloud server (e.g., an EC2 instance).
This workflow automates the end-to-end process of building, transferring, and deploying a Dockerized application to a cloud server. It ensures that the deployment environment is clean and up-to-date, minimizing potential errors during the deployment process.
The workflow can be manually triggered using the `workflow_dispatch` event.

## Required GitHub Actions Secrets

- `HOST`: The public IP or hostname of the server.
- `KEY`: The SSH private key for accessing the server.
- `USERNAME`: The username for SSH access to the server.

For more information on setting GitHub Actions secrets please refer to the [actions documentation](actions.md).

## Trigger

- **`workflow_dispatch:`** This workflow is manually triggered from the GitHub Actions tab in the repository. It does not run automatically on code changes.

If you would like to modify or add triggers, please refer to [the official GitHub Actions documentation on triggers](https://docs.github.com/en/actions/writing-workflows/choosing-when-your-workflow-runs/events-that-trigger-workflows).

## Workflow Steps

### 1. Checkout Repository

```yaml
- name: Checkout repository
  uses: actions/checkout@v4
```

- **Purpose:** Retrieves the latest code from the repository.

### 2. Install Dependencies

```yaml
- name: Install dependencies
  run: |
    sudo apt update -y && sudo apt install -y curl
    curl -fsSL https://get.docker.com -o get-docker.sh
    chmod +x get-docker.sh
    ./get-docker.sh
```

- **Purpose:** Installs necessary dependencies, including Docker, on the runner.

### 3. Build Docker Image

```yaml
- name: Build Docker image
  env: 
    HOST: ${{ secrets.HOST }}
  run: | 
    docker build --build-arg public_ip=$HOST -t autora-web-server:latest .
```

- **Purpose:** Builds the Docker image with the application code.
- **Environment Variable:** `HOST` is passed as a build argument to set the public IP of the server.

### 4. Save Docker Image as Tarball

```yaml
- name: Save Docker image as tarball
  run: |
    docker save autora-web-server:latest | gzip > image.tar.gz
```

- **Purpose:** Saves the Docker image as a gzipped tarball for easy transfer to the server.

### 5. Prepare SSH Directory

```yaml
- name: Prepare SSH dir
  run: |
    mkdir -pv ~/.ssh/
```

- **Purpose:** Prepares the SSH directory for storing the SSH key and configuration.

### 6. Write SSH Key

```yaml
- name: Write SSH key
  env:
    KEY: ${{ secrets.KEY }}
  run: |
    echo "$KEY" > ~/.ssh/actions.key
    chmod 600 ~/.ssh/actions.key
```

- **Purpose:** Writes the SSH private key to the runner for secure access to the server.

### 7. Write SSH Configuration

```yaml
- name: Write SSH config
  env:
    HOST: ${{ secrets.HOST }}
    USERNAME: ${{ secrets.USERNAME }}
  run: |
    cat >>~/.ssh/config <<END
    Host webserver
        HostName $HOST
        User $USERNAME
        IdentityFile ~/.ssh/actions.key
        StrictHostKeyChecking=no
        ServerAliveCountMax=10
        ServerAliveInterval=60
    END
```

- **Purpose:** Configures the SSH client for seamless access to the server.

### 8. Copy Docker Image to Server

```yaml
- name: Copy Docker image to server
  env:
    EC2_USERNAME: ${{ secrets.USERNAME }}
  run: |
    scp image.tar.gz webserver:~
```

- **Purpose:** Transfers the gzipped Docker image to the server.

### 9. Ensure Docker is Installed and Running on Server

```yaml
- name: Ensure Docker is installed and running
  run: |
    ssh webserver 'sudo snap install docker'
```

- **Purpose:** Ensures Docker is installed and running on the remote server.

### 10. Stop Running Container

```yaml
- name: Stop running container
  run: | 
    ssh webserver 'sudo docker ps -q | xargs --no-run-if-empty docker stop | xargs --no-run-if-empty docker rm'
```

- **Purpose:** Stops and removes any running Docker containers on the server.

### 11. Load Docker Image on Server

```yaml
- name: Configure Docker & load image
  env:
    EC2_USERNAME: ${{ secrets.USERNAME }}
  run: |
    ssh webserver "sudo docker load -i ~/image.tar.gz"
```

- **Purpose:** Loads the Docker image on the server from the gzipped tarball.

### 12. Delete Gzipped Image Tarball on Server

```yaml
- name: Delete gzipped image tarball
  env:
    EC2_USERNAME: ${{ secrets.USERNAME }}
  run: |
    ssh webserver "rm -f ~/image.tar.gz"
```

- **Purpose:** Removes the gzipped image tarball from the server to free up space.

### 13. Run Docker Container on Server

```yaml
- name: Run Docker container on EC2 instance
  run: |
    ssh webserver "sudo docker run -p 80:80 -d autora-web-server:latest"
```

- **Purpose:** Runs the Docker container on the server, exposing it on port 80.

### 14. Cleanup Docker Detritus

```yaml
- name: Cleanup Docker detritus
  run: |
    ssh webserver "sudo docker system prune -f"
```

- **Purpose:** Cleans up unused Docker resources on the server to maintain a clean environment.