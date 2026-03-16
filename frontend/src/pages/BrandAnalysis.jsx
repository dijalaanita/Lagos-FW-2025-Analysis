import { useEffect, useState } from "react"
import axios from "axios"; // Added axios import
import { getBrandColours, getBrands } from "../services/api"
import ColourCharts from "../components/colourcharts"
import BrandSelector from "../components/BrandSelector"
import Insights from "../components/Insights"
import ColourPalette from "../components/ColourPalette"
import ImageGallery from "../components/imagegallery"
import Top5 from "../components/top5"
import FabricCharts from "../components/FabricCharts"
import Top5Fabrics from "../components/top5fabrics"
import FabricInsights from "../components/FabricInsights"

export default function BrandAnalysis() {
    const [data, setData] = useState([]);
    const [brand, setBrand] = useState("")
    const [brands, setBrands] = useState([])
    const [fabric, setFabric] = useState([]) // This matches your data source
    const [loading, setloading] = useState(true)

    // 1. Fetch the list of brands on mount
    useEffect(() => {
        getBrands().then(response => {
            if (response && response.length > 0){
                setBrands(response)
                setBrand(response[0]) 
            }
        })
        .catch(error => console.error("Error fetching brands:", error))
    }, [])

    // 2. Fetch data when the selected brand changes
    useEffect(() => {
        if (!brand) return;
        setloading(true);

        // Fetch Colour Data
        const fetchBrandData = async () => {
            try {
                const colourRes = await getBrandColours(brand);
                setData(colourRes);

                // Fetch Fabric Data from your new Backend Endpoint
                // Make sure this endpoint exists in your FastAPI main.py!
                const fabricRes = await axios.get(`http://127.0.0.1:8000/analysis/brand/${brand}/fabrics`);
                setFabric(fabricRes.data);
                
                setloading(false);
            } catch (error) {
                console.error("Error fetching brand details:", error);
                setFabric([]); // Reset if failed
                setloading(false);
            }
        };

        fetchBrandData();
    }, [brand]);

    if (loading) return <div style={{textAlign: "center", padding: "50px"}}>Loading {brand.replace(/_/g, ' ')} Analysis...</div>
    
    return (
        <div style={{ 
            maxWidth: "1100px", 
            margin: "0 auto", 
            padding: "20px", 
            fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
            color: "#333"
        }}>
            <h1 style={{ 
                fontSize: "2.5rem", 
                textAlign: "center", 
                letterSpacing: "4px", 
                fontWeight: "300", 
                marginBottom: "40px",
                lineHeight: "1.4"
            }}>
                {brand.replace(/_/g, ' ').toUpperCase()}<br/>
                <span style={{ 
                    fontSize: "1rem", 
                    fontWeight: "600", 
                    color: "#999", 
                    letterSpacing: "3px" }}>
                    LFW 2025 TEXTURE & COLOUR ANALYSIS
                </span>
            </h1>

            <BrandSelector brands={brands} onSelect={setBrand} currentBrand={brand} />

            <ImageGallery brandName={brand} />

            <div style={{ 
                backgroundColor: "#fafafa", 
                borderRadius: "20px", 
                padding: "30px", 
                marginTop: "20px" }}>

                {data?.length > 0 ? (
                    <ColourCharts data={data} />
                ) : (
                    <p style={{textAlign: "center"}}>No colour data available.</p>
                )}

                <div style={{ 
                    display: "flex", 
                    flexWrap: "wrap", 
                    gap: "30px", 
                    marginTop: "40px" }}>
                    <div style={{ flex: "1 1 300px" }}>
                        <ColourPalette data={data}/>
                    </div>
                    <div style={{ flex: "1 1 300px" }}>
                        <Top5 data={data}/>
                    </div>
                </div>

                <Insights data={data} />

                </div>
        </div>
    )
}