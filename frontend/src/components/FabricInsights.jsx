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
    lut: {
    label: "Traditional Woven / Luto Cloth",
    property: "Dense, Hand-Loomed Surface",
    examples: ["Luto Cloth", "Strip-Woven Textile"],
    colour: "#2d4a1e",
    what: "garments with a tightly packed hand-woven structure and strong directional weave pattern",
},
terrycloth: {
    label: "Tactile Loop / Textured Utility",
    property: "Looped, High-Absorbency Surface",
    examples: ["Towelling", "Loop Knit"],
    colour: "#3a5a6a",
    what: "garments with a raised looped surface structure that creates high surface variation",
},
blended: {
    label: "Blended Fibre",
    property: "Mixed, Versatile Surface",
    examples: ["Poly-Cotton", "Stretch Blend"],
    colour: "#5a5a5a",
    what: "garments with a composite surface texture combining properties of multiple fibre types",
},
corduroy: {
    label: "Ribbed Weave",
    property: "Parallel-Ridge Surface",
    examples: ["Wide Wale Cord", "Fine Cord"],
    colour: "#4a3520",
    what: "garments with a distinctive raised rib pattern running parallel across the surface",
},
crepe: {
    label: "Crepe / Fluid Matte",
    property: "Fine-Grain, Low-Contrast Surface",
    examples: ["Georgette", "Crepe de Chine"],
    colour: "#3a3a4a",
    what: "garments with a fine, slightly granular surface that drapes fluidly without sheen",
},
felt: {
    label: "Compressed Fibre / Felt",
    property: "Flat, Non-Woven Surface",
    examples: ["Wool Felt", "Industrial Felt"],
    colour: "#2a2a2a",
    what: "garments with a dense, compressed surface with no visible weave structure",
},
fleece: {
    label: "Soft Pile / Fleece",
    property: "Insulating, Brushed Surface",
    examples: ["Polar Fleece", "Sherpa"],
    colour: "#4a5a6a",
    what: "garments with a soft, brushed surface texture providing insulation and high surface variation",
},
leather: {
    label: "Smooth Structured / Leather",
    property: "Uniform, Low-Variation Surface",
    examples: ["Full-Grain Leather", "PU Leather"],
    colour: "#1a1a1a",
    what: "garments with a smooth, highly uniform surface with strong structural integrity",
},
nylon: {
    label: "Synthetic / Lightweight Technical",
    property: "Tightly Woven, Sheen Surface",
    examples: ["Ripstop Nylon", "Performance Nylon"],
    colour: "#1a3a4a",
    what: "garments with a tight, smooth synthetic weave and subtle sheen",
},
polyester: {
    label: "Synthetic / Structured",
    property: "Consistent, Stable Surface",
    examples: ["Woven Polyester", "Polyester Twill"],
    colour: "#2a3a4a",
    what: "garments with a stable, consistent synthetic surface texture",
},
satin: {
    label: "High-Gloss / Satin",
    property: "Mirror-Smooth, Reflective Surface",
    examples: ["Duchess Satin", "Charmeuse"],
    colour: "#1a1a3a",
    what: "garments with a highly reflective, smooth surface that produces strong light contrast",
},
suede: {
    label: "Matte Nap / Suede",
    property: "Fine, Velvety Matte Surface",
    examples: ["Suede", "Microsuede"],
    colour: "#3a2a1a",
    what: "garments with a fine napped surface that absorbs light and feels soft to the touch",
},
viscose: {
    label: "Fluid Semi-Natural",
    property: "Lightweight, Draped Surface",
    examples: ["Viscose Jersey", "Rayon"],
    colour: "#2a4a3a",
    what: "garments with a lightweight, fluid surface with a subtle natural sheen",
},
denim: {
    label: "Denim / Twill Weave",
    property: "Diagonal-Weave Structured Surface",
    examples: ["Raw Denim", "Stretch Denim"],
    colour: "#1a2a4a",
    what: "garments with a distinctive diagonal twill weave structure",
},
linen: {
    label: "Natural Linen",
    property: "Irregular, Breathable Weave",
    examples: ["Washed Linen", "Linen Blend"],
    colour: "#4a4a2a",
    what: "garments with a natural, slightly irregular open weave with visible texture variation",
},
silk: {
    label: "Silk / Lightweight Luxury",
    property: "Weightless, Luminous Surface",
    examples: ["Silk Charmeuse", "Habotai Silk"],
    colour: "#2a1a3a",
    what: "garments with a weightless, luminous surface with natural sheen and fluidity",
},
};

// Match a raw fabric label from the JSON to a profile key
function matchProfile(fabricLabel) {
    const f = (fabricLabel || "").toLowerCase();
    if (f.includes("acrylic"))       return "acrylic";
    if (f.includes("chenille"))      return "chenille";
    if (f.includes("velvet"))        return "velvet";
    if (f.includes("lut"))           return "lut";
    if (f.includes("terrycloth"))    return "terrycloth";
    if (f.includes("terry"))         return "terrycloth";
    if (f.includes("loop"))          return "terrycloth";
    if (f.includes("wool"))          return "wool";
    if (f.includes("africa"))        return "africa_fabric";
    if (f.includes("synthetic"))     return "acrylic";
    if (f.includes("technical"))     return "acrylic";
    if (f.includes("textured"))      return "chenille";
    if (f.includes("pile"))          return "chenille";
    if (f.includes("blended") || f.includes("blend"))  return "blended";
    if (f.includes("corduroy"))  return "corduroy";
    if (f.includes("crepe"))     return "crepe";
    if (f.includes("felt"))      return "felt";
    if (f.includes("fleece"))    return "fleece";
    if (f.includes("leather"))   return "leather";
    if (f.includes("nylon"))     return "nylon";
    if (f.includes("polyester")) return "polyester";
    if (f.includes("satin"))     return "satin";
    if (f.includes("suede"))     return "suede";
    if (f.includes("viscose"))   return "viscose";
    if (f.includes("denim"))     return "denim";
    if (f.includes("linen"))     return "linen";
    if (f.includes("silk"))      return "silk";
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
    lut: [
        `${name} reached into West African weaving heritage for ${pct}% of the collection — Luto cloth's hand-loomed density brings a structural weight to the runway that you can't get from anything machine-made.`,
        `There's real craft in ${pct}% of the ${name} collection. Luto cloth has a tightly packed, hand-woven structure that carries cultural memory in every thread — this is fabric as statement, not just material.`,
    ],
    terrycloth: [
        `${name} did something unexpected — ${pct}% of the collection leans into that looped, tactile surface usually reserved for towels and robes. On the runway, it reads as a deliberate challenge to what luxury is supposed to feel like.`,
        `Not many designers would bring terrycloth to a runway, but ${name} did — and it works. That soft, looped texture shows up in ${pct}% of the collection, turning everyday utility into a full design language.`,
    ],
    blended: [
        `${name} played it versatile — ${pct}% of the collection uses blended fabrics that sit somewhere between structured and soft. The kind of textile that moves well, holds its shape, and works across different climates.`,
        `Mixed fibres run through ${pct}% of the ${name} collection. Blended fabrics are a pragmatic choice that don't announce themselves loudly — they just make everything hang better.`,
    ],
    corduroy: [
        `${name} brought texture with intention — ${pct}% of the collection features that distinctive ribbed surface. Corduroy has a quiet confidence to it, structured enough to feel considered without trying too hard.`,
        `Those parallel ridges running through ${pct}% of the ${name} collection aren't accidental. Corduroy brings a tactile rhythm to tailoring that smooth fabrics simply can't replicate.`,
    ],
    crepe: [
        `${name} favoured fabrics that move — ${pct}% of the collection has that fine, slightly grainy surface that drapes cleanly without clinging. Crepe is the fabric of choice when a designer wants structure and fluidity at the same time.`,
        `Matte, refined, and quietly elegant — crepe runs through ${pct}% of the ${name} collection. It's the kind of fabric that photographs beautifully and wears even better.`,
    ],
    felt: [
        `${name} went dense and deliberate — ${pct}% of the collection features that flat, compressed surface with no weave to speak of. Felt doesn't drape, it sculpts, and that's clearly the point.`,
        `There's a solidity to ${pct}% of the ${name} collection — the kind of fabric that holds a shape and keeps it. Felt is an architectural choice as much as a textile one.`,
    ],
    fleece: [
        `${name} made comfort a design statement — ${pct}% of the collection has that soft, insulating surface that blurs the line between loungewear and fashion. On a Lagos runway, that's a bold move.`,
        `Soft, warm, and deliberately casual — fleece runs through ${pct}% of the ${name} collection. It's a texture that challenges where the boundaries of runway dressing actually sit.`,
    ],
    leather: [
        `${name} brought an edge — ${pct}% of the collection features that smooth, uniform surface with real structural weight behind it. Leather on a runway reads as power dressing, full stop.`,
        `Clean, hard-wearing, and unapologetic — leather runs through ${pct}% of the ${name} collection. It's the kind of material that doesn't ask for your approval.`,
    ],
    nylon: [
        `${name} leaned technical — ${pct}% of the collection has that lightweight, slightly sheen-forward synthetic finish. Nylon brings a utilitarian precision to the runway that feels very contemporary.`,
        `There's a performance edge to ${pct}% of the ${name} collection. Nylon's smooth, tightly woven surface reads as functional minimalism — fashion that looks like it could go anywhere.`,
    ],
    polyester: [
        `${name} kept things accessible and sharp — ${pct}% of the collection uses polyester's reliable structure to achieve clean silhouettes that photograph well and hold up across a full show.`,
        `Polyester runs through ${pct}% of the ${name} collection — and in the right hands, that's not a compromise. It's a deliberate choice for consistency, colour retention, and commercial viability.`,
    ],
    satin: [
        `${name} went for surfaces that catch every light on the runway — ${pct}% of the collection has that high-gloss, liquid finish that turns movement into spectacle. Satin doesn't whisper, it announces.`,
        `That mirror-smooth sheen runs through ${pct}% of the ${name} collection. Satin is the fabric of ceremony and occasion, and ${name} clearly knows exactly how to use it.`,
    ],
    suede: [
        `${name} chose softness with substance — ${pct}% of the collection has that fine, matte nap that feels expensive without needing to shout about it. Suede is understated luxury done right.`,
        `Matte, tactile, and quietly premium — suede runs through ${pct}% of the ${name} collection. It's a surface that rewards being seen up close as much as from the front row.`,
    ],
    viscose: [
        `${name} favoured flow over structure — ${pct}% of the collection uses viscose's lightweight drape to create movement that reads beautifully in motion on the runway.`,
        `Viscose runs through ${pct}% of the ${name} collection — a semi-natural fibre that sits between cotton and silk in feel, giving pieces a soft, fluid quality that photographs well in motion.`,
    ],
    denim: [
        `${name} brought denim to the runway and made it belong there — ${pct}% of the collection uses that iconic woven twill structure to bridge everyday familiarity with deliberate design intent.`,
        `There's something grounding about denim on a Lagos runway. ${name} used it in ${pct}% of the collection — a fabric with deep cultural reach that works as both reference and raw material.`,
    ],
    linen: [
        `${name} kept it breathable and considered — ${pct}% of the collection uses linen's natural, slightly irregular weave. It's a fabric that ages into itself, and in a Nigerian context, it makes complete environmental sense.`,
        `Natural, textured, and unpretentious — linen runs through ${pct}% of the ${name} collection. The slight grain in the weave gives every piece a handmade quality that synthetic fabrics simply can't fake.`,
    ],
    silk: [
        `${name} reached for the most refined surface on the runway — ${pct}% of the collection has that weightless, luminous finish that only silk produces. It's fabric as pure sensation.`,
        `Weightless and luminous — silk runs through ${pct}% of the ${name} collection. It's the kind of material that makes even the simplest cut look considered, because the fabric is doing half the work.`,
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