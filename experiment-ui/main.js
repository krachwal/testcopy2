// To use the jsPsych package first install jspsych using `npm install jspsych`
// This example uses the serial-reaction-time plugin. Install it via `npm install @jspsych/plugin-serial-reaction-time`

// Here is documentation on how to program a jspsych experiment using npm:
// https://www.jspsych.org/7.3/tutorials/hello-world/#option-3-using-npm

import {initJsPsych} from 'jspsych';
import 'jspsych/css/jspsych.css'
import axios from "axios";
import {endPage} from "./pages";
import jsPsychSerialReactionTime from '@jspsych/plugin-serial-reaction-time'

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

	var locations = [
		[0,0],
		[0,1],
		[0,2],
		[0,3]
	];

	locations = jsPsych.randomization.shuffle(locations);

	var timeline = {
		timeline: [
			{
				type: jsPsychSerialReactionTime,
				target: jsPsych.timelineVariable('target1'),
				grid_square_size: 80,
				prompt: "<p>Press the key that corresponds to the dark box (use 3, 5, 7, 9)</p>",
				//show_response_feedback: true
			},
			{
				type: jsPsychSerialReactionTime,
				target: jsPsych.timelineVariable('target2'),
				grid_square_size: 80,
				prompt: "<p>Press the key that corresponds to the dark box (use 3, 5, 7, 9)</p>",
				//show_response_feedback: true
			}
		],
		timeline_variables: [
			{target1: locations[0], target2: locations[1]},
			{target1: locations[2], target2: locations[3]}
		],
		randomize_order: true,
		repetitions: 10
	};

	await jsPsych.run([timeline]);
} 

export default main
