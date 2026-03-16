from fastapi import APIRouter
from app.services.data_loader import load_data

router = APIRouter(prefix="/analysis/overview", tags=["Fabrics"])

@router.get("/top5")
def get_top_fabrics():
    # You MUST pass the filename here too!
    data = load_data("lfw_dashboard_data.json") 
    
    # If load_data returns a list of dicts like [{"fabric": "Silk", "count": 10}, ...]
    if isinstance(data, list):
        sorted_fabrics = sorted(data, key=lambda x: x.get("count", 0), reverse=True)
        return sorted_fabrics[:5]
    
    # If it returns a flat dict like {"Silk": 10, "Cotton": 5}
    sorted_fabrics = sorted(data.items(), key=lambda x: x[1], reverse=True)
    return [{"fabric": f, "count": c} for f, c in sorted_fabrics[:5]]

    return {"top_fabrics": sorted_fabrics[:5]}


@router.get("/fabrics")
def get_fabric_frequency():
    data = load_data("lfw_dashboard_data.json")
    summary = data.get("summary", {})
    
    formatted_data = []
    for key, value in summary.items():
        formatted_data.append({
            "fabric": key, 
            "count": value,
            "percentage": value # This allows you to use dataKey="percentage" if you prefer
        })
    
    formatted_data.sort(key=lambda x: x["count"], reverse=True)
    return formatted_data

@router.get("/brand-mapping")
def get_brand_fabric_mapping():
    data = load_data("lfw_dashboard_data.json")
    return data.get("brands", {})