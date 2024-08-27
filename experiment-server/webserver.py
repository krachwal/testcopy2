from pathlib import Path

import logger
import json
from random import SystemRandom
from string import ascii_letters, digits
from fastapi import FastAPI, Request
from fastapi.staticfiles import StaticFiles
from fastapi.responses import JSONResponse, FileResponse, RedirectResponse
from starlette.middleware.sessions import SessionMiddleware

app = FastAPI()
app.add_middleware(SessionMiddleware, secret_key=''.join(SystemRandom().choice(ascii_letters + digits) for _ in range(42)))

log = logger.config(True)

app.mount("/experiment", StaticFiles(directory="dist"), name="frontend")

@app.get("/")
def default() -> RedirectResponse:
    """
    Make sure to redirect bare IP/url to form landing page
    """
    return RedirectResponse(url="/experiment")


@app.get("/experiment")
def serve_frontend(request: Request, PROLIFIC_PID: str | None = "", STUDY_ID: str | None = "", SESSION_ID: str | None = "") -> FileResponse:
    """
    Serves static UI
    """
    request.session["PROLIFIC_PID"] = PROLIFIC_PID
    request.session["SESSION_ID"] = SESSION_ID
    request.session["STUDY_ID"] = STUDY_ID

    project_path = Path(__file__).parent.resolve()
    response = FileResponse(
        str(project_path / "dist/index.html"), media_type="text/html"
    )
    return response


@app.post("/data")
async def receive_data(request: Request):
    """Receive trial results and write to autora_out.json

    Args:
        request (Request): incoming array of [id, trial_result]

    Returns:
        data: trial result
    """
    input = await request.json()

    prolific_pid = request.session.get("PROLIFIC_PID")
    prolific_session_id = request.session.get("SESSION_ID")
    prolific_study_id = request.session.get("STUDY_ID")

    id = prolific_pid if prolific_pid else input[0]
    data = input[1]

    project_path = Path(__file__).parent.resolve().parent.resolve()
    out_file_location = project_path / "experiment-server" / "autora_out" / "autora_out.json"

    new_data = {
        "study_id": prolific_study_id,
        "session_id": prolific_session_id,
        "data": data
    }

    if out_file_location.exists():
        with open(out_file_location, "r") as f:
            existing_data = json.load(f)
            existing_data[id] = new_data

        with open(out_file_location, "w") as f:
            json.dump(existing_data, f)

    return data
