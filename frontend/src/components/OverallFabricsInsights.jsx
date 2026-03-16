export default function OverallFabricInsights({ data }) {
    if (!data || data.length === 0) return null;

    // Use .includes() to find the percentage based on keywords in your JSON
    // Note: Use 'count' if that's the key your backend is sending
    const sleek = data.find(f => f.fabric.toLowerCase().includes('sleek'))?.count || 0;
    const artisanal = data.find(f => f.fabric.toLowerCase().includes('artisanal'))?.count || 0;
    const traditional = data.find(f => f.fabric.toLowerCase().includes('ethnic'))?.count || 0;

    return (
        <div style={{ 
            padding: "30px", 
            backgroundColor: "#f0f0f0", 
            borderRadius: "15px", 
            marginTop: "40px" }}>
            <h2 style={{ textAlign: "center", letterSpacing: "2px" }}>
                INDUSTRY FABRIC REPORT
            </h2>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", marginTop: "20px" }}>
                {/* Sleek/Technical Box */}
                <div style={{ flex: "1 1 250px", padding: "15px", background: "white", borderRadius: "8px" }}>
                    <h4>Market Dominance</h4>
                    <p>
                        <strong>Sleek/Technical</strong> textiles lead at {sleek.toFixed(1)}%, 
                        signaling a shift toward high-tech finishes for the SS25 season.
                    </p>
                </div>

                {/* Artisanal Box */}
                <div style={{ flex: "1 1 250px", padding: "15px", background: "white", borderRadius: "8px" }}>
                    <h4>Textural & Cultural Innovation</h4>
                    <p>
                        <strong>Artisanal Weaves</strong> appear in {artisanal.toFixed(1)}% of looks, 
                        highlighting a strong move toward tactile, 3D surfaces.
                    </p>
                </div>
                
                {/* Traditional/Indigenous Box */}
                <div style={{ flex: "1 1 250px", padding: "15px", background: "white", borderRadius: "8px" }}>
                    <h4>Indigenous Signature</h4>
                    <p>
                        <strong>Ethnic Profiles</strong> represent {traditional.toFixed(1)}% of the total industry data, 
                        marking specific luxury niche placements.
                    </p>
                </div>
            </div>
        </div>
    );
}