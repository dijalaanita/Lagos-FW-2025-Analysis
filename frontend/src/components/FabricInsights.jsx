/**
 * BrandFabricInsights.jsx
 *
 * Displays brand-specific texture profile insights derived from the
 * GLCM-LBP-SVM pipeline. Labels describe surface texture characteristics
 * (smoothness, pile density, surface variation) — not fibre composition.
 */

// Texture profile definitions — what each SVM class actually means
const TEXTURE_PROFILES = {
    acrylic: {
        label: "Synthetic / Technical",
        property: "Smooth, High-Sheen Surface",
        examples: ["Stretch Satin", "Neoprene"],
        colour: "#2c2c2c",
        what: "garments with a consistent, low-contrast, high-regularity surface finish",
    },
    chenille: {
        label: "Textured Pile Weave",
        property: "Raised, High-Variation Surface",
        examples: ["Chenille", "Bouclé"],
        colour: "#5c4033",
        what: "garments with irregular, three-dimensional surface texture and high pixel contrast",
    },
    velvet: {
        label: "Velvet / Crushed Pile",
        property: "Dense, Light-Absorbing Surface",
        examples: ["Crushed Velvet", "Silk Velvet"],
        colour: "#1a1a2e",
        what: "garments with a dense pile surface that absorbs light uniformly",
    },
    wool: {
        label: "Woven Natural Fibre",
        property: "Coarse, Irregular Surface",
        examples: ["Wool Tweed", "Linen"],
        colour: "#4a3728",
        what: "garments with a grainy, high-contrast irregular weave surface",
    },
    africa_fabric: {
        label: "Traditional Textile",
        property: "Complex Patterned Weave",
        examples: ["Aso-Oke", "Ankara"],
        colour: "#1a4a2e",
        what: "garments with structured, repeating high-contrast surface patterns",
    },
};

// Match a raw fabric label from the JSON to a profile key
function matchProfile(fabricLabel) {
    const f = (fabricLabel || "").toLowerCase();
    if (f.includes("acrylic"))       return "acrylic";
    if (f.includes("chenille"))      return "chenille";
    if (f.includes("velvet"))        return "velvet";
    if (f.includes("wool"))          return "wool";
    if (f.includes("africa"))        return "africa_fabric";
    if (f.includes("synthetic"))     return "acrylic";
    if (f.includes("technical"))     return "acrylic";
    if (f.includes("textured"))      return "chenille";
    if (f.includes("pile"))          return "chenille";
    if (f.includes("natural"))       return "wool";
    if (f.includes("traditional"))   return "africa_fabric";
    return null;
}

// Generate the brand-specific insight sentence — plain language, accessible to all audiences
function generateInsight(brandName, profileKey, profile, pct, rank) {
    const name = brandName.replace(/_/g, " ");
    const isMain = rank === 1;

    const sentences = {
        acrylic: [
            `${name} went for that sleek, almost shiny look — ${pct}% of the collection has that polished, smooth-to-the-touch finish you'd feel on a fitted blazer or a glossy evening piece.`,
            `Think clean lines and surfaces that catch the light. That smooth, refined finish runs through ${pct}% of the ${name} collection — it's the kind of fabric that looks sharp from across the room.`,
        ],
        chenille: [
            `${name} was all about texture you can actually feel — ${pct}% of the collection has that cosy, raised surface, like running your hand over a thick knitted fabric or a chunky woven piece.`,
            `Rough, tactile, interesting to touch — that's the vibe in ${pct}% of the ${name} collection. The kind of fabric that looks just as good up close as it does on the runway.`,
        ],
        velvet: [
            `${name} kept it rich and moody — ${pct}% of the collection has that deep, velvety look that soaks up light instead of reflecting it. The kind of fabric that makes a room go quiet.`,
            `You know that fabric that looks almost too luxurious? It shows up in ${pct}% of the ${name} collection — deep, plush surfaces that feel as good as they look.`,
        ],
        wool: [
            `${name} kept things grounded — ${pct}% of the collection has a natural, woven texture. Think linen or handwoven cloth — fabrics that feel lived-in and real rather than shiny or overdone.`,
            `No shine, no fuss. ${name} chose fabrics that feel natural and unpretentious in ${pct}% of the collection — the kind of textures that get better the longer you wear them.`,
        ],
        africa_fabric: [
            `${name} made a clear cultural statement — ${pct}% of the collection features bold, structured patterns woven directly into the fabric itself, not printed on top. You can see the craft in every thread.`,
            `These aren't your average fabrics. ${name} worked with traditional woven textiles in ${pct}% of the collection — the kind where the pattern is part of the weave, not an afterthought.`,
        ],
    };

    const options = sentences[profileKey] || [
        `${profile.label} surfaces show up in ${pct}% of the ${name} collection — it's one of the key textures that gives this range its look and feel.`,
    ];
    return options[rank % options.length];
}

export default function FabricInsights({ data, brand }) {
    if (!data || data.length === 0) return null;

    const total = data.reduce((sum, f) => sum + (f.count || 0), 0);
    if (total === 0) return null;

    // Build enriched entries with profile data and percentage
    const enriched = data
        .map(f => {
            const profileKey = matchProfile(f.fabric || f.label || "");
            const profile = profileKey ? TEXTURE_PROFILES[profileKey] : null;
            const pct = ((f.count / total) * 100).toFixed(1);
            return { raw: f, profileKey, profile, pct: parseFloat(pct), count: f.count };
        })
        .filter(e => e.profile)
        .sort((a, b) => b.count - a.count);

    if (enriched.length === 0) return null;

    const dominant = enriched[0];
    const brandName = (brand || "This collection").replace(/_/g, " ");

    return (
        <div style={{
            padding: "30px",
            backgroundColor: "#f0f0f0",
            borderRadius: "15px",
            marginTop: "30px",
            fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
        }}>
            {/* Header */}
            <h2 style={{ textAlign: "center", letterSpacing: "2px", marginTop: 0, fontSize: "18px" }}>
                TEXTURE PROFILE REPORT
            </h2>
            <p style={{ textAlign: "center", color: "#888", fontSize: "12px", letterSpacing: "1px", marginBottom: "8px" }}>
                {brandName.toUpperCase()} · LFW F/W 2025
            </p>

            {/* What this measures disclaimer */}
            <p style={{
                textAlign: "center", fontSize: "11px", color: "#aaa",
                fontStyle: "italic", marginBottom: "24px", maxWidth: "600px",
                margin: "0 auto 24px",
            }}>
                Surface texture profiles derived from GLCM-LBP visual analysis.
                Classifications describe how garment surfaces behave visually — not fibre composition.
            </p>

            {/* Dominant texture hero card */}
            <div style={{
                background: dominant.profile.colour,
                borderRadius: "12px",
                padding: "24px",
                marginBottom: "20px",
                color: "#fff",
            }}>
                <div style={{ fontSize: "10px", letterSpacing: "2px", color: "rgba(255,255,255,0.5)", marginBottom: "6px", textTransform: "uppercase" }}>
                    Dominant Texture Profile
                </div>
                <div style={{ fontSize: "22px", fontWeight: "700", letterSpacing: "1px", marginBottom: "4px" }}>
                    {dominant.profile.label}
                </div>
                <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.7)", marginBottom: "16px" }}>
                    {dominant.profile.property}
                </div>

                {/* Example pills */}
                <div style={{ display: "flex", gap: "6px", marginBottom: "16px", flexWrap: "wrap" }}>
                    {dominant.profile.examples.map((ex, i) => (
                        <span key={i} style={{
                            fontSize: "11px", fontWeight: "600", padding: "3px 10px",
                            borderRadius: "20px", background: "rgba(255,255,255,0.15)",
                            border: "1px solid rgba(255,255,255,0.3)", color: "#fff",
                        }}>
                            {ex}
                        </span>
                    ))}
                </div>

                <p style={{ fontSize: "14px", lineHeight: "1.7", color: "rgba(255,255,255,0.85)", margin: 0 }}>
                    {generateInsight(brandName, dominant.profileKey, dominant.profile, dominant.pct, 1)}
                </p>
            </div>

            {/* Secondary texture cards */}
            {enriched.length > 1 && (
                <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
                    {enriched.slice(1).map((entry, i) => (
                        <div key={i} style={{
                            flex: "1 1 220px",
                            padding: "18px",
                            background: "white",
                            borderRadius: "10px",
                            borderLeft: `4px solid ${entry.profile.colour}`,
                        }}>
                            <div style={{ fontSize: "10px", letterSpacing: "1.5px", color: "#aaa", textTransform: "uppercase", marginBottom: "4px" }}>
                                {i === 0 ? "Secondary" : "Additional"} Texture
                            </div>

                            <div style={{ fontSize: "15px", fontWeight: "700", color: "#111", marginBottom: "2px" }}>
                                {entry.profile.label}
                            </div>
                            <div style={{ fontSize: "11px", color: "#888", marginBottom: "10px" }}>
                                {entry.profile.property}
                            </div>

                            {/* Example pills */}
                            <div style={{ display: "flex", gap: "5px", marginBottom: "10px", flexWrap: "wrap" }}>
                                {entry.profile.examples.map((ex, j) => (
                                    <span key={j} style={{
                                        fontSize: "10px", fontWeight: "600", padding: "2px 8px",
                                        borderRadius: "20px", background: "#f4f4f4",
                                        border: "1px solid #ddd", color: "#555",
                                    }}>
                                        {ex}
                                    </span>
                                ))}
                            </div>

                            <p style={{ fontSize: "13px", lineHeight: "1.6", color: "#444", margin: 0 }}>
                                {generateInsight(brandName, entry.profileKey, entry.profile, entry.pct, i + 2)}
                            </p>
                        </div>
                    ))}
                </div>
            )}

            {/* % breakdown bar */}
            <div style={{ marginTop: "24px", background: "white", borderRadius: "10px", padding: "16px 20px" }}>
                <div style={{ fontSize: "10px", letterSpacing: "2px", color: "#aaa", textTransform: "uppercase", marginBottom: "12px" }}>
                    Surface Distribution
                </div>
                <div style={{ display: "flex", height: "10px", borderRadius: "5px", overflow: "hidden", gap: "2px" }}>
                    {enriched.map((entry, i) => (
                        <div key={i} title={`${entry.profile.label}: ${entry.pct}%`} style={{
                            width: `${entry.pct}%`,
                            background: entry.profile.colour,
                            borderRadius: i === 0 ? "5px 0 0 5px" : i === enriched.length - 1 ? "0 5px 5px 0" : "0",
                            transition: "width 0.3s ease",
                        }} />
                    ))}
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", marginTop: "10px" }}>
                    {enriched.map((entry, i) => (
                        <div key={i} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                            <div style={{ width: "10px", height: "10px", borderRadius: "2px", background: entry.profile.colour, flexShrink: 0 }} />
                            <span style={{ fontSize: "11px", color: "#666" }}>{entry.profile.label} — {entry.pct}%</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}