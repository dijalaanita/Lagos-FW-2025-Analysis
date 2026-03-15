export default function BrandSelector({ brands, onSelect }) {

    return (
        <div style={{ marginBottom: "20px" }}>
            <label style={{ fontWeight: "bold", fontSize:"17px"}}>Select Brand:</label>
            <select onChange={(e) => onSelect(e.target.value)} 
            style={{ 
                marginLeft: "10px", 
                padding: "5px", 
                borderColor:"white", 
                fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif" }}>

                {brands.map((brand) => (
                    <option key={brand} value={brand}>{brand.replace(/_/g, ' ')}</option>
                ))}
            </select>
        </div>
    )

}