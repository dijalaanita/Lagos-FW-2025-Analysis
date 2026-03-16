import { useEffect, useState } from "react"
import axios from "axios"; 
import { getOverviewColours, getOverviewFabrics } from "../services/api"
import ColourCharts from "../components/colourcharts"
import ColourPalette from "../components/ColourPalette";
import Top5Overall from "../components/top5overall";
import InsightsOverall from "../components/InsightsOverall";
import FabricCharts from "../components/FabricCharts";
import OverallFabricInsights from "../components/OverallFabricsInsights";

export default function Overview(){
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [fabric, setFabric] = useState([]); 

    // 1. Fetch Colours
    useEffect(() => {
        getOverviewColours()
        .then((response) => {
            setData(response);
            setLoading(false);
        })
        .catch((error) => {
            console.error("failed to fetch colours", error);
            setLoading(false);
        });
    }, []); 

    // 2. Fetch Fabrics
    useEffect(() => {
    // 1. Start loading
    setLoading(true);

    // 2. Fetch Fabrics (using the service function you added to api.js)
    getOverviewFabrics()
        .then((response) => {
            setFabric(response);
        })
        .catch((error) => {
            console.error("Failed to fetch fabrics:", error);
        })
        .finally(() => {
            // 3. Stop loading once the request is done (success or failure)
            setLoading(false);
        });
}, []);


    if (loading) return <div style={{textAlign: "center", padding: "50px"}}>Loading overall fashion trends...</div>
    
    return (
        <div>
            <h1 style={{ fontSize: "30px", textAlign: "center"}}>LAGOS FASHION WEEK COLOUR TRENDS</h1>
            
            {data && data.length > 0 ? (
                <ColourCharts data={data} />
            ) : (
                <p style={{textAlign: "center"}}>Connecting to colour database...</p>
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
                                    <Top5Overall data={data}/>
                                </div>
                            </div>
            <InsightsOverall data={data}/>
            {/* FABRIC ANALYSIS */}
            <hr style={{ 
                border: "0", 
                height: "1px", 
                background: "#e0e0e0", 
                margin: "60px 0" }} />
            
            <h1 style={{ 
                fontSize: "30px", 
                textAlign: "center"}}>LAGOS FASHION WEEK FABRIC TRENDS</h1>
            
            {/* FIXED: We are checking 'fabric.length' now, not 'fabricData' */}
            {fabric && fabric.length > 0 ? (
                <div style={{ height: '400px', width: '100%' }}>
                    <FabricCharts data={fabric} title="OVERALL FABRIC DISTRIBUTION" />
                    <OverallFabricInsights data={fabric}/>
                </div>
            ) : (
                <p style={{textAlign: "center"}}>Fetching fabric texture analysis...</p>
            )}
        </div>
    )
}