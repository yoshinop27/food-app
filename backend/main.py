import uvicorn
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Any
import os
import requests
from dotenv import load_dotenv
from utils.helpers import priceLevel

load_dotenv()

class Data(BaseModel):
    latitude: float
    longitude: float
    radius: float = 5
    maxprice: float

class RestaurantsResponse(BaseModel):
    places: List[dict[str, Any]]

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initial Run for the places API
@app.post("/restaurants", response_model=RestaurantsResponse)
def get_restaurants(filterData: Data):  # Ensure the parameter name matches
    api_key = os.getenv("GOOGLE_MAPS_API_KEY") or os.getenv("GOOGLE_MAPS_API")
    maxPrice = filterData.maxprice / 25  
    print(maxPrice)
    url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json"
    params = {
        "key": api_key,
        "location": f"{filterData.latitude},{filterData.longitude}",
        "radius": filterData.radius,
        "minprice": 0,
        "maxprice": maxPrice,
    }
    
    try:
        resp = requests.get(url, params=params, timeout=10)
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

    if data.get("status") not in {"OK", "ZERO_RESULTS"}:
        error_message = data.get("error_message", "Unknown Places API error")
        raise HTTPException(
            status_code=502,
            detail=f"Places API returned {data.get('status')}: {error_message}",
        )
    
    results = data.get("results")
    if not isinstance(results, list):
        raise HTTPException(status_code=502, detail="Invalid Places API response format")
    return {"places": results}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
