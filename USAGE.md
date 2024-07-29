# Web based behavioral closed loop

This is a tutorial on running web based behavioral experiments with autora.

There are two environments to set up for the closed loop:

# Researcher Hub - Autora
This is the python scripts that will be run on a server to run the closed loop (this typically consists of an autora-experimentalist, autora-runner and autora-theorist)
Follow the steps here: [Set up Autora Workflow](researcher_hub/README.md)

# Testing Zone - Web App
This is the website that is served to the participant.The database gets populated with conditions from the autora-runner and stores observations when participants visit the website. The autora-runner will read the observations and pass them to the theorist.
Follow the steps here: [Set up Web App](testing_zone/README.md)


## Create an autora-workflow

### Setting up a virtual environment

Install this in an environment using your chosen package manager. In this example we are using virtualenv

Install:

- python (3.8 or greater): https://www.python.org/downloads/
- virtualenv: https://virtualenv.pypa.io/en/latest/installation.html

Install the Prolific Recruitment Manager as part of the autora package:

Change to the directory of the autora_workflow. Here, we define the autora workflow

```shell
cd researcher_environment
```

### Create a virtual environment

```shell
viratualenv venv
```

### Install dependencies

Install the requirements:

```shell
pip install -r requirements.txt
```

### Write your code

The autora_workflow.py file shows a basic example on how to run a closed loop autora experiment. Navigate [here](https://autoresearch.github.io/autora/) for more advanced options.

