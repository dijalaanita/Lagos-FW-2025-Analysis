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
    // !loading && <p>No colours found here</p>
    console.log("Current Data State:", data);
    
    return (
        <div>
            <h1 style={{ fontSize: "40px", textAlign: "center"}}>{brand.replace(/_/g, ' ').toUpperCase()} LFW 2025 COLOUR ANALYSIS</h1>
            <BrandSelector brands={brands} 
            onSelect={setBrand} />
            <ImageGallery brandName={brand} />

            {!loading && data?.length > 0 ?(
            <ColourCharts data={data} />
            ) : (
            <p>Loading chart data...</p>
            )}

            <ColourPalette data={data}/>
            <Insights data={data} />
            <Top5 data={data}/>
        </div>
    )
};
