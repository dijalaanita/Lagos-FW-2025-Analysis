import {BarChart, Bar, XAxis, YAxis, Tooltip, PieChart} from 'recharts'

export default function ColourCharts({data}) {
    console.log("recved", data)
    if (!data || !Array.isArray(data)) return <div>Loading chart..</div>;
     
    return (
        <div>
        <h1 style={{textAlign: "center"}}>COLOUR ANALYSIS</h1>
        <h2 style={{textAlign: "center", fontSize:"30px"}}>Colour Charts</h2>
        <BarChart width={700} height={400} data={data} >
            <XAxis dataKey="colour" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="percentage" fill="#8884d8" />
        </BarChart>
{/* 
        
        <PieChart data={data}>
            <XAxis dataKey="colour"/>
            <Tooltip/>
            <Bar/>

        </PieChart> */}
        </div>
    )}