from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from app.routers import colours, insights, fabrics
import os
import json
from pathlib import Path

app = FastAPI(
    title="Lagos Fashion Week 2025 Analysis API",
    description="API for accessing insights and data from Lagos Fashion Week 2025 analysis.",
    version="1.0.0"
                )

app.add_middleware(
    CORSMiddleware,
    allow_origins = ["http://localhost:5173"],
    allow_credentials = True,
    allow_methods = ["*"],
    allow_headers = ["*"],
    )
# read the brands from the runway directory
BASE_RUNWAY = Path(__file__).resolve().parent.parent.parent
RUNWAY = BASE_RUNWAY / "data" / "runway"

app.mount("/images", StaticFiles(directory=str(RUNWAY)), name="images")
@app.get("/brands/{brand_name}/images")
def get_brand_images(brand_name: str):
    try:
        brand_dir = RUNWAY / brand_name
        
        if not brand_dir.exists():
            dirs = {d.lower(): d for d in os.listdir(RUNWAY) if os.path.isdir(os.path.join(RUNWAY, d))}
            if brand_name.lower() in dirs:
                brand_dir = RUNWAY / dirs[brand_name.lower()]
            else:
                return []
        
        images = []
        for file in os.listdir(brand_dir):
            if file.lower().endswith((".jpg", ".jpeg", ".png")):
                images.append(f"/images/{brand_name}/{file}")
        
        return images
    except Exception as e:
        print(f"Error fetching images for brand {brand_name}: {e}")
        return []


@app.get("/brands")
def get_brands():
    brands = []
    for file in os.listdir(RUNWAY):
        path = os.path.join(RUNWAY, file)

        if os.path.isdir(path):
            brands.append(file)
    return brands


BASE_STATS = Path(__file__).resolve().parent.parent.parent
STATS = BASE_STATS / "outputs" / "stats"/ "JSON"

@app.get("/analysis/overview/colours")
def colour_overall():
    counts = {}

    for file in os.listdir(STATS):
        if not file.endswith("_colours.json"):
            continue

        path = os.path.join(STATS, file)
        try:
            with open(path) as f:
                data = json.load(f)
            if not isinstance(data, list):
                continue

            for item in data:
                if "colour" in item and isinstance(item["colour"], str):
                    colour = item["colour"]
                    counts[colour] = counts.get(colour, 0) + 1

                elif "colours" in item and "count" in item:
                    colour = item["colours"]
                    counts[colour] = counts.get(colour, 0) + item["count"]
        except Exception as e:
            print(f"cant process file {file}: {e}")
            continue
    
    if not counts:
        return []

    total = sum(counts.values())
    results = []

    for colour, count in counts.items():
        results.append({
            "colour": colour,
            "count": count,
            "percentage": round((count/total) * 100, 0)
        })
    
    results.sort(key=lambda x:x["count"], reverse=True)
    return results

@app.get("/analysis/brand/{brand}")
def brand_colours(brand: str):

    file_path = os.path.join(STATS, f"{brand}_colours.json")

    if not os.path.exists(file_path):
        return {"error": "Brand not found"}

    with open(file_path) as f:
        data = json.load(f)

    data.sort(key=lambda x: x["count"], reverse=True)

    return data

app.include_router(colours.router)
app.include_router(fabrics.router)
app.include_router(insights.router)