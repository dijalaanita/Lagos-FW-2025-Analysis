export default function InsightsOverall({ data }){
    if (!data || data.length == 0) return null

    const top = data[0]

    return (
        <div style={{ marginTop: "30px" }}>

            <h3 style={{ textAlign: "center", fontSize: "30px" }}>Key Insights</h3>
            <p style={{ textAlign: "center"}}>
                The dominant colour for the entire fashion show is 
                <strong> {top.colour || top.colours}</strong>
                {" "}appearing in 
                <strong> {parseFloat(top.percentage || 0).toFixed(0)}% </strong> 
                of the looks.
            </p>

        </div>
    )

}