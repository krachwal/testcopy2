# GitHub Actions Workflow: Build and Deploy to Cloud Metal

## Overview

This GitHub Actions workflow automates the process of building and deploying a JavaScript application to a remote server. It includes steps to check out the code, install dependencies, build the application, and deploy it to a remote server via SSH. Additionally, it handles the setup and installation of required Python packages and starts a FastAPI web server on the remote server. . The workflow can be manually triggered using the `workflow_dispatch` event.

## Required GitHub Actions Secrets

- `HOST`: The public IP or hostname of the server.
- `KEY`: The SSH private key for accessing the server.
- `USERNAME`: The username for SSH access to the server.

For more information on setting GitHub Actions secrets please refer to the [actions documentation](actions.md).

## Trigger

**`workflow_dispatch:`** This workflow is manually triggered from the GitHub Actions tab in the repository. It does not run automatically on code changes.

If you would like to modify or add triggers, please refer to [the official GitHub Actions documentation on triggers](https://docs.github.com/en/actions/writing-workflows/choosing-when-your-workflow-runs/events-that-trigger-workflows).

## Workflow Steps

### 1. Checkout Repository

```yaml
- name: Checkout repository
  uses: actions/checkout@v4
```

- **Purpose:** Retrieves the latest code from the repository.

### 2. Install NodeJS

```yaml
- name: Install NodeJS
  uses: actions/setup-node@v4
```
- **Purpose:** Sets up a Node.js environment using the specified version (default to the latest).

### 3. Install JavaScript dependencies and build

```yaml
- name: Install Javascript dependencies and build
  run: |
    cd experiment
    npm ci
```

- **Purpose:** Installs the JavaScript dependencies listed in `package-lock.json` and prepares the build environment.

### 4. Build JavaScript UI

```yaml
- name: Build Javascript UI
  run: |
    cd experiment
    npm run build
```

- **Purpose:** Builds the JavaScript application, generating minified production files.

### 5. Copy Minified JavaScript to web server directory

```yaml
- name: Copy Minified Javascript to web server directory
  run: |
    cd experiment
    cd ..
    cp -rf experiment/dist server/dist
    ls server
    ls server/dist
```

- **Purpose:** Copies the built JavaScript files to a `server/dist` directory, ensuring they are ready for deployment.

### 6. Prepare SSH directory

```yaml
- name: Prepare SSH dir
  run: |
    mkdir -pv ~/.ssh/
```
     
- **Purpose:** Creates an SSH directory in the runner’s home directory if it does not already exist.

### 7. Write SSH key

```yaml
- name: Write SSH key
  env:
    KEY: ${{ secrets.KEY }}
  run: |
    echo "$KEY" > ~/.ssh/actions.key
    chmod 600 ~/.ssh/actions.key
 ```

- **Environment Variables:**
  - `KEY`: SSH private key from repository secrets.

- **Purpose:** Writes the SSH private key to a file and sets the correct permissions for it.

### 8. Write SSH config

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

- **Environment Variables:**
  - `HOST`: SSH host from repository secrets.
  - `USERNAME`: SSH username from repository secrets.
  
- **Purpose:** Configures SSH settings to connect to the remote server, including disabling strict host key checking for simplicity.

### 9. Create target directory

```yaml
- name: Create target directory
  run: |
    ssh webserver 'mkdir -p ~/jspsych_experiment'
```

- **Purpose:** Creates the target directory on the remote server where the files will be deployed.

### 10. Copy files to server

```yaml
- name: Copy files to server
  env:
    HOST: ${{ secrets.HOST }}
    USERNAME: ${{ secrets.USERNAME }}
  run: |
    scp -r server webserver:~/jspsych_experiment
    scp start_metal_server.sh webserver:~/jspsych_experiment/server
```

- **Environment Variables:**
  - `HOST`: SSH host from repository secrets.
  - `USERNAME`: SSH username from repository secrets.

- **Purpose:** Transfers the built files and server startup script to the remote server.

### 11. Install Python dependencies

```yaml
- name: Install Python dependencies
  run: |
    ssh webserver 'sudo apt-get -y install python3 python3-pip python3-venv'
    ssh webserver 'cd ~/jspsych_experiment/server && python3 -m venv venv'
    ssh webserver 'cd ~/jspsych_experiment/server && source venv/bin/activate'
    ssh webserver 'cd ~/jspsych_experiment/server && ./venv/bin/python -m pip install -r ~/jspsych_experiment/server/requirements.txt'
```

- **Purpose:** Installs Python, sets up a virtual environment, and installs the required Python packages listed in `requirements.txt`.

### 12. Start FastAPI web server

```yaml
- name: Start FastAPI web server
  run: |
    ssh webserver 'chmod +x ~/jspsych_experiment/server/start_metal_server.sh'
    ssh webserver 'cd ~/jspsych_experiment/server && sudo ./start_metal_server.sh'
```

- **Purpose:** Makes the FastAPI server startup script executable and starts the server on the remote machine.