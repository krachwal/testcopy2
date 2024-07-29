from pathlib import Path

import logger
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import JSONResponse, FileResponse, RedirectResponse

app = FastAPI()

logger = logger.config(True)

app.mount("/experiment", StaticFiles(directory="dist"), name="frontend")

@app.get("/")
def default() -> RedirectResponse:
    """
    Make sure to redirect bare IP/url to form landing page
    """
    return RedirectResponse(url='/experiment')


@app.get("/experiment")
def serve_frontend() -> FileResponse:
    """
    Serves static UI
    """
    project_path = Path(__file__).parent.resolve()
    response = FileResponse(str(project_path / "dist/index.html"), media_type="text/html")
    return response