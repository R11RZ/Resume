from pathlib import Path

import base64
from fastapi import FastAPI, HTTPException , status 
from fastapi.staticfiles import StaticFiles
from fastapi.responses import  RedirectResponse
import json
import redis
from config import REDIS_HOST , REDIS_PORT , Projects_Path

app = FastAPI(root_path="/api")


NeedToSendSource = ["Shape_Moment" , "ComputingVesselProperty"]

PROFILE_INFO = Path("/api/static/ProfileInfo.json")


app.mount("/static" , StaticFiles(directory="static") , name="static")

r = redis.Redis(host=REDIS_HOST, port=REDIS_PORT, db=0, decode_responses=True)

@app.get("/me")
async def about_me():
    return RedirectResponse(PROFILE_INFO)

def build_project_tree(files:Path , baseDict:dict , basePath:str):

    for temp_file in list(files.iterdir()):
        if temp_file.is_dir() : 
            temp_BasePath = basePath + "/" + temp_file.name
            baseDict[temp_BasePath] = {}
            build_project_tree(temp_file , baseDict , temp_BasePath)
        elif temp_file.is_file() :
            if temp_file.name.endswith(('.js' , ".html" , ".css" , ".json")):

                baseDict[ basePath + "/" + temp_file.name] ={ "code" :temp_file.read_text("utf-8")}
            elif temp_file.name.endswith(('.wasm' , ".ttf" , ".png")):
                b = temp_file.read_bytes()
                encoded = base64.b64encode(b).decode("ascii")
                baseDict[ basePath + "/" + temp_file.name] = {"type": "binary", "code": encoded}
    
    return baseDict


@app.get("/project/{item_id}")
async def project_data(item_id: str):

    if item_id not in NeedToSendSource :
        raise HTTPException( status_code=status.HTTP_404_NOT_FOUND, detail=f"Projects : {" ".join(NeedToSendSource)}")
    
    cache_key = f"data:{item_id}"
    cached = r.get(cache_key)
    if cached:
        return json.loads(cached)
    
    pathProject = Projects_Path / Path(item_id)

    projectsSend = {}
    projectsSend = build_project_tree(pathProject ,projectsSend  , "" )
    r.set(cache_key, json.dumps(projectsSend))

    return  projectsSend


