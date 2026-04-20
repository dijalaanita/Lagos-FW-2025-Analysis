export default function InsightsOverall({ data }){
    if (!data || data.length == 0) return null

    const top = data[0]

    return (
        <div style={{ marginTop: "30px" }}>

            <h3 style={{ textAlign: "center", fontSize: "30px" }}>Key Insights</h3>
            <p style={{ textAlign: "center"}}>
                <strong> {top.colour || top.colours} </strong>
                leads the palette, appearing in approximately
                <strong> {parseFloat(top.percentage || 0).toFixed(0)}% </strong> 
                of the LFW F/W 2025 runway chose most.
            </p>

        </div>
    )

}