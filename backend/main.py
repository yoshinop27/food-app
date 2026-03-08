import uvicorn
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Any
import os
import requests

class Coords(BaseModel):
    latitude: float
    longitude: float

class RestaurantsResponse(BaseModel):
    places: List[dict[str, Any]]

app = FastAPI()

origins = [
    "http://localhost:5173"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)

# Initial Run for the places API
@app.post("/resturaunts", response_model=RestaurantsResponse)
def get_restaurants(coords: Coords):
    url = 'https://places.googleapis.com/v1/places:searchNearby'
    payload = { 
        "includedTypes": ["restaurant"],
        "maxResultCount": 10,
        "locationRestriction": {
            "circle": {
                "center": {"latitude": coords.latitude, "longitude": coords.longitude},
                "radius": 50.0
            }
        }
    }
    headers = {
        "Content-Type": 'application/json',
        "X-Goog-Api-Key": os.getenv("GOOGLE_MAPS_API"),
        "X-Goog-FieldMask": 'places.displayName,places.formattedAddress,places.location,places.id'
    }
    try:
        resp = requests.post(url, json=payload, headers=headers, timeout=10)
        resp.raise_for_status()
        data = resp.json()
    except requests.Timeout:
        raise HTTPException(status_code=504, detail="Places API timeout")
    except requests.HTTPError:
        raise HTTPException(status_code=502, detail=f"Places API error: {resp.text}")
    except requests.RequestException as e:
        raise HTTPException(status_code=502, detail=f"Network error: {e}")
    except ValueError:
        raise HTTPException(status_code=502, detail="Invalid JSON from Places API")
    
    places = data.get("places")
    if not isinstance(places, list):
        raise HTTPException(status_code=502, detail="Invalid Places API response format")
    return {"places": places}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
