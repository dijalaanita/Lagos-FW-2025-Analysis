export default function Top5Overall({ data }){
    if (!data || !Array.isArray(data) || data.length == 0) return null

    const top5 = data.slice(0,5);

    return (
        <div style={{ marginTop: "30px" }}>

            <h3 style={{ textAlign: "center", fontSize: "25px"}}>TOP 5 DOMINANT COLOURS RANKED</h3>
            <ol style={{ paddingLeft: "20px", lineHeight: "2" }}>
                {top5.map((item, index) => (
                    <li key={index} style={{ marginBottom: "10px" }}>
                        <span style={{ fontWeight: "bold", fontSize: "1.1em" }}>
                        {item.colour || item.colours}
                        </span>
                        {" - "}
                        <span style={{ color: "#555"}}>
                            {(item.percentage || 0).toFixed(0)}% of the entire fashion week.
                        </span>
                    </li>
                ))}
            </ol>
            {/* <p>
                The top 5 dominant colours in this collection are  
                <strong>{data.slice(0,5)
                .map(item => item.colour || item.colours)
                .join(', ')}</strong>.
            </p> */}

        </div>
    )

}