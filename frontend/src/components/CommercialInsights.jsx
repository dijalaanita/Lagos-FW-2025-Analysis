import { useEffect, useState } from "react";
import { getBrandColours, getBrandFabrics, getBrands } from "../services/api";
import BrandSelector from "./BrandSelector";

// Maps colour names to approximate hex values for swatches
const COLOUR_HEX = {
  black: "#1a1a1a", white: "#f5f5f5", beige: "#d4b896", brown: "#7c5c3e",
  red: "#c0392b", blue: "#2471a3", navy: "#1a2a4a", green: "#1e8449",
  yellow: "#d4ac0d", orange: "#ca6f1e", pink: "#d98880", purple: "#7d3c98",
  grey: "#808080", gray: "#808080", ivory: "#f9f4e8", cream: "#f5f0e0",
  gold: "#c9a84c", silver: "#a8a9ad", terracotta: "#c0622a", khaki: "#b5a06e",
  olive: "#808000", teal: "#148f77", burgundy: "#800020", mustard: "#e3a857",
};

function hexForColour(name) {
  const key = (name || "").toLowerCase().trim();
  for (const [k, v] of Object.entries(COLOUR_HEX)) {
    if (key.includes(k)) return v;
  }
  return "#cccccc";
}

// Derive a "market appeal" label from the top colour
function marketAppeal(topColours) {
  if (!topColours || topColours.length === 0) return "Versatile";
  const top = (topColours[0]?.colour || "").toLowerCase();
  if (["black", "navy", "grey", "gray", "white"].some(c => top.includes(c))) return "Classic & Commercial";
  if (["red", "orange", "yellow", "gold", "mustard"].some(c => top.includes(c))) return "Bold & Statement";
  if (["beige", "ivory", "cream", "khaki"].some(c => top.includes(c))) return "Neutral & Wearable";
  if (["blue", "teal", "green", "olive"].some(c => top.includes(c))) return "Fresh & Contemporary";
  if (["pink", "purple", "burgundy"].some(c => top.includes(c))) return "Expressive & Luxe";
  return "Trend-Forward";
}

// Derive a buyer recommendation from fabric data
function fabricRecommendation(topFabrics) {
  if (!topFabrics || topFabrics.length === 0) return null;
  const top = (topFabrics[0]?.fabric || topFabrics[0]?.label || "").toLowerCase();
  if (top.includes("silk") || top.includes("satin")) return { label: "Luxury Retail", note: "High-end positioning — premium price point viable." };
  if (top.includes("cotton") || top.includes("linen")) return { label: "Mass Market", note: "Accessible fabrics — broad consumer appeal and scalable." };
  if (top.includes("lace") || top.includes("embroid")) return { label: "Special Occasion", note: "Occasion wear market — bridal, event, and couture retail." };
  if (top.includes("denim") || top.includes("canvas")) return { label: "Casual Lifestyle", note: "Streetwear and lifestyle retail alignment." };
  if (top.includes("velvet") || top.includes("brocade")) return { label: "Statement & Seasonal", note: "Strong seasonal collections, editorial & red carpet pull." };
  return { label: "Multi-Channel", note: "Versatile textile profile — suitable across retail categories." };
}

export default function CommercialInsights({ brands: brandsProp }) {
  const [brands, setBrands] = useState(brandsProp || []);
  const [brand, setBrand] = useState("");
  const [colours, setColours] = useState([]);
  const [fabrics, setFabrics] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (brandsProp && brandsProp.length > 0) {
      setBrands(brandsProp);
      setBrand(brandsProp[0]);
    } else {
      getBrands().then(b => { setBrands(b); setBrand(b[0]); });
    }
  }, []);

  useEffect(() => {
    if (!brand) return;
    setLoading(true);
    Promise.all([getBrandColours(brand), getBrandFabrics(brand)])
      .then(([c, f]) => { setColours(c || []); setFabrics(f || []); })
      .catch(() => { setColours([]); setFabrics([]); })
      .finally(() => setLoading(false));
  }, [brand]);

  const top5Colours = colours.slice(0, 5);
  const top3Fabrics = fabrics.slice(0, 3);
  const appeal = marketAppeal(top5Colours);
  const fabricRec = fabricRecommendation(fabrics);
  const totalColourCount = colours.reduce((s, c) => s + (c.count || 0), 0);

  return (
    <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "20px", fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}>
      <h1 style={{ fontSize: "2rem", textAlign: "center", letterSpacing: "4px", fontWeight: "300", marginBottom: "8px" }}>
        COMMERCIAL INSIGHTS
      </h1>
      <p style={{ textAlign: "center", color: "#999", fontSize: "12px", letterSpacing: "2px", marginBottom: "32px" }}>
        BUYER INTELLIGENCE REPORT · LFW F/W 2025
      </p>

      <BrandSelector brands={brands} onSelect={setBrand} currentBrand={brand} />

      {loading ? (
        <div style={{ textAlign: "center", padding: "60px", color: "#999" }}>Loading commercial data for {brand?.replace(/_/g, " ")}...</div>
      ) : (
        <>
          {/* Market Positioning Card */}
          <div style={cardStyle}>
            <h2 style={cardTitle}>📊 Market Positioning</h2>
            <div style={{ display: "flex", alignItems: "center", gap: "20px", flexWrap: "wrap" }}>
              <div style={{ flex: "1 1 200px" }}>
                <div style={{ fontSize: "28px", fontWeight: "700", color: "#111", letterSpacing: "1px" }}>{appeal}</div>
                <div style={{ fontSize: "13px", color: "#888", marginTop: "6px" }}>Dominant colour-tone market signal</div>
              </div>
              {fabricRec && (
                <div style={{ flex: "1 1 200px", background: "#f0f0f0", borderRadius: "10px", padding: "16px" }}>
                  <div style={{ fontSize: "14px", fontWeight: "700", color: "#111" }}>Retail Category: {fabricRec.label}</div>
                  <div style={{ fontSize: "12px", color: "#666", marginTop: "4px" }}>{fabricRec.note}</div>
                </div>
              )}
            </div>
          </div>

          {/* Colour Commercial Palette */}
          <div style={cardStyle}>
            <h2 style={cardTitle}>🎨 Commercial Colour Palette</h2>
            <p style={{ fontSize: "13px", color: "#888", marginBottom: "20px" }}>Top colours ranked by runway frequency — higher frequency = stronger commercial signal.</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
              {top5Colours.map((c, i) => {
                const pct = totalColourCount > 0 ? ((c.count / totalColourCount) * 100).toFixed(1) : c.percentage;
                return (
                  <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
                    <div style={{
                      width: "60px", height: "60px", borderRadius: "50%",
                      background: hexForColour(c.colour),
                      border: "3px solid #eee",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.12)"
                    }} />
                    <div style={{ fontSize: "11px", fontWeight: "600", color: "#333", textAlign: "center", maxWidth: "70px" }}>
                      {c.colour}
                    </div>
                    <div style={{ fontSize: "11px", color: "#999" }}>{pct}%</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Fabric Commercial Summary */}
          {top3Fabrics.length > 0 && (
            <div style={cardStyle}>
              <h2 style={cardTitle}>🧵 Fabric Commercial Profile</h2>
              <p style={{ fontSize: "13px", color: "#888", marginBottom: "20px" }}>
                Fabric classification informs production cost, target market, and retail channel strategy.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {top3Fabrics.map((f, i) => {
                  const label = f.fabric || f.label || f.texture || "Unknown";
                  const count = f.count || 0;
                  const total = fabrics.reduce((s, x) => s + (x.count || 0), 0);
                  const pct = total > 0 ? ((count / total) * 100).toFixed(1) : 0;
                  return (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                      <div style={{ width: "28px", height: "28px", borderRadius: "50%", background: ["#111","#555","#999"][i], display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: "12px", fontWeight: "700", flexShrink: 0 }}>
                        {i + 1}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: "14px", fontWeight: "600", color: "#111" }}>{label}</div>
                        <div style={{ marginTop: "4px", height: "6px", background: "#eee", borderRadius: "3px", overflow: "hidden" }}>
                          <div style={{ width: `${pct}%`, height: "100%", background: "#111", borderRadius: "3px" }} />
                        </div>
                      </div>
                      <div style={{ fontSize: "13px", color: "#666", minWidth: "40px", textAlign: "right" }}>{pct}%</div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Buyer Action Summary */}
          <div style={{ ...cardStyle, background: "#111", color: "#fff" }}>
            <h2 style={{ ...cardTitle, color: "#fff" }}>💼 Buyer Takeaway</h2>
            <p style={{ fontSize: "14px", lineHeight: "1.7", color: "#ccc" }}>
              {brand?.replace(/_/g, " ")} presents a <strong style={{ color: "#fff" }}>{appeal.toLowerCase()}</strong> palette
              {fabricRec ? ` with a <strong style={{ color: "#fff" }}>${fabricRec.label.toLowerCase()}</strong> fabric profile` : ""}.
              {" "}The dominant colour story signals strong alignment with{" "}
              {appeal.includes("Classic") ? "core commercial staples and repeat purchase potential." :
               appeal.includes("Bold") ? "statement-piece retail and editorial placement." :
               appeal.includes("Neutral") ? "wardrobe-essential positioning and cross-season wearability." :
               "trend-conscious retail environments and emerging market segments."}
            </p>
            <p style={{ fontSize: "12px", color: "#666", marginTop: "16px", fontStyle: "italic" }}>
              ⚠️ This report is generated from AI-analysed runway data and is intended as a supplementary tool, not a substitute for editorial judgment.
            </p>
          </div>
        </>
      )}
    </div>
  );
}

const cardStyle = {
  background: "#fafafa",
  borderRadius: "16px",
  padding: "28px",
  marginTop: "24px",
};

const cardTitle = {
  fontSize: "14px",
  fontWeight: "700",
  letterSpacing: "2px",
  textTransform: "uppercase",
  color: "#111",
  marginBottom: "16px",
  marginTop: 0,
};
