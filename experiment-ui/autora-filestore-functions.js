import autora_metadata from "./conditions_db/autora_meta.json";
import autora_in_data from "./conditions_db/autora_in.json";

const getCondition = async (study, pId = null) => {
	for (let key in autora_metadata[study]) {
		if (autora_metadata[study][key]['start_time'] === null) {
			let unixTime = Math.floor(Date.now() / 1000);
			const condition_str = autora_in_data[study][key];
			let return_arr = condition_str.slice(1, -1).split(",");
			return_arr.push(unixTime.toString());

			return return_arr
		}
	}

	return false;
}

export { getCondition }
