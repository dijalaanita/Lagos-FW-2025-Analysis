from fastapi import APIRouter, HTTPException
from app.services.data_loader import load_data

router = APIRouter(prefix="/analysis/overview", tags=["Fabrics"])


@router.get("/top5")
def get_top_fabrics():
    data = load_data("lfw_dashboard_data.json")

    if isinstance(data, list):
        sorted_fabrics = sorted(data, key=lambda x: x.get("count", 0), reverse=True)
        return sorted_fabrics[:5]

    # Read from summary block
    summary = data.get("summary", {})
    if summary:
        sorted_fabrics = sorted(summary.items(), key=lambda x: x[1], reverse=True)
        return [{"fabric": f, "count": c} for f, c in sorted_fabrics[:5]]

    return []


@router.get("/fabrics")
def get_fabric_frequency():
    data = load_data("lfw_dashboard_data.json")
    summary = data.get("summary", {})

    total = sum(summary.values()) if summary else 0

    formatted_data = []
    for key, value in summary.items():
        formatted_data.append({
            "fabric": key,
            "count": value,
            "percentage": round((value / total * 100), 1) if total > 0 else value
        })

    formatted_data.sort(key=lambda x: x["count"], reverse=True)
    return formatted_data


@router.get("/brand-mapping")
def get_brand_fabric_mapping():
    data = load_data("lfw_dashboard_data.json")
    return data.get("brands", {})


@router.get("/brand/{brand_name}/fabrics")
def get_brand_fabric_frequency(brand_name: str):
    """
    Returns fabric texture profile data for a specific brand,
    read from the brands block of lfw_dashboard_data.json.

    Each entry: { fabric, count, percentage }
    """
    data = load_data("lfw_dashboard_data.json")
    brands = data.get("brands", {})

    # Case-insensitive brand lookup
    brand_key = None
    for key in brands:
        if key.lower() == brand_name.lower():
            brand_key = key
            break

    if brand_key is None:
        # Return empty list rather than 404 so frontend handles gracefully
        return []

    brand_data = brands[brand_key]

    # brand_data is a flat dict: {"Chenille": 25, "Velvet": 7}
    total = sum(brand_data.values()) if brand_data else 0

    formatted = []
    for fabric_label, count in brand_data.items():
        formatted.append({
            "fabric": fabric_label,
            "count": count,
            "percentage": round((count / total * 100), 1) if total > 0 else 0
        })

    formatted.sort(key=lambda x: x["count"], reverse=True)
    return formatted