# Using Docker with Your Project

If you already have Docker installed, skip ahead to [the usage instructions](#2-using-the-dockerfile).

## 1. Install Docker Desktop

### For Windows
- Go to the [Docker Desktop for Windows](https://www.docker.com/products/docker-desktop/) page.
- Download the Docker Desktop installer.
- Run the installer and follow the on-screen instructions to complete the installation.
- Once installed, start Docker Desktop from the Start menu.

### For MacOS
- Go to the [Docker Desktop for Mac](https://www.docker.com/products/docker-desktop/) page.
- Download the Docker Desktop installer.
- Open the downloaded `.dmg` file and drag Docker to your Applications folder.
- Launch Docker from Launchpad or the Applications folder.

### For Ubuntu/Debian
- Open Terminal.
- Update your package index:
  ```sh
  sudo apt-get update
  ```
- Install required packages to allow `apt` to use a repository over HTTPS:
  ```sh
  sudo apt-get install apt-transport-https ca-certificates curl gnupg lsb-release
  ```
- Add Docker's official GPG key:
  ```sh
  curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
  ```
- Set up the stable repository:
  ```sh
  echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
  ```
- Update the package index again:
  ```sh
  sudo apt-get update
  ```
- Install Docker Engine, CLI, and Containerd:
  ```sh
  sudo apt-get install docker-ce docker-ce-cli containerd.io
  ```
- Start Docker:
  ```sh
  sudo systemctl start docker
  ```
- Enable Docker to start at boot:
  ```sh
  sudo systemctl enable docker
  ```

### For Fedora
- Open Terminal.
- Update your package index:
  ```sh
  sudo dnf update
  ```
- Install Docker:
  ```sh
  sudo dnf install docker-ce docker-ce-cli containerd.io
  ```
- Start Docker:
  ```sh
  sudo systemctl start docker
  ```
- Enable Docker to start at boot:
  ```sh
  sudo systemctl enable docker
  ```

### For CentOS
- Open Terminal.
- Update your package index:
  ```sh
  sudo yum update
  ```
- Install required packages:
  ```sh
  sudo yum install -y yum-utils
  ```
- Set up the stable repository:
  ```sh
  sudo yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
  ```
- Install Docker:
  ```sh
  sudo yum install docker-ce docker-ce-cli containerd.io
  ```
- Start Docker:
  ```sh
  sudo systemctl start docker
  ```
- Enable Docker to start at boot:
  ```sh
  sudo systemctl enable docker
  ```

### For Arch Linux
- Open Terminal.
- Update your package index:
  ```sh
  sudo pacman -Syu
  ```
- Install Docker:
  ```sh
  sudo pacman -S docker
  ```
- Start Docker:
  ```sh
  sudo systemctl start docker
  ```
- Enable Docker to start at boot:
  ```sh
  sudo systemctl enable docker
  ```
  
## 2. Using the Dockerfile
- Open Terminal and navigate to the directory containing the `Dockerfile` using the `cd` command.
- Build the Docker image with the following command (feel free to choose your own name instead of "your_image_name"):
  ```sh
  docker build -t your_image_name .
  ```
- Run a container from the image:
  ```sh
  docker run -d -p 80:80 your_image_name
  ```