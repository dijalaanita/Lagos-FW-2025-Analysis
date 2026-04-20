import { useEffect, useState } from "react";
import { getBrands } from "../services/api";
import BrandSelector from "./BrandSelector";

const DESIGNER_PROFILES = {
  default: {
    bio: "Profile information for this designer is not yet available in the HoL database.",
    established: "—",
    origin: "Lagos, Nigeria",
    signature: "—",
    category: "Ready-to-Wear",
    website: null,
  },

  adage_studio_project_x_unrefyned: {
    bio: "A collaborative capsule between Adage Studio and Unrefyned, this project explores the intersection of structured streetwear and raw, unfinished aesthetics. The collaboration channels Lagos youth culture into considered, design-led garments that resist easy categorization.",
    established: "—",
    origin: "Lagos, Nigeria",
    signature: "Collaborative design tension, raw finishes, urban structure",
    category: "Streetwear / Collaboration",
    website: null,
  },

  adama_paris: {
    bio: "Adama Paris is a Senegalese fashion designer, model, and creative director widely regarded as a pioneer of African luxury fashion. Founder of Dakar Fashion Week, she has built a global platform for African designers and is known for vibrant prints, architectural silhouettes, and a deep commitment to showcasing the richness of African textiles on international runways.",
    established: "2002",
    origin: "Dakar, Senegal",
    signature: "Architectural draping, bold African prints, Pan-African luxury",
    category: "Luxury / Ready-to-Wear",
    website: "https://adamaparis.com",
  },

  ajabeng: {
    bio: "Ajabeng is a Ghanaian-led womenswear label celebrated for its sculptural approach to tailoring and its thoughtful use of West African textiles. The brand consistently merges Kente weave and hand-dyed fabrics with contemporary silhouettes, positioning African craft within a global luxury conversation.",
    established: "2020",
    origin: "Accra, Ghana",
    signature: "Sculptural tailoring, Kente integration, contemporary African womenswear",
    category: "Ready-to-Wear / Luxury",
    website: "https://ajabeng.com/",
  },

  ajanee: {
    bio: "Ajanéé is a Lagos-based womenswear brand exploring femininity through fluid, body-conscious silhouettes. Known for soft draping and a restrained colour palette, Ajanee designs for the modern African woman who moves between professional and social spaces with ease.",
    established: "—",
    origin: "Lagos, Nigeria",
    signature: "Fluid draping, soft femininity, versatile womenswear",
    category: "Ready-to-Wear",
    website: "https://www.ajanee-studio.com/",
  },

  babayo: {
    bio: "Babayo is a Northern Nigerian heritage brand that draws directly from the craft traditions of the Hausa-Fulani and Nupe textile communities. The label is known for hand-woven strip cloth, adire dyeing techniques, and garments that honour the dignity of traditional Northern Nigerian dress while speaking to contemporary audiences.",
    established: "2017",
    origin: "Northern Nigeria",
    signature: "Hand-woven strip cloth, Hausa-Fulani textile heritage, indigo dyeing",
    category: "Heritage / Artisanal",
    website: "https://thebabayo.com/",
  },

  boyedoe: {
    bio: "Boyedoe is a Ghanaian menswear and unisex label that reworks traditional Ghanaian textile languages — particularly Kente and smock — into modern, wearable pieces. The brand is known for its clean construction and its ability to make heritage textiles feel entirely current without diluting their cultural weight.",
    established: "2020",
    origin: "Accra, Ghana",
    signature: "Kente reworking, clean menswear construction, unisex silhouettes",
    category: "Menswear / Unisex",
    website: "https://boyedoe.com/",
  },

  cynthia_abila: {
    bio: "Cynthia Abila is a Nigerian designer whose work centres on the emotional power of colour and hand-crafted surface detail. Her collections frequently feature hand-embellished fabrics, intricate beadwork, and a joyful maximalism rooted in Igbo ceremonial dress traditions.",
    established: "2016",
    origin: "Lagos, Nigeria",
    signature: "Hand-embellishment, ceremonial maximalism, Igbo craft references",
    category: "Couture / Ready-to-Wear / Customized",
    website: "https://cynthiaabila.com/",
  },

  desiree_iyama: {
    bio: "Desirée Iyama is a Nigerian womenswear designer known for her confident, body-positive aesthetic. Her work celebrates the female form through structured, form-fitting silhouettes executed in richly textured fabrics. Iyama's collections carry a bold, unapologetic energy that has made her a consistent presence on the Lagos runway.",
    established: "2016",
    origin: "Lagos, Nigeria",
    signature: "Body-positive tailoring, structured womenswear, kidswear, bridal, textured fabrics",
    category: "Ready-to-Wear",
    website: "https://www.desireeiyama.com/",
  },

  dimeji_ilori: {
    bio: "Dimeji Ilori is a Lagos-based menswear designer recognised for his sharp, architectural approach to suiting and his sophisticated reinterpretation of Yoruba agbada silhouettes. His work occupies the space between traditional Nigerian formal dress and contemporary global menswear.",
    established: "—",
    origin: "Lagos, Nigeria",
    signature: "Architectural suiting, agbada reinterpretation, sharp Yoruba menswear",
    category: "Menswear / Tailoring",
    website: null,
  },

  eki_silk: {
    bio: "Eki Silk is a luxury Nigerian label built entirely around the use of silk as a primary textile. The brand produces fluid, minimalist womenswear in which the behaviour of silk — its drape, sheen, and movement — is the central design statement. Eki Silk garments are defined by an understated elegance that speaks directly to the luxury market.",
    established: "—",
    origin: "Lagos, Nigeria",
    signature: "Silk-first design, fluid minimalism, luxury womenswear",
    category: "Luxury / Womenswear",
    website: null,
  },

  elexiay: {
    bio: "Elexiay is a Nigerian crochet and handcraft-led womenswear label that has gained international attention for its labour-intensive, entirely hand-crocheted garments. Each piece requires weeks of craft work, and the brand has been featured in global fashion media for bringing Nigerian artisanal skill to the forefront of luxury slow fashion.",
    established: "—",
    origin: "Lagos, Nigeria",
    signature: "Hand-crocheted construction, slow fashion luxury, artisanal womenswear",
    category: "Luxury / Artisanal",
    website: "https://elexiay.com",
  },

  emmy_kasbit: {
    bio: "Emmy Kasbit, founded by Emmanuel Okoro, is one of the most internationally recognised Nigerian menswear labels to emerge from Lagos. Known for reimagining the traditional Igbo Akwete woven cloth within a contemporary tailoring framework, Emmy Kasbit consistently delivers collections that are technically precise, culturally specific, and globally relevant.",
    established: "2016",
    origin: "Lagos, Nigeria",
    signature: "Akwete-integrated tailoring, Igbo textile reworking, precision menswear",
    category: "Menswear / Luxury",
    website: "https://emmykasbit.com",
  },

  eso_by_liman: {
    bio: "Eso by Liman is a Nigerian label exploring sustainable and slow-fashion approaches within an African design context. The brand works with natural fibres and low-impact dyeing processes, producing womenswear that carries an organic, earth-toned quality aligned with a growing global demand for conscious luxury.",
    established: "—",
    origin: "Lagos, Nigeria",
    signature: "Natural fibre use, earth tones, sustainable womenswear",
    category: "Sustainable / Ready-to-Wear",
    website: null,
  },

  for_style_sake: {
    bio: "For Style Sake is a Lagos-based accessories and ready-to-wear label centred on everyday wearability and commercial accessibility. The brand occupies an important mid-market position in the Lagos fashion landscape, producing trend-responsive pieces with a strong retail sensibility.",
    established: "—",
    origin: "Lagos, Nigeria",
    signature: "Commercial ready-to-wear, trend-responsive design, everyday wearability",
    category: "Ready-to-Wear / Accessories",
    website: null,
  },

  fruche: {
    bio: "Fruche, founded by Frank Osodi, is a Nigerian womenswear brand celebrated for its exuberant use of ruffles, volume, and colour. The label has become a staple of the Lagos social season and has dressed some of Nigeria's most prominent women. Fruche's aesthetic is deliberately festive, drawing on the celebratory dress culture of Yoruba occasions.",
    established: "2013",
    origin: "Lagos, Nigeria",
    signature: "Ruffled volume, festive maximalism, Yoruba celebratory dress",
    category: "Ready-to-Wear / Occasionwear",
    website: "https://fruchecollections.com",
  },

  hawa_paris: {
    bio: "Hawa Paris is a Franco-African luxury label that bridges Parisian tailoring craft with West African textile heritage. Operating between Paris and Lagos, the brand produces womenswear that speaks a genuinely bicultural design language — neither African fashion translated for a Western audience, nor European fashion with African accents, but a fully integrated hybrid.",
    established: "—",
    origin: "Paris, France / West Africa",
    signature: "Franco-African luxury, Parisian tailoring, West African textile fusion",
    category: "Luxury / Womenswear",
    website: null,
  },

  hertunba: {
    bio: "Hertunba is a Lagos-based womenswear label known for its deeply considered approach to Yoruba cultural codes in dress. The brand works with aso-oke, adire, and other Yoruba heritage textiles, translating them into contemporary silhouettes that honour the spiritual and social significance of these fabrics without reducing them to decoration.",
    established: "—",
    origin: "Lagos, Nigeria",
    signature: "Aso-oke and adire integration, Yoruba cultural dress codes, heritage womenswear",
    category: "Heritage / Ready-to-Wear",
    website: null,
  },

  ibilola_ogundipe: {
    bio: "Ibilola Ogundipe is a Lagos-based designer whose eponymous label is known for refined, occasion-ready womenswear executed in luxurious fabrics. Her work is characterised by precise construction and an elegant restraint — pieces that communicate status and sophistication without relying on surface embellishment.",
    established: "—",
    origin: "Lagos, Nigeria",
    signature: "Refined occasionwear, precise construction, understated luxury",
    category: "Couture / Occasionwear",
    website: null,
  },

  imad_eduso: {
    bio: "Imad Eduso is a Nigerian womenswear designer who has risen rapidly to prominence for her signature draped jersey gowns and body-conscious eveningwear. Her work has been worn by major Nigerian and international celebrities, and she has become a go-to designer for red carpet and high-profile social events in Lagos and beyond.",
    established: "—",
    origin: "Lagos, Nigeria",
    signature: "Draped jersey gowns, body-conscious eveningwear, red carpet dressing",
    category: "Couture / Eveningwear",
    website: "https://imadeduso.com",
  },

  jzo: {
    bio: "JZO is a Lagos-based unisex and menswear label known for its quietly subversive approach to Nigerian dress codes. The brand draws from street culture, underground music, and youth identity to produce collections that feel distinctly contemporary and Lagos-specific, resisting the formal occasions aesthetic that dominates much of the city's fashion scene.",
    established: "—",
    origin: "Lagos, Nigeria",
    signature: "Unisex streetwear, Lagos youth culture, subversive menswear",
    category: "Streetwear / Unisex",
    website: null,
  },

  lb_lumina: {
    bio: "LB Lumina is a Lagos-based womenswear label that works with light, luminous fabrics — organza, chiffon, and silk — to produce ethereal, occasion-ready pieces. The brand's aesthetic is defined by an architectural approach to volume and transparency, creating garments that feel simultaneously delicate and structurally considered.",
    established: "—",
    origin: "Lagos, Nigeria",
    signature: "Luminous fabrics, architectural volume, ethereal womenswear",
    category: "Occasionwear / Luxury",
    website: null,
  },

  left_of_yaba_x_jilk: {
    bio: "A collaborative project between Left of Yaba and Jilk, this collection channels the creative energy of the Yaba creative district — Lagos's most concentrated hub of independent designers and artists. The collaboration produces pieces that are deliberately experimental, prioritising concept and craft over commercial convention.",
    established: "—",
    origin: "Yaba, Lagos, Nigeria",
    signature: "Yaba district creative energy, experimental collaboration, concept-driven design",
    category: "Experimental / Collaboration",
    website: null,
  },

  lfj: {
    bio: "LFJ is a Lagos-based label with a strong identity rooted in Nigerian print culture and bold, expressive womenswear. The brand works with vibrant Ankara and printed fabrics to produce collections that are explicitly celebratory, designed for the full social and cultural richness of Lagos life.",
    established: "—",
    origin: "Lagos, Nigeria",
    signature: "Ankara print use, vibrant womenswear, Lagos social dressing",
    category: "Ready-to-Wear / Print",
    website: null,
  },

  lila_bare: {
    bio: "Lila Bare is a minimalist womenswear label that occupies the quieter end of the Lagos fashion spectrum. The brand produces clean, body-skimming silhouettes in muted, natural palettes — a deliberate counterpoint to Lagos maximalism — targeting the growing market of women who want understated, well-made everyday luxury.",
    established: "—",
    origin: "Lagos, Nigeria",
    signature: "Minimalist womenswear, muted natural palettes, clean silhouettes",
    category: "Minimalist / Ready-to-Wear",
    website: null,
  },

  maison_alulla: {
    bio: "Maison Alulla is a luxury womenswear label with a strong couture sensibility. The brand produces intricately constructed pieces that draw from a global luxury aesthetic while maintaining a distinctly African creative voice. Maison Alulla garments are characterised by exceptional finish, complex construction, and the use of premium imported and locally sourced fabrics.",
    established: "—",
    origin: "Lagos, Nigeria",
    signature: "Couture construction, luxury finish, global aesthetic with African voice",
    category: "Luxury / Couture",
    website: null,
  },

  maxjenny: {
    bio: "MaxJenny is a Lagos-based label that straddles ready-to-wear and couture, producing collections with a strong commercial sensibility and a consistent visual identity built around bold colour blocking and graphic print work. The brand has a loyal Lagos following and an increasingly strong presence across West Africa.",
    established: "—",
    origin: "Lagos, Nigeria",
    signature: "Colour blocking, graphic prints, commercial womenswear",
    category: "Ready-to-Wear",
    website: null,
  },

  mot_the_label: {
    bio: "Mot The Label is a contemporary Nigerian womenswear brand focused on the duality of softness and structure. The label produces pieces that move between workwear and social dressing, building a wardrobe vocabulary for the modern Lagos professional woman who refuses to choose between comfort and impact.",
    established: "—",
    origin: "Lagos, Nigeria",
    signature: "Soft-structure duality, professional womenswear, wardrobe versatility",
    category: "Contemporary / Ready-to-Wear",
    website: null,
  },

  ndiiche_x_sinae: {
    bio: "A collaboration between Ndiiche and Sinae, this project brings together two distinct creative voices to explore the meeting point of Igbo craft traditions and Korean textile aesthetics. The result treats the exchange between African and East Asian design languages as a site of genuine creative inquiry rather than surface novelty.",
    established: "—",
    origin: "Nigeria / Korea",
    signature: "Igbo-Korean textile dialogue, cross-cultural craft collaboration",
    category: "Collaboration / Experimental",
    website: null,
  },

  nkwo: {
    bio: "Nkwo, founded by Nkwo Onwuka, is one of Nigeria's most internationally recognised sustainable fashion labels. The brand is built entirely on upcycling and zero-waste design principles, with its signature Dakala cloth — a woven textile produced from salvaged denim — at the centre of every collection. Nkwo has shown at London Fashion Week and is a leading voice in the African sustainable fashion movement.",
    established: "2008",
    origin: "Lagos, Nigeria",
    signature: "Dakala cloth, denim upcycling, zero-waste construction, sustainable luxury",
    category: "Sustainable / Luxury",
    website: "https://nkwo.org",
  },

  nya: {
    bio: "NYA is a contemporary womenswear label working in the space between Lagos social dressing and international contemporary fashion. The brand is known for its confident use of texture and its ability to produce pieces that feel both locally specific and globally fluent.",
    established: "—",
    origin: "Lagos, Nigeria",
    signature: "Textured womenswear, confident silhouettes, Lagos-to-global aesthetic",
    category: "Contemporary / Ready-to-Wear",
    website: null,
  },

  olooh: {
    bio: "Olooh is a Lagos-based label whose name references Yoruba spiritual and cultural depth. The brand produces womenswear that is explicitly rooted in Yoruba cosmology and ceremonial dress, using aso-oke, metallic brocades, and hand-embellished fabrics to create garments that carry cultural weight as well as aesthetic impact.",
    established: "—",
    origin: "Lagos, Nigeria",
    signature: "Yoruba cosmological references, aso-oke, ceremonial metallic brocades",
    category: "Heritage / Couture",
    website: null,
  },

  oshobor: {
    bio: "Oshobor is a Benin Kingdom-inspired Nigerian label that draws its visual and spiritual vocabulary from the art and regalia of the historic Benin Empire. The brand produces garments that function as wearable cultural artefacts, incorporating coral bead references, brass-tone embellishments, and the rich red and gold palette associated with Benin royal dress.",
    established: "—",
    origin: "Benin City, Nigeria",
    signature: "Benin Kingdom regalia references, coral and brass embellishment, royal palette",
    category: "Heritage / Couture",
    website: null,
  },

  pepperrow: {
    bio: "Pepperrow is a contemporary Nigerian label known for its graphic, print-led approach to womenswear. The brand produces bold, confident pieces that engage directly with Lagos visual culture — its colours, its chaos, its energy — translating that onto the body through pattern, cut, and layering.",
    established: "—",
    origin: "Lagos, Nigeria",
    signature: "Graphic print work, Lagos visual culture, bold womenswear",
    category: "Contemporary / Print",
    website: null,
  },

  pettre_taylor: {
    bio: "Pettre Taylor is a Lagos-based tailoring label with a strong menswear and unisex identity. The brand is known for its refined approach to suiting and its ability to integrate traditional Nigerian fabrics — particularly aso-oke and hand-woven strip cloth — within a technically precise tailoring framework.",
    established: "—",
    origin: "Lagos, Nigeria",
    signature: "Refined tailoring, aso-oke integration, menswear precision",
    category: "Tailoring / Menswear",
    website: null,
  },

  rendoll: {
    bio: "Rendoll is a Nigerian occasionwear brand with a strong identity in the Lagos high-society dressing space. The label produces statement pieces for weddings, galas, and high-profile social events, with a consistent focus on luxurious fabric choices, intricate embellishment, and silhouettes designed to command attention.",
    established: "—",
    origin: "Lagos, Nigeria",
    signature: "Statement occasionwear, high-society Lagos dressing, luxurious embellishment",
    category: "Occasionwear / Couture",
    website: null,
  },

  revival_london: {
    bio: "Revival London is a diaspora label operating between Lagos and London, producing collections that engage directly with the experience of the African creative in a Western city. The brand's work holds both contexts simultaneously — neither assimilating into London fashion nor retreating into nostalgic Africanism, but producing something genuinely hybrid.",
    established: "—",
    origin: "London, UK / Lagos, Nigeria",
    signature: "Lagos-London diaspora identity, hybrid cultural aesthetics, contemporary womenswear",
    category: "Contemporary / Diaspora",
    website: null,
  },

  sahrazad: {
    bio: "Sahrazad is a Lagos-based label drawing from North African and Saharan visual cultures — the flowing robes, layered textiles, and rich embroidery traditions of the Maghreb and Sahel regions. The brand produces womenswear that reads as a Pan-African luxury proposition, drawing connections across the continent's diverse textile heritages.",
    established: "—",
    origin: "Lagos, Nigeria",
    signature: "North African and Saharan aesthetic, layered robes, Pan-African luxury",
    category: "Luxury / Heritage",
    website: null,
  },

  sevon_dejana: {
    bio: "Sevon Dejana is a Nigerian womenswear label with a strong evening and occasion focus. The brand is known for its confident, glamorous aesthetic and its ability to produce showstopping pieces that translate the energy of Lagos nights into structured, beautifully finished garments.",
    established: "—",
    origin: "Lagos, Nigeria",
    signature: "Glamorous eveningwear, confident womenswear, Lagos night dressing",
    category: "Eveningwear / Couture",
    website: null,
  },

  street_souk: {
    bio: "Street Souk is an experimental Lagos label that treats the street market — the souk — as both a design methodology and an aesthetic reference. The brand produces work that is deliberately eclectic, mixing materials, references, and construction techniques in ways that mirror the organised chaos and cultural plurality of the Lagos market space.",
    established: "—",
    origin: "Lagos, Nigeria",
    signature: "Market aesthetic, eclectic material mixing, experimental construction",
    category: "Experimental / Streetwear",
    website: null,
  },

  studio_imo: {
    bio: "Studio Imo is a design-led womenswear label rooted in the craft traditions of Imo State in South-Eastern Nigeria. The brand works with Akwete hand-woven cloth and Igbo ceremonial textiles, producing contemporary garments that honour the technical mastery of South-Eastern Nigerian weaving communities.",
    established: "—",
    origin: "Imo State, Nigeria",
    signature: "Akwete cloth, Igbo craft traditions, South-Eastern Nigerian heritage womenswear",
    category: "Heritage / Artisanal",
    website: null,
  },

  the_or_foundation: {
    bio: "The OR Foundation is a Ghana-based organisation and creative platform at the intersection of fashion, waste, and justice. Operating in Accra's Kantamanto market — one of the world's largest second-hand clothing markets — the Foundation's runway presence is a direct critique of global fashion's waste crisis and its disproportionate impact on African communities. Their collections are produced entirely from dead-stock and second-hand garments.",
    established: "2019",
    origin: "Accra, Ghana",
    signature: "Second-hand and dead-stock construction, fashion justice, Kantamanto market",
    category: "Sustainable / Activist Fashion",
    website: "https://theorfdtn.org",
  },

  wote: {
    bio: "Wote — Swahili for 'all of us' — produces work rooted in a Pan-African design philosophy that draws from textile traditions across the continent. The label weaves together East African kanga, West African strip cloth, and Central African wax prints into a unified, inclusive design language.",
    established: "—",
    origin: "East Africa / Pan-African",
    signature: "Pan-African textile synthesis, kanga and strip cloth, unisex design",
    category: "Pan-African / Unisex",
    website: null,
  },

  "y'wande": {
    bio: "Y'Wande is a Lagos-based contemporary womenswear label named after a Yoruba expression of wonder and gratitude. The brand produces pieces designed to make the wearer feel seen and celebrated. Y'Wande is known for its considered use of Yoruba textile references within a thoroughly modern womenswear framework.",
    established: "—",
    origin: "Lagos, Nigeria",
    signature: "Yoruba cultural expression, intentional womenswear, contemporary heritage dress",
    category: "Contemporary / Heritage",
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

      <div style={{ background: "#fafafa", borderRadius: "16px", padding: "36px", marginTop: "24px" }}>
        <div style={{ display: "flex", gap: "32px", flexWrap: "wrap", alignItems: "flex-start" }}>

          {/* Avatar */}
          <div style={{
            width: "100px", height: "100px", borderRadius: "50%", background: "#111",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "#fff", fontSize: "36px", flexShrink: 0, fontWeight: "300",
          }}>
            {(brand || "?")[0].toUpperCase()}
          </div>

          {/* Name + meta */}
          <div style={{ flex: 1 }}>
            <h2 style={{ fontSize: "24px", fontWeight: "700", letterSpacing: "3px", color: "#111", margin: "0 0 8px" }}>
              {displayName}
            </h2>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", marginTop: "8px" }}>
              {[
                { label: "Origin", value: profile.origin },
                { label: "Est.", value: profile.established },
                { label: "Category", value: profile.category },
              ].map(({ label, value }) => (
                <div key={label} style={{ background: "#fff", border: "1px solid #e5e5e5", borderRadius: "8px", padding: "10px 16px" }}>
                  <div style={{ fontSize: "10px", letterSpacing: "1.5px", color: "#aaa", textTransform: "uppercase" }}>{label}</div>
                  <div style={{ fontSize: "13px", fontWeight: "600", color: "#111", marginTop: "4px" }}>{value}</div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: "12px", background: "#fff", border: "1px solid #e5e5e5", borderRadius: "8px", padding: "10px 16px", display: "inline-block" }}>
              <div style={{ fontSize: "10px", letterSpacing: "1.5px", color: "#aaa", textTransform: "uppercase" }}>Signature Style</div>
              <div style={{ fontSize: "13px", fontWeight: "600", color: "#111", marginTop: "4px" }}>{profile.signature}</div>
            </div>
          </div>
        </div>

        {/* Bio */}
        <div style={{ marginTop: "28px", borderTop: "1px solid #eee", paddingTop: "24px" }}>
          <div style={{ fontSize: "11px", letterSpacing: "2px", color: "#aaa", textTransform: "uppercase", marginBottom: "10px" }}>About</div>
          <p style={{ fontSize: "15px", lineHeight: "1.8", color: "#444", margin: 0 }}>{profile.bio}</p>
        </div>

        {/* Website */}
        {profile.website && (
          <div style={{ marginTop: "20px" }}>
            <a href={profile.website} target="_blank" rel="noopener noreferrer"
              style={{ fontSize: "13px", color: "#111", fontWeight: "600", textDecoration: "underline" }}>
              Visit Official Website →
            </a>
          </div>
        )}

        {/* LFW data note */}
        <div style={{ marginTop: "28px", background: "#111", borderRadius: "10px", padding: "16px 20px" }}>
          <div style={{ fontSize: "11px", letterSpacing: "2px", color: "#888", textTransform: "uppercase", marginBottom: "8px" }}>
            LFW F/W 2025 Data Profile
          </div>
          <p style={{ fontSize: "13px", color: "#ccc", margin: 0, lineHeight: "1.7" }}>
            Colour and fabric sentiment data for this designer is available in the Brand Analysis tab.
            Profile narrative is based on publicly available research and AI-assisted synthesis.
          </p>
        </div>

        <p style={{ fontSize: "11px", color: "#bbb", marginTop: "16px", fontStyle: "italic" }}>
          ⚠️ Profile information is based on publicly available data and AI-assisted research. It is intended as a supplementary reference, not an authoritative representation of the designer's practice.
        </p>
      </div>
    </div>
  );
}