# Web-based Behavioral Closed Loop Experiment

This project, generated by Copier from [the AutoRA-experiment-server repo](https://github.com/gt-sse-center/AutoRA-experiment-server), is the website that is served to the participant. The data store gets populated with conditions from the autora-runner and stores observations when participants visit the website. The autora-runner will read the observations and pass them to the theorist.

To start the web app locally you can simply run the start script from a terminal.

```shell
./start.sh
```

## Write Your Code

The [autora_workflow.py](https://github.com/AutoResearch/autora-user-cookiecutter/blob/main/%7B%7B%20cookiecutter.__project_slug%20%7D%7D/researcher_hub/autora_workflow.py) file shows a basic example on how to run a closed loop autora experiment. Navigate [here](https://autoresearch.github.io/autora/) for more advanced options.

## Major Technologies in Use

### ViteJS + NodeJS + npm 

This project uses "vanilla" Javascript, the [`ViteJS`](https://vitejs.dev/guide/static-deploy.html#building-the-app) dev build server, and [`npm`](https://nodejs.org/en/learn/getting-started/an-introduction-to-the-npm-package-manager) for Javascript dependency management. The frontend is defined, including its dependencies, in the `package.json` file.

### jsPsych

The core Javascript dependency is [`jsPsych`](https://www.jspsych.org/v7/) which is used to define the behavioral experiment(s). The Copier output will initialize a `jsPsych timeline` in `main.js` based on your Copier questionnaire responses. `main.js` contains the core logic and setup for the experiment. [jsPsych provides comprehensive timeline documentation](https://www.jspsych.org/v7/overview/timeline/) to help you define your trials.  If you wish to customize the experiment (e.g., modifying trials, adjusting settings, or adding new features) please do so by working with the `timeline` in `main.js`.

### FastAPI

This project uses [`FastAPI`](https://fastapi.tiangolo.com/tutorial/) for the backend web framework and [`uvicorn`](https://www.uvicorn.org/) as a web server.

For more detailed information on customizing JsPsych experiments, including documentation and examples, visit [here](https://www.jspsych.org/v7/overview/timeline/).

## Optional Components

[Using Docker with Your Project](docs/docker.md)

[Using GitHub Actions to Deploy to a Linux Server](docs/actions.md)