
import React from 'react';
import {BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, ResponsiveContainer, Legend} from 'recharts'

export default function FabricCharts({data}) {
    if (!data || !Array.isArray(data)) return <div style={{ textAlign:"center", padding:"20px"}}>Loading chart..</div>;
    
    const getFabricColour = (entry) => {
        const fabricName = entry.fabric ? entry.fabric.toLowerCase() : "";
        
        const colourMap = {
        "silk": "#E6D5B8",          // Champagne / Cream
            "mesh": "#3D3D3D",          // Dark Grey
            "denim": "#5C7AEA",         // Royal Blue
            "africa_fabric": "#B85C38", // Terracotta / Rust (for Akwete/Ankara)
            "akwete": "#B85C38",        // Backup for Akwete
            "cotton": "#D2C4B3",        // Natural Khaki
            "cotton_crochet": "#F4F1EA",// Off-white
            "pu_leather": "#222222",    // Black
            "linen": "#C8BFA9"          // Light Natural
    };
    return colourMap[fabricName] || "#8884d8";
    };

    return (
        <div style={{ 
            marginTop:"40px",
            marginBottom:"40px"}}>

        <h2 style={{
            textAlign: "center", 
            fontSize: "24px", 
            letterSpacing:"3px", 
            fontWeight:"300", 
            textTransform: "uppercase", 
            marginBottom: "30px"}}>
                FABRIC DISTRIBUTION
                </h2>

        {/* container for charts to appear side by side */}
        <div style={{ display: "flex", 
            flexWrap: "wrap", 
            justifyContent:"center", 
            gap: "20px",
            width: "100%"}}>

                {/* BAR CHART */}
                <div style={{
                    flex: "1 1 400px", 
                    height: "400px", 
                    backgroundColor: "#fff",
                    padding: "15px",
                    borderRadius: "12px"}}>                        
                    <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 60}}>
                                <XAxis 
                                dataKey="fabric"
                                angle={-45}
                                textAnchor='end'
                                interval={0}
                                tick={{ fontSize: 11}}/>
                                <YAxis />
                                <Tooltip 
                                cursor={{ fill: 'transparent' }} />
                                <Bar dataKey="percentage" radius={[4,4,0,0]}>
                                    {data.map((entry,index) => (
                                        <Cell key={`cell-bar-${index}`} fill={getFabricColour(entry)}/>
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>

                </div>

                {/* PIE CHART */}
                <div style={{ 
                    flex: "1 1 400px", 
                    height: "400px", 
                    minWidth: "300px", 
                    backgroundColor: "#fff", 
                    padding: "15px", 
                    borderRadius: "12px"}}>
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={data}
                                    dataKey="percentage"
                                    nameKey="fabric"
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={70}
                                    outerRadius={110}
                                    paddingAngle={3}
                                    label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}`}>

                                        {data.map((entry,index) => (
                                            <Cell key={`cell-pie-${index}`} 
                                            fill={getFabricColour(entry)}/>
                                        ))}
                                </Pie>
                                <Tooltip />
                                <Legend verticalAlign='bottom' height={36}/>
                            </PieChart>
                        </ResponsiveContainer>
                </div>
                </div>
        </div>
    )}
