export default function OverallFabricInsights({ data}){
    if (!data || data.length == 0) return null

    const silkCount = data.find(f => f.fabric.toLowerCase() === 'silk')?.percentage || 0;
    const traditionalCount = data.find(f => f.fabric.toLowerCase().includes('africa'))?.percentage || 0;

    return (
        <div style={{ 
            padding: "30px", 
            backgroundColor: "#f0f0f0", 
            borderRadius: "15px", 
            marginTop: "40px" }}>
            <h2 style={{ 
                textAlign: "center", 
                letterSpacing: "2px" }}>
                    INDUSTRY FABRIC REPORT
                    </h2>

            <div style={{ 
                display: "flex", 
                flexWrap: "wrap", 
                gap: "20px", 
                marginTop: "20px" }}>
                <div style={{ 
                    flex: "1 1 250px", 
                    padding: "15px", 
                    background: "white", 
                    borderRadius: "8px" }}>
                    <h4>Market Dominance</h4>
                    <p><strong>Silk & Satin</strong> remain the dominant textures at {silkCount}%, indicating a strong preference for fluid, reflective surfaces in SS25.</p>
                </div>
                <div style={{ 
                    flex: "1 1 250px", 
                    padding: "15px", 
                    background: "white", 
                    borderRadius: "8px" }}>
                    <h4>Cultural Shift</h4>
                    <p>Indigenous textiles represent <strong>{traditionalCount}%</strong> of the show. This reflects an ongoing "Traditional-to-Global" transition among Nigerian designers.</p>
                </div>
            </div>
        </div>
    );

}