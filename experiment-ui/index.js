import { errorPage, consentForm, declinePage } from "./pages";
import main from "./main"

import { getCondition } from "./autora-filestore-functions"



const index = async () => {

	consentForm();

	document.getElementById("consent").onclick = async () => {
		if (process.env.NODE_ENV === 'development' && process.env.NODE_APP_devNoDb === 'True') {
			await main(0, 0);
			return;
		}

		let prolificId = "1";

		if (process.env.NODE_APP_useProlificId === 'True') {
			const queryString = window.location.search;
			const urlParams = new URLSearchParams(queryString);
			prolificId = urlParams.get('PROLIFIC_PID');
		}

		let condition = await getCondition('autora', prolificId);

		if (condition && (prolificId !== null || process.env.NODE_APP_useProlificId === 'False')) {
            

			await main(condition[0], condition[1]);

            

		} else {
			errorPage();
		}

		return;
	}
	document.getElementById("decline").onclick = () => {
		declinePage();
	}
}

await index();
