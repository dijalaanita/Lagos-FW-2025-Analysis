import { useEffect, useState } from "react"
import { getOverviewColours } from "../services/api"
import ColourCharts from "../components/colourcharts"
import Insights from "../components/Insights"
import ColourPalette from "../components/ColourPalette";
import Top5 from "../components/top5"
import Top5Overall from "../components/top5overall";
import InsightsOverall from "../components/InsightsOverall";

export default function Overview(){
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        getOverviewColours()
        .then((response) => {
            setData(response);
            setLoading(false);})
        .catch((error) => {
            console.error("failed to fetch colours", error);
            setLoading(false);
        });

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
            </div>
    )
}