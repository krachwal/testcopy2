# Web-based Behavioral Closed Loop Experiment

This is a tutorial on running web based behavioral experiments with autora.

This repository is the website that is served to the participant.The datastore gets populated with conditions from the autora-runner and stores observations when participants visit the website. The autora-runner will read the observations and pass them to the theorist.

## Write Your Code

The autora_workflow.py file shows a basic example on how to run a closed loop autora experiment. Navigate [here](https://autoresearch.github.io/autora/) for more advanced options.

The code for the JsPsych experiment is located in the main.js file. This file contains the core logic and setup for the experiment. If you wish to customize the experiment (e.g., modifying trials, adjusting settings, or adding new features), please refer to main.js as the primary entry point.

For more detailed information on customizing JsPsych experiments, including documentation and examples, visit [here](https://www.jspsych.org/v7/overview/timeline/).

## Optional Components

[Using Docker with Your Project](docs/docker.md)

[Using GitHub Actions to Deploy to a Linux Server](docs/actions.md)
