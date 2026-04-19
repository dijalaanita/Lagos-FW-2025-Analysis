import { useEffect, useState } from "react";
import { getBrands } from "../services/api";
import BrandSelector from "./BrandSelector";

// Static designer profiles — replace or extend with a backend endpoint
// (e.g. GET /brands/{brand}/profile) when you have that data
const DESIGNER_PROFILES = {
  default: {
    bio: "Profile information for this designer is not yet available in the HoL database.",
    established: "—",
    origin: "Lagos, Nigeria",
    signature: "—",
    category: "Ready-to-Wear",
    website: null,
  },
};

function getProfile(brand) {
  const key = (brand || "").toLowerCase().replace(/\s+/g, "_");
  return DESIGNER_PROFILES[key] || { ...DESIGNER_PROFILES.default };
}

export default function DesignerProfile({ brands: brandsProp, currentBrand }) {
  const [brands, setBrands] = useState(brandsProp || []);
  const [brand, setBrand] = useState(currentBrand || "");

  useEffect(() => {
    if (brandsProp && brandsProp.length > 0) {
      setBrands(brandsProp);
      if (!brand) setBrand(brandsProp[0]);
    } else {
      getBrands().then(b => { setBrands(b); if (!brand) setBrand(b[0]); });
    }
  }, []);

  const profile = getProfile(brand);
  const displayName = (brand || "").replace(/_/g, " ").toUpperCase();

  return (
    <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "20px", fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}>
      <h1 style={{ fontSize: "2rem", textAlign: "center", letterSpacing: "4px", fontWeight: "300", marginBottom: "8px" }}>
        DESIGNER RESEARCH PROFILE
      </h1>
      <p style={{ textAlign: "center", color: "#999", fontSize: "12px", letterSpacing: "2px", marginBottom: "32px" }}>
        BRAND INTELLIGENCE · LFW F/W 2025
      </p>

      <BrandSelector brands={brands} onSelect={setBrand} currentBrand={brand} />

      {/* Profile Card */}
      <div style={{ background: "#fafafa", borderRadius: "16px", padding: "36px", marginTop: "24px" }}>
        <div style={{ display: "flex", gap: "32px", flexWrap: "wrap", alignItems: "flex-start" }}>

          {/* Avatar placeholder */}
          <div style={{
            width: "100px", height: "100px", borderRadius: "50%",
            background: "#111", display: "flex", alignItems: "center", justifyContent: "center",
            color: "#fff", fontSize: "36px", flexShrink: 0, letterSpacing: "2px", fontWeight: "300"
          }}>
            {(brand || "?")[0].toUpperCase()}
          </div>

          {/* Name + meta */}
          <div style={{ flex: 1 }}>
            <h2 style={{ fontSize: "24px", fontWeight: "700", letterSpacing: "3px", color: "#111", margin: "0 0 8px" }}>
              {displayName}
            </h2>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", marginTop: "8px" }}>
              {[
                { label: "Origin", value: profile.origin },
                { label: "Est.", value: profile.established },
                { label: "Category", value: profile.category },
                { label: "Signature Style", value: profile.signature },
              ].map(({ label, value }) => (
                <div key={label} style={{ background: "#fff", border: "1px solid #e5e5e5", borderRadius: "8px", padding: "10px 16px", minWidth: "120px" }}>
                  <div style={{ fontSize: "10px", letterSpacing: "1.5px", color: "#aaa", textTransform: "uppercase" }}>{label}</div>
                  <div style={{ fontSize: "14px", fontWeight: "600", color: "#111", marginTop: "4px" }}>{value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bio */}
        <div style={{ marginTop: "28px", borderTop: "1px solid #eee", paddingTop: "24px" }}>
          <div style={{ fontSize: "11px", letterSpacing: "2px", color: "#aaa", textTransform: "uppercase", marginBottom: "10px" }}>
            About
          </div>
          <p style={{ fontSize: "15px", lineHeight: "1.8", color: "#444", margin: 0 }}>{profile.bio}</p>
        </div>

        {/* Website link */}
        {profile.website && (
          <div style={{ marginTop: "20px" }}>
            <a href={profile.website} target="_blank" rel="noopener noreferrer"
              style={{ fontSize: "13px", color: "#111", fontWeight: "600", textDecoration: "underline" }}>
              Visit Official Website →
            </a>
          </div>
        )}

        {/* LFW 2025 Data Note */}
        <div style={{ marginTop: "28px", background: "#111", borderRadius: "10px", padding: "16px 20px" }}>
          <div style={{ fontSize: "11px", letterSpacing: "2px", color: "#888", textTransform: "uppercase", marginBottom: "8px" }}>
            LFW F/W 2025 Data Profile
          </div>
          <p style={{ fontSize: "13px", color: "#ccc", margin: 0, lineHeight: "1.7" }}>
            This profile is backed by AI-analysed runway imagery from Lagos Fashion Week F/W 2025.
            Colour and fabric sentiment data for this designer is available in the Brand Analysis section.
            Profile narrative data can be expanded by connecting to an external designer database or CMS.
          </p>
        </div>

        <p style={{ fontSize: "11px", color: "#bbb", marginTop: "16px", fontStyle: "italic" }}>
          ⚠️ Profile information is based on AI analysis and publicly available data. It is intended as a research reference, not an authoritative representation of the designer's practice.
        </p>
      </div>

      {/* How to add real profile data */}
      <div style={{ marginTop: "16px", background: "#fff8e1", border: "1px solid #ffe082", borderRadius: "10px", padding: "16px 20px" }}>
        <strong style={{ fontSize: "12px", color: "#7c5c00" }}>💡 Developer Note:</strong>
        <p style={{ fontSize: "12px", color: "#7c5c00", margin: "6px 0 0" }}>
          To populate real designer bios, add entries to the <code>DESIGNER_PROFILES</code> object in this component,
          or create a backend endpoint <code>GET /brands/{"{brand}"}/profile</code> that reads from a JSON file
          at <code>outputs/stats/JSON/{"{brand}"}_profile.json</code>.
        </p>
      </div>
    </div>
  );
}
