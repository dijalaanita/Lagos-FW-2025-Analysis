import { useEffect, useState } from "react";
import axios from "axios";
import { getBrandColours, getBrands } from "../services/api";
import { useRole } from "../App";
import ColourCharts from "../components/colourcharts";
import BrandSelector from "../components/BrandSelector";
import Insights from "../components/Insights";
import ColourPalette from "../components/ColourPalette";
import ImageGallery from "../components/imagegallery";
import Top5 from "../components/top5";
import FabricCharts from "../components/FabricCharts";
import Top5Fabrics from "../components/top5fabrics";
import FabricInsights from "../components/FabricInsights";
import DesignerProfile from "../components/DesignerProfile";
import ExportReport from "../components/ExportReport";

export default function BrandAnalysis() {
  const { role } = useRole();

  const [data, setData] = useState([]);
  const [brand, setBrand] = useState("");
  const [brands, setBrands] = useState([]);
  const [fabric, setFabric] = useState([]);
  const [loading, setLoading] = useState(true);
  // Tab: "analysis" | "profile"
  const [tab, setTab] = useState("analysis");

  useEffect(() => {
    getBrands()
      .then(response => {
        if (response && response.length > 0) {
          setBrands(response);
          setBrand(response[0]);
        }
      })
      .catch(error => console.error("Error fetching brands:", error));
  }, []);

  useEffect(() => {
    if (!brand) return;
    setLoading(true);
    const fetchBrandData = async () => {
      try {
        const colourRes = await getBrandColours(brand);
        setData(colourRes);
        const fabricRes = await axios.get(`http://127.0.0.1:8000/analysis/brand/${brand}/fabrics`);
        setFabric(fabricRes.data);
      } catch (error) {
        console.error("Error fetching brand details:", error);
        setFabric([]);
      } finally {
        setLoading(false);
      }
    };
    fetchBrandData();
  }, [brand]);

  if (loading) return (
    <div style={{ textAlign: "center", padding: "50px", color: "#999" }}>
      Loading {brand.replace(/_/g, " ")} analysis...
    </div>
  );

  return (
    <div style={{
      maxWidth: "1100px", margin: "0 auto", padding: "20px",
      fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", color: "#333"
    }}>
      {/* Header */}
      <h1 style={{
        fontSize: "2.5rem", textAlign: "center", letterSpacing: "4px",
        fontWeight: "300", marginBottom: "40px", lineHeight: "1.4"
      }}>
        {brand.replace(/_/g, " ").toUpperCase()}<br />
        <span style={{ fontSize: "1rem", fontWeight: "600", color: "#999", letterSpacing: "3px" }}>
          LFW 2025 TEXTURE & COLOUR ANALYSIS
        </span>
      </h1>

      <BrandSelector brands={brands} onSelect={(b) => { setBrand(b); setTab("analysis"); }} currentBrand={brand} />

      {/* Tab Bar */}
      <div style={{ display: "flex", gap: "4px", margin: "28px 0 0", borderBottom: "2px solid #eee" }}>
        {[
          { key: "analysis", label: "Collection Analysis" },
          { key: "profile", label: "Designer Profile" },
        ].map(t => (
          <button key={t.key} onClick={() => setTab(t.key)} style={{
            padding: "10px 22px", border: "none", background: "none", cursor: "pointer",
            fontSize: "13px", fontWeight: "600", letterSpacing: "1px",
            borderBottom: tab === t.key ? "3px solid #111" : "3px solid transparent",
            color: tab === t.key ? "#111" : "#999",
            marginBottom: "-2px",
          }}>
            {t.label.toUpperCase()}
          </button>
        ))}

        {/* Export button — all roles */}
        <div style={{ marginLeft: "auto", paddingBottom: "8px" }}>
          <ExportReport brand={brand} colours={data} fabrics={fabric} role={role} />
        </div>
      </div>

      {/* ── Tab: Collection Analysis ── */}
      {tab === "analysis" && (
        <>
          <ImageGallery brandName={brand} />

          <div style={{ backgroundColor: "#fafafa", borderRadius: "20px", padding: "30px", marginTop: "20px" }}>
            {data?.length > 0 ? (
              <ColourCharts data={data} />
            ) : (
              <p style={{ textAlign: "center" }}>No colour data available.</p>
            )}

            <div style={{ display: "flex", flexWrap: "wrap", gap: "30px", marginTop: "40px" }}>
              <div style={{ flex: "1 1 300px" }}><ColourPalette data={data} /></div>
              <div style={{ flex: "1 1 300px" }}><Top5 data={data} /></div>
            </div>

            <Insights data={data} />

            {/* Fabric section */}
            {fabric?.length > 0 && (
              <>
                <hr style={{ border: 0, height: "1px", background: "#e0e0e0", margin: "40px 0" }} />
                <h2 style={{ fontSize: "14px", fontWeight: "700", letterSpacing: "3px", color: "#999", textAlign: "center", marginBottom: "24px" }}>
                  FABRIC ANALYSIS
                </h2>
                <div style={{ height: "400px", width: "100%" }}>
                  <FabricCharts data={fabric} title={`${brand.replace(/_/g, " ").toUpperCase()} FABRIC DISTRIBUTION`} />
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "30px", marginTop: "30px" }}>
                  <div style={{ flex: "1 1 300px" }}><Top5Fabrics data={fabric} /></div>
                </div>
                <FabricInsights data={fabric} />
              </>
            )}
          </div>
        </>
      )}

      {/* ── Tab: Designer Profile ── */}
      {tab === "profile" && (
        <div style={{ marginTop: "24px" }}>
          <DesignerProfile brands={brands} currentBrand={brand} />
        </div>
      )}
    </div>
  );
}