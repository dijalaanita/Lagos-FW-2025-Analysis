export default function Insights({ data }){
    if (!data || data.length == 0) return null

    const top = data[0]

    return (
        <div style={{ marginTop: "30px" }}>

            <h3 style={{ textAlign: "center", fontSize: "30px" }}>Key Insights</h3>
            <p style={{ textAlign: "center"}}>
                <strong> {top.colour || top.colours} </strong>
                was chosen above all else, at
                <strong> {parseFloat(top.percentage || 0).toFixed(0)}% </strong> 
                it is the collection's 
            </p>
            

        </div>
    )

}