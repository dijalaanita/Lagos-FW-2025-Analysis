import { useRef } from "react";

/**
 * ExportReport
 * Props:
 *   brand       {string}  - brand name
 *   colours     {Array}   - colour data array
 *   fabrics     {Array}   - fabric data array
 *   role        {string}  - user role (controls what appears in export)
 *
 * Usage: drop this anywhere inside BrandAnalysis.jsx
 * <ExportReport brand={brand} colours={data} fabrics={fabric} role={role} />
 */

const COLOUR_HEX = {
  black: "#1a1a1a", white: "#f5f5f5", beige: "#d4b896", brown: "#7c5c3e",
  red: "#c0392b", blue: "#2471a3", navy: "#1a2a4a", green: "#1e8449",
  yellow: "#d4ac0d", orange: "#ca6f1e", pink: "#d98880", purple: "#7d3c98",
  grey: "#808080", gray: "#808080", ivory: "#f9f4e8", cream: "#f5f0e0",
  gold: "#c9a84c", silver: "#a8a9ad", terracotta: "#c0622a", khaki: "#b5a06e",
};

function hexForColour(name) {
  const key = (name || "").toLowerCase().trim();
  for (const [k, v] of Object.entries(COLOUR_HEX)) {
    if (key.includes(k)) return v;
  }
  return "#cccccc";
}

export default function ExportReport({ brand, colours = [], fabrics = [], role }) {
  const reportRef = useRef();

  const handleExport = () => {
    const printWindow = window.open("", "_blank");
    printWindow.document.write(`
      <html>
      <head>
        <title>HoL — ${(brand || "").replace(/_/g, " ").toUpperCase()} Collection Insight Report</title>
        <style>
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #111; padding: 40px; }
          h1 { font-size: 28px; font-weight: 300; letter-spacing: 6px; text-transform: uppercase; margin-bottom: 4px; }
          h2 { font-size: 12px; letter-spacing: 3px; color: #999; text-transform: uppercase; margin-bottom: 32px; }
          h3 { font-size: 13px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; color: #111; margin-bottom: 14px; }
          .section { margin-bottom: 32px; padding: 24px; background: #fafafa; border-radius: 10px; }
          .meta { font-size: 11px; color: #888; margin-bottom: 20px; }
          .colour-row { display: flex; align-items: center; gap: 12px; margin-bottom: 10px; }
          .swatch { width: 28px; height: 28px; border-radius: 50%; border: 2px solid #eee; flex-shrink: 0; }
          .bar-wrap { flex: 1; height: 8px; background: #eee; border-radius: 4px; overflow: hidden; }
          .bar { height: 100%; background: #111; border-radius: 4px; }
          .label { font-size: 13px; font-weight: 600; min-width: 100px; }
          .pct { font-size: 12px; color: #888; min-width: 40px; text-align: right; }
          .fabric-row { display: flex; align-items: center; gap: 12px; margin-bottom: 10px; }
          .rank { width: 24px; height: 24px; border-radius: 50%; background: #111; color: #fff; display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 700; flex-shrink: 0; }
          .disclaimer { font-size: 10px; color: #bbb; font-style: italic; margin-top: 24px; border-top: 1px solid #eee; padding-top: 14px; }
          .footer { text-align: center; font-size: 11px; color: #ccc; letter-spacing: 2px; margin-top: 40px; }
          @media print { body { padding: 20px; } }
        </style>
      </head>
      <body>
        ${reportRef.current.innerHTML}
        <script>window.onload = () => { window.print(); }<\/script>
      </body>
      </html>
    `);
    printWindow.document.close();
  };

  const top5Colours = colours.slice(0, 5);
  const top5Fabrics = fabrics.slice(0, 5);
  const totalColours = colours.reduce((s, c) => s + (c.count || 0), 0);
  const totalFabrics = fabrics.reduce((s, f) => s + (f.count || 0), 0);
  const today = new Date().toLocaleDateString("en-GB", { year: "numeric", month: "long", day: "numeric" });

  return (
    <>
      {/* Trigger button */}
      <button
        onClick={handleExport}
        style={{
          display: "inline-flex", alignItems: "center", gap: "8px",
          padding: "11px 22px", background: "#111", color: "#fff",
          border: "none", borderRadius: "8px", fontSize: "13px",
          fontWeight: "600", letterSpacing: "1.5px", cursor: "pointer",
          textTransform: "uppercase",
        }}
      >
        ⬇ Export Report
      </button>

      {/* Hidden printable content */}
      <div ref={reportRef} style={{ display: "none" }}>
        <h1>{(brand || "").replace(/_/g, " ")}</h1>
        <h2>Collection Insight Report · HoL LFW F/W 2025</h2>
        <p className="meta">Generated: {today} · Role: {role} · AI-assisted analysis</p>

        {/* Colour Section */}
        {top5Colours.length > 0 && (
          <div className="section">
            <h3>Colour Frequency Analysis</h3>
            {top5Colours.map((c, i) => {
              const pct = totalColours > 0 ? ((c.count / totalColours) * 100).toFixed(1) : (c.percentage || 0);
              return (
                <div className="colour-row" key={i}>
                  <div className="swatch" style={{ background: hexForColour(c.colour) }} />
                  <div className="label">{c.colour}</div>
                  <div className="bar-wrap"><div className="bar" style={{ width: `${pct}%` }} /></div>
                  <div className="pct">{pct}%</div>
                </div>
              );
            })}
          </div>
        )}

        {/* Fabric Section */}
        {top5Fabrics.length > 0 && (
          <div className="section">
            <h3>Fabric Classification Summary</h3>
            {top5Fabrics.map((f, i) => {
              const label = f.fabric || f.label || f.texture || "Unknown";
              const pct = totalFabrics > 0 ? ((f.count / totalFabrics) * 100).toFixed(1) : 0;
              return (
                <div className="fabric-row" key={i}>
                  <div className="rank">{i + 1}</div>
                  <div className="label">{label}</div>
                  <div className="bar-wrap"><div className="bar" style={{ width: `${pct}%` }} /></div>
                  <div className="pct">{pct}%</div>
                </div>
              );
            })}
          </div>
        )}

        <p className="disclaimer">
          This report was generated using AI-assisted computer vision analysis of runway imagery from Lagos Fashion Week F/W 2025.
          Results represent probabilistic estimations and should be used as a supplementary analytical tool, not as an authoritative
          characterization of the designer's collection. HoL — House of Lasgidi. Lancaster University Ghana, 2025.
        </p>

        <div className="footer">HoL — HOUSE OF LASGIDI · LAGOS FASHION WEEK F/W 2025</div>
      </div>
    </>
  );
}
