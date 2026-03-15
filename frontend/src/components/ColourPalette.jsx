export default function ColourPalette({ data }) {

    if (!data || data.length === 0) return null

    const colourMap = {
        "Cream/Khaki/Beige": "#E8D8B8",
        "Brown": "brown",
        "Blue": "blue",
        "Grey": "grey",
        "White": "white",
        "Pink": "pink",
        "Black": "black",
        "Red": "red",
        "Orange": "orange",
        "Purple": "purple",
        "Yellow": "yellow",
        "Green": "green"
    }

    return (
        <div style={{ marginTop: "20px" }}>

            <h3 style={{ textAlign: "center", fontSize:"30px"}}>Colour Palette</h3>

            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>

                {data.map((item, index) => {

                    const raw = item.colour || item.colours;
                    if (!raw) return null; // skip if no colour info

                    const colourDisplay =
                        colourMap[raw] ||
                        raw.split('/')[0].trim().toLowerCase()

                    return (

                        <div key={index} style={{ textAlign: "center", width: "80px" }}>

                            <div
                                style={{
                                    width: "60px",
                                    height: "60px",
                                    background: colourDisplay,
                                    border: "1px solid #ccc",
                                    borderRadius: "8px"                                }}
                            />

                            <small style={{ display: "block", marginTop: "5px" }}>
                                {raw}
                                {item.percentage && (
                                    <span style={{ 
                                        display:"block", 
                                        fontWeight:"bold", 
                                        fontSize: "12px", 
                                        textAlign:"center" }}>
                                        {typeof item.percentage === 'string' 
                                            ? item.percentage 
                                            : `${Math.round(item.percentage)}%`
                                        }
                                    </span>)
                }

                            </small>

                        </div>

                    )})}
            </div>

        </div>
    )
}