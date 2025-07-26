from pathlib import Path
from dotenv import load_dotenv
import os
import base64
from fastapi import FastAPI, HTTPException , status 
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import  RedirectResponse
import json
import redis

app = FastAPI()

load_dotenv()

ProjectsPath = Path(os.getenv("PROJECT_PATH"))

NeedToSendSource = ["Shape_Moment" , "ComputingVesselProperty"]

PROFILE_INFO = Path("/static/ProfileInfo.json")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["GET"],
    allow_headers=["*"],
)

app.mount("/static" , StaticFiles(directory="static") , name="static")

REDIS_HOST =   os.getenv("REDIS_HOST")
REDIS_PORT =  os.getenv("REDIS_PORT")
r = redis.Redis(host=REDIS_HOST, port=REDIS_PORT, db=0, decode_responses=True)

@app.get("/me")
async def AboutMe():
    return RedirectResponse(PROFILE_INFO)

def CreateJsonProject(files:Path , baseDict:dict , basePath:str):

    for temp_file in list(files.iterdir()):
        if temp_file.is_dir() : 
            temp_BasePath = basePath + "/" + temp_file.name
            baseDict[temp_BasePath] = {}
            CreateJsonProject(temp_file , baseDict , temp_BasePath)
        elif temp_file.is_file() :
            if temp_file.name.endswith(('.js' , ".html" , ".css" , ".json")):

                baseDict[ basePath + "/" + temp_file.name] ={ "code" :temp_file.read_text("utf-8")}
            elif temp_file.name.endswith(('.wasm' , ".ttf" , ".png")):
                b = temp_file.read_bytes()
                encoded = base64.b64encode(b).decode("ascii")
                baseDict[ basePath + "/" + temp_file.name] = {"type": "binary", "code": encoded}
    
    return baseDict


@app.get("/project/{item_id}")
async def read_item(item_id: str):

    if item_id not in NeedToSendSource :
        raise HTTPException( status_code=status.HTTP_404_NOT_FOUND, detail=f"Projects : {" ".join(NeedToSendSource)}")
    
    cache_key = f"data:{item_id}"
    cached = r.get(cache_key)
    if cached:
        return json.loads(cached)
    
    pathProject = ProjectsPath / Path(item_id)

    projectsSend = {}
    projectsSend = CreateJsonProject(pathProject ,projectsSend  , "" )
    r.set(cache_key, json.dumps(projectsSend))

    return  projectsSend


