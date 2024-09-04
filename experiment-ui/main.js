// To use the jsPsych package first install jspsych using `npm install jspsych`
// This example uses the html-button-response plugin. Install it via `npm install @jspsych/plugin-html-button-response`

// Here is documentation on how to program a jspsych experiment using npm:
// https://www.jspsych.org/7.3/tutorials/hello-world/#option-3-using-npm

import {initJsPsych} from 'jspsych';
import 'jspsych/css/jspsych.css'
import axios from "axios";
import {endPage} from "./pages";
import jsPsychHtmlButtonResponse from '@jspsych/plugin-html-button-response'

const main = async (id, condition) => {
	  var jsPsych = initJsPsych({
		on_finish: function() {
			if (process.env.NODE_APP_devNoDb !== 'True') {
				const observation = [id, jsPsych.data.get().json()];
				axios.post("/data", observation)
					.then((response) => {
						if (response.status != 200) {
							console.warn(response.data.error);
						}
					})
				endPage()
			}
		}
	});

	var timeline = [];

	timeline.push({
		type: jsPsychHtmlButtonResponse,
		stimulus: '<p style="color: red; font-size: 48px; font-weight: bold;">GREEN</p>',
		choices: ['Green', 'Blue', 'Red'],
		button_layout: "flex",
		prompt: "<p>What color is this word? (flex layout)</p>"
	});

	timeline.push({
		type: jsPsychHtmlButtonResponse,
		stimulus: '<p style="color: red; font-size: 48px; font-weight: bold;">GREEN</p>',
		choices: ['Green', 'Blue', 'Red'],
		button_layout: "grid",
		prompt: "<p>What color is this word? (grid layout)</p>"
	});

	timeline.push({
		type: jsPsychHtmlButtonResponse,
		stimulus: '<p style="color: red; font-size: 48px; font-weight: bold;">GREEN</p>',
		choices: ['Green', 'Blue', 'Red'],
		button_layout: "grid",
		grid_rows: 2,
		prompt: "<p>What color is this word? (grid layout, two rows)</p>"
	});

	timeline.push({
		type: jsPsychHtmlButtonResponse,
		stimulus: '<p style="color: green; font-size: 48px; font-weight: bold;">GREEN</p>',
		choices: ['Green', 'Blue', 'Red'],
		stimulus_duration: 1000,
		prompt: "<p>What color is this word? (word disappears after 1s)</p>"
	});

	timeline.push({
		type: jsPsychHtmlButtonResponse,
		stimulus: '<p style="color: blue; font-size: 48px; font-weight: bold;">RED</p>',
		choices: ['Green', 'Blue', 'Red'],
		trial_duration: 2000,
		response_ends_trial: false,
		prompt: "<p>What color is this word? (trial ends after 2s)</p>"
	});

	timeline.push({
		type: jsPsychHtmlButtonResponse,
		stimulus: '<p style="color: red; font-size: 48px; font-weight: bold;">GREEN</p>',
		choices: ['Green', 'Blue', 'Red'],
		enable_button_after: 2000,
		prompt: "<p>What color is this word? (button enable after 2s)</p>"
	});

	await jsPsych.run(timeline);
} 

export default main
