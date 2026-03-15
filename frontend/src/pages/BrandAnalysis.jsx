import { useEffect, useState } from "react"
import {getBrandColours, getBrands} from "../services/api"
import ColourCharts from "../components/colourcharts"
import BrandSelector from "../components/BrandSelector"
import Insights from "../components/Insights"
import ColourPalette from "../components/ColourPalette"
import ImageGallery from "../components/imagegallery"
import Top5 from "../components/top5"

export default function BrandAnalysis() {

    const [data, setData] = useState([]);
    const [brand, setBrand] = useState("")
    const [brands, setBrands] = useState([])
    const [loading, setloading] = useState(true)

    useEffect(() => {

        getBrands().then(response => {
            console.log("Fetched Brands:", response); // log the fetched brands for debugging
            if (response && response.length > 0){
            setBrands(response)
            setBrand(response[0]) // set the first brand as default
            }
        })
        .catch(error => console.error("Error fetching brands:", error))
    }, [])

    useEffect(() => {
        if (!brand) return; // ensure brand is selected before fetching
        setloading(true); // set loading state before fetching data

        getBrandColours(brand)
        .then(response => {
            console.log("Fetched Brand Colours:", response); // log the fetched data for debugging
            setData(response); // store the response data in state
            setloading(false);
        })

    .catch((error) =>{
        console.error("Error fetching brand colours:", error);
            setloading(false);
    })
    }, [brand])

    if (loading) return <p>Loading...</p>
    
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

                    LFW 2025 COLOUR ANALYSIS
                </span>
            </h1>

            <BrandSelector brands={brands} 
            onSelect={setBrand} />

            <ImageGallery brandName={brand} />

            <div style={{ 
                backgroundColor: "#fafafa", 
                borderRadius: "20px", 
                padding: "30px", 
                marginTop: "20px" }}>

                    {!loading && data?.length > 0 ?
                    ( <ColourCharts data={data} />) : 
                    ( <p>Loading chart data...</p>)
                    }

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
};
