from fastapi import FastAPI
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


app.include_router(colours.router)
app.include_router(fabrics.router)
app.include_router(insights.router)