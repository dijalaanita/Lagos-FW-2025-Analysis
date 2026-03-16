export default function FabricInsights({ data, brandName }){
    if (!data || data.length == 0) return null

    const topf = data[0]
    const hasIndigenous = data.some(item => 
        item.fabric.toLowerCase().includes('africa') || 
        item.fabric.toLowerCase().includes('akwete')
    );

    // Dynamic descriptions based on your new LFW 2025 categories
    const getInsightText = () => {
        if (fabricName === 'acrylic') {
            return " This suggests a focus on sleek, technical finishes and modern synthetic blends that dominate the contemporary luxury market.";
        }
        if (fabricName === 'chenille') {
            return " This indicates a high usage of textured, 3D relief surfaces and artisanal hand-woven patterns, typical of high-end traditional craft.";
        }
        if (fabricName === 'velvet') {
            return " This reflects a focus on structured, heavy silhouettes and light-absorbing matte surfaces, creating a dramatic runway presence.";
        }
        return "";
    };

    return (
        <div style={{ marginTop: "30px" }}>

            <h3 style={{ textAlign: "center", fontSize: "30px" }}>
                MATERIAL STRATEGY: {brandName.replace(/_/g, ' ').toUpperCase()}</h3>
            <p style={{ textAlign: "center"}}>
                The dominant material identified in this collection is 
                <strong> {topf.fabric.replace(/_/g, ' ')}</strong>
                {" "}appearing in 
                <strong> {parseFloat(topf.percentage || 0).toFixed(0)}% </strong> 
                of the looks.

                <span>{getInsightText()}</span>
                <span style={{ 
                    display: "block", 
                    marginTop: "15px", 
                    fontStyle: "italic", 
                    color: "#555" }}>
                    {hasIndigenous ? 
                    "Personal Notes: This designer integrated traditional Nigerian textiles (Akwete), highlighting a blend of traditional craft and contemporary fashion." : 
                    "Personal Notes: The collection leans heavily toward global standardized textiles with minimal use of indigenous woven fabrics."}
                    </span>
                
            </p>
            <div style={{ textAlign: "center", marginTop: "20px", fontSize: "10px", color: "#ccc", textTransform: "uppercase" }}>
                AI Analysis Accuracy: 89.68% | Classifier: SVM-Linear
            </div>

        </div>
    )

}