
import React from 'react';
import {BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, ResponsiveContainer, Legend} from 'recharts'

export default function FabricCharts({data}) {
    if (!data || !Array.isArray(data)) return <div style={{ textAlign:"center", padding:"20px"}}>Loading chart..</div>;
    
    const getFabricColour = (entry) => {
    const name = entry.fabric ? entry.fabric.toLowerCase() : "";
    
    // Updated to match your specific Profile names from the JSON
    if (name.includes("sleek")) return "#2E86C1";      // Sleek/Technical
    if (name.includes("artisanal")) return "#D35400";  // Artisanal/Textured
    if (name.includes("structured")) return "#27AE60"; // Structured Matte
    if (name.includes("coarse")) return "#8E44AD";     // Coarse/Natural
    if (name.includes("unique")) return "#B85C38";     // Unique Ethnic
    
    return "#8884d8"; // Default fallback
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
                            <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 100}}>
                                <XAxis 
                                dataKey="fabric"
                                angle={-45}
                                textAnchor='end'
                                interval={0}
                                tick={{ fontSize: 11}}/>
                                <YAxis />
                                <Tooltip 
                                cursor={{ fill: 'transparent' }} />
                                <Bar dataKey="count" radius={[4,4,0,0]}>
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
                                    dataKey="count"
                                    nameKey="fabric"
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={70}
                                    outerRadius={110}
                                    paddingAngle={3}
                                    label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}>

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
