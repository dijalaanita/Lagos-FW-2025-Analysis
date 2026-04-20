export default function OverallFabricInsights({ data }) {
    if (!data || data.length === 0) return null;

    const total = data.reduce((sum, f) => sum + (f.count || 0), 0);

    const getPct = (keyword) => {
        const entry = data.find(f => f.fabric?.toLowerCase().includes(keyword.toLowerCase()));
        if (!entry || total === 0) return 0;
        return ((entry.count / total) * 100);
    };

    const synthetic   = getPct("synthetic") || getPct("acrylic") || getPct("technical");
    const textured    = getPct("textured")  || getPct("chenille") || getPct("pile");
    const velvet      = getPct("velvet")    || getPct("crushed")  || getPct("matte pile");
    const natural     = getPct("woven")     || getPct("wool")     || getPct("natural");
    const traditional = getPct("traditional") || getPct("africa") || getPct("complex");

    const cards = [
        {
            show: synthetic > 0,
            title: "Synthetic / Technical",
            heading: "Performance & Modernity",
            examples: ["Stretch Satin", "Neoprene"],
            body: `Synthetic and technical fabrics account for ${synthetic.toFixed(1)}% of the show, signalling a shift toward high-performance, high-sheen finishes among Lagos designers.`,
        },
        {
            show: textured > 0,
            title: "Textured Pile Weave",
            heading: "Tactile Innovation",
            examples: ["Chenille", "Bouclé"],
            body: `Textured pile weaves represent ${textured.toFixed(1)}% of the collection data, reflecting a strong move toward three-dimensional, touch-forward surfaces on the runway.`,
        },
        {
            show: velvet > 0,
            title: "Velvet / Crushed Pile",
            heading: "Luxury & Depth",
            examples: ["Crushed Velvet", "Silk Velvet"],
            body: `Velvet and crushed pile fabrics appear in ${velvet.toFixed(1)}% of looks, anchoring the show's luxury positioning and its appetite for rich, light-absorbing surfaces.`,
        },
        {
            show: natural > 0,
            title: "Woven Natural Fibre",
            heading: "Craft & Sustainability",
            examples: ["Wool Tweed", "Linen"],
            body: `Woven natural fibres make up ${natural.toFixed(1)}% of the total fabric profile, pointing to a growing appetite for artisanal and sustainably sourced materials across the show.`,
        },
        {
            show: traditional > 0,
            title: "Traditional Textile",
            heading: "Heritage Signature",
            examples: ["Aso-Oke", "Ankara"],
            body: `Traditional textiles represent ${traditional.toFixed(1)}% of the industry dataset, marking a distinct and commercially significant heritage positioning across multiple collections.`,
        },
    ].filter(c => c.show);

    const fallbackCards = cards.length === 0
        ? data.slice(0, 5).map(f => ({
            title: f.fabric,
            heading: f.fabric,
            examples: [],
            body: `${f.fabric} accounts for ${total > 0 ? ((f.count / total) * 100).toFixed(1) : 0}% of the overall fabric distribution across the LFW F/W 2025 show.`,
          }))
        : [];

    const renderCards = cards.length > 0 ? cards : fallbackCards;

    return (
        <div style={{
            padding: "30px",
            backgroundColor: "#f0f0f0",
            borderRadius: "15px",
            marginTop: "40px",
        }}>
            <h2 style={{ textAlign: "center", letterSpacing: "2px", marginTop: 0 }}>
                INDUSTRY FABRIC REPORT
            </h2>
            <p style={{ textAlign: "center", color: "#888", fontSize: "13px", letterSpacing: "1px", marginBottom: "24px" }}>
                LFW F/W 2025 · AI-ASSISTED TEXTILE ANALYSIS
            </p>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
                {renderCards.map((card, i) => (
                    <div key={i} style={{
                        flex: "1 1 250px",
                        padding: "20px",
                        background: "white",
                        borderRadius: "10px",
                        borderTop: "3px solid #111",
                    }}>
                        <h4 style={{ margin: "0 0 6px", fontSize: "13px", letterSpacing: "1px", color: "#999", textTransform: "uppercase" }}>
                            {card.heading}
                        </h4>

                        {card.examples && card.examples.length > 0 && (
                            <div style={{ display: "flex", gap: "6px", marginBottom: "12px", flexWrap: "wrap" }}>
                                {card.examples.map((ex, j) => (
                                    <span key={j} style={{
                                        fontSize: "11px",
                                        fontWeight: "600",
                                        letterSpacing: "0.5px",
                                        padding: "3px 10px",
                                        borderRadius: "20px",
                                        background: "#f4f4f4",
                                        border: "1px solid #ddd",
                                        color: "#555",
                                    }}>
                                        {ex}
                                    </span>
                                ))}
                            </div>
                        )}

                        <p style={{ margin: 0, fontSize: "14px", lineHeight: "1.7", color: "#333" }}>
                            <strong>{card.title}</strong> — {card.body}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}