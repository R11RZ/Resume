from dotenv import load_dotenv
import os
from pathlib import Path
load_dotenv()

Projects_Path = Path(os.getenv("PROJECT_PATH"))

REDIS_HOST =   os.getenv("REDIS_HOST")
REDIS_PORT =  os.getenv("REDIS_PORT")