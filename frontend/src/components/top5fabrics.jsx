// Translation map — raw SVM labels → human-readable texture profiles
const TRANSLATION = {
    "acrylic":       "Synthetic / Technical",
    "chenille":      "Textured Pile Weave",
    "velvet":        "Velvet / Crushed Pile",
    "wool":          "Woven Natural Fibre",
    "africa_fabric": "Traditional Textile",
};

function translateLabel(raw) {
    const key = (raw || "").toLowerCase().replace(/\s+/g, "_");
    return TRANSLATION[key] || raw.replace(/_/g, " ");
}

export default function Top5Fabrics({ data }) {
    if (!data || !Array.isArray(data) || data.length === 0) return null;

    const top5 = data.slice(0, 5);
    const total = data.reduce((sum, f) => sum + (f.count || 0), 0);

    return (
        <div style={{ marginTop: "30px" }}>
            <h3 style={{ textAlign: "center", fontSize: "20px", letterSpacing: "2px", fontWeight: "600" }}>
                DOMINANT TEXTURE PROFILES RANKED
            </h3>
            <ol style={{ paddingLeft: "20px", lineHeight: "2" }}>
                {top5.map((item, index) => {
                    const label = translateLabel(item.fabric || item.label || "");
                    // Use percentage if present, otherwise calculate from count
                    const pct = item.percentage != null
                        ? item.percentage
                        : total > 0 ? ((item.count / total) * 100) : 0;

                    return (
                        <li key={index} style={{ marginBottom: "10px" }}>
                            <span style={{ fontWeight: "bold", fontSize: "1.1em" }}>
                                {label}
                            </span>
                            {" — "}
                            <span style={{ color: "#555" }}>
                                {pct.toFixed(1)}% of the collection.
                            </span>
                        </li>
                    );
                })}
            </ol>
        </div>
    );
}