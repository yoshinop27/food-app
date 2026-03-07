import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List

class Resturaunt(BaseModel):
    name: str

class Resturaunts(BaseModel):
    group: List[Resturaunt]

app = FastAPI()

origins = [
    "http://localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)

resturaunts = []

#### Example
# Method + Endpoint
# Response Model is the reutrn type
# function is what will run - pass in our data to our model for return
@app.get("/resturaunts", response_model=Resturaunts)
def get_Resturaunts():
    return Resturaunts(group=resturaunts)

@app.post("/resturaunts", response_model=Resturaunt)
def add_resturuant(resturaunt : Resturaunt):
    resturaunts.append(resturaunt)
    return resturaunt

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
