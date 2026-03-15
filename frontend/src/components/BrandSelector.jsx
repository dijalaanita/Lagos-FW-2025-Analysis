export default function BrandSelector({ brands, onSelect }) {

    return (
        <div style={{ 
            marginBottom: "20px", 
            display:"flex",
            flexDirection: "column",
            alignItems: "center"
         }}>
            <label style={{ 
                fontWeight: "bold", 
                fontSize:"17px",
                letterSpacing: "3px",
                textTransform: "uppercase",
                marginBottom: "12px",
                color: "#777"
                }}>
                    Select Designer/Brand
            </label>
            <div style={{
                position: "relative",
                width: "100%",
                maxWidth: "350px"
            }}>
                <select onChange={(e) => onSelect(e.target.value)} 
                    style={{ 
                        width: "100%",
                        appearance: "none", // Hides the default browser arrow
                        padding: "15px 25px", 
                        fontSize: "16px",
                        letterSpacing: "1px",
                        fontWeight: "500",
                        backgroundColor: "#fff",
                        border: "1px solid #e0e0e0",
                        borderRadius: "50px", // Cute pill shape
                        cursor: "pointer",
                        outline: "none",
                        boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
                        transition: "all 0.3s ease",
                        color: "#333",
                        textAlign: "center"}}>

                {brands.map((brand) => (
                    <option key={brand} value={brand}>{brand.replace(/_/g, ' ')}</option>
                ))}
            </select>
            {/* arrow?? */}
            <div style={{
                position: "absolute",
                    right: "25px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    pointerEvents: "none",
                    fontSize: "10px",
                    color: "#333"
            }}>🔻</div>
            </div>
            
        </div>
    )

}