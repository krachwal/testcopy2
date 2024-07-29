// TODO: remove unused imports once firebase dependency is removed

// import { waitPage, endPage, errorPage } from "./pages";
// import { getCondition, setObservation, setBackup } from "autora-firebase-functions";
import main from "./main"
// import db from "./firebase"

const index = async () => {
	// if (process.env.NODE_ENV === 'development' && process.env.NODE_APP_devNoDb === 'True') {
	await main(0, 0)
	return
	// }

	// TODO: rewrite without firebase dependency
/* let prolificId = null
    if (process.env.NODE_APP_useProlificId === 'True') {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        prolificId = urlParams.get('PROLIFIC_PID');
    }
    // let condition = await getCondition(db, 'autora', prolificId)
    let condition = (0, 0) // temporarily set to (0,0) until firebase dependency is removed from getCondition() function call
    if (condition && (prolificId !== null || process.env.NODE_APP_useProlificId === 'False')) {
        const observation = await main(condition[0], condition[1])
        waitPage()
        // await setObservation(db, 'autora', condition[0], observation)
        // await setBackup(db, 'autora', condition[0], condition[1], observation)
        endPage()
    } else {
        errorPage()
    } */
}
await index()