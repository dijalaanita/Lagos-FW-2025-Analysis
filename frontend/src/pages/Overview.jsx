import { useEffect, useState } from "react"
import { getOverviewColours } from "../services/api"
import ColourCharts from "../components/colourcharts"
import Insights from "../components/Insights"
import ColourPalette from "../components/ColourPalette";
import Top5 from "../components/top5"
import Top5Overall from "../components/top5overall";
import InsightsOverall from "../components/InsightsOverall";
import FabricCharts from "../components/FabricCharts";
import Top5Fabrics from "../components/top5fabrics";
import OverallFabricInsights from "../components/OverallFabricsInsights";
// import fabricDataJSON from './fabric_analysis.json'


export default function Overview(){
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [fabric, setFabric] = useState([]);

    useEffect(() => {

        getOverviewColours()
        .then((response) => {
            setData(response);
            setLoading(false);})
        .catch((error) => {
            console.error("failed to fetch colours", error);
            setLoading(false);
        });

        if (fabricJson && fabricJSON.overall_stats){
        const stats = fabricJson.overall_stats;
        const fData = Object.keys(stats).map(key => ({
            fabric: key,
            percentage: stats[key]
        }))
    }

    }, []);

    if (loading) return <div>loading overall fashion trends...</div>
    console.log("Overview Data:", data);
    return (
        <div>
            <h1 style={{ fontSize: "30px", textAlign: "center"}}>LAGOS FASHION WEEK COLOUR TRENDS</h1>
             {!loading && data?.length > 0 ? (
            <ColourCharts data={data} />
            ) : (
            <p>Loading chart data...</p>
            )}
            <ColourPalette data={data}/>
            <InsightsOverall data={data}/>
            <Top5Overall data={data}/>

            {/* FABRIC ANALYSIS */}
            <hr style={{ 
                border: "0", 
                height: "1px", 
                background: "#e0e0e0", 
                margin: "60px 0" }} />
            
            <h1 style={{ 
                fontSize: "30px", 
                textAlign: "center"}}>LAGOS FASHION WEEK FABRIC TRENDS</h1>
            {fabricData.length > 0 ? (
                <FabricCharts data={fabric} title="OVERALL FABRIC DISTRIBUTION" />
            ) : (
                <p style={{textAlign: "center"}}>Loading fabric data...</p>
            )}
            <FabricCharts data={fabric}/>
            <OverallFabricInsights data={fabric}/>

            
            </div>
    )
}