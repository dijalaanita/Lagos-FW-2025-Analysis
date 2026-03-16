export default function FabricInsights({ data, brandName }){
    if (!data || data.length == 0) return null

    const topf = data[0]
    const hasIndigenous = data.some(item => 
        item.fabric.toLowerCase().includes('africa') || 
        item.fabric.toLowerCase().includes('akwete')
    );

    return (
        <div style={{ marginTop: "30px" }}>

            <h3 style={{ textAlign: "center", fontSize: "30px" }}>MATERIAL STRATEGY: {brandName.replace(/_/g, ' ').toUpperCase()}</h3>
            <p style={{ textAlign: "center"}}>
                The dominant material identified in this collection is 
                <strong> {topf.fabric.replace(/_/g, ' ')}</strong>
                {" "}appearing in 
                <strong> {parseFloat(top.percentage || 0).toFixed(0)}% </strong> 
                of the looks.

                {/* {topFabric.fabric.toLowerCase() === 'silk' && 
                    " This suggests a focus on luxury evening wear and high-sheen silhouettes common in Lagos Fashion Week runway presentations."} */}
                {hasIndigenous ? 
                    " This designer integrated traditional Nigerian textiles (Akwete), highlighting a blend of traditional craft and contemporary fashion." : 
                    " The collection leans heavily toward global standardized textiles with minimal use of indigenous woven fabrics."}
            </p>

        </div>
    )

}