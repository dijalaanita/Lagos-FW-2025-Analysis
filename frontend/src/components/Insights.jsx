export default function Insights({ data }){
    if (!data || data.length == 0) return null

    const top = data[0]

    return (
        <div style={{ marginTop: "30px" }}>

            <h3>Key Insights</h3>
            <p>
                The dominant colour in this collection is 
                <strong>{top.colour || top.colours}</strong>
                {" "}appearing in 
                <strong>{parseFloat(top.percentage || 0).toFixed(0)}%</strong> 
                of the looks.
            </p>

        </div>
    )

}