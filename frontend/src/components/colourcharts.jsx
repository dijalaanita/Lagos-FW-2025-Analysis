import {BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, ResponsiveContainer, Legend} from 'recharts'

export default function ColourCharts({data}) {
    if (!data || !Array.isArray(data)) return <div style={{ textAlign:"center", padding:"20px"}}>Loading chart..</div>;
    
    const getBarColour = (entry) => {
        const colourName = entry.colour || entry.colours;
        if (!colourName) return "#8884d8";
        const name = colourName.split('/')[0].trim();

        const colourMap = {
        "Cream": "#E8D8B8",
        "Khaki" :"#E8D8B8",
        "Beige": "#E8D8B8",
        "Brown": "#8B4513",
        "Blue": "#4169E1",
        "Grey": "#808080",
        "White": "#F0F0F0",
        "Pink": "#FFC0CB",
        "Black": "#222222",
        "Red": "#DC143C",
        "Orange": "#FFA500",
        "Purple": "#800080",
        "Yellow": "#FFD700",
        "Green": "#2E8B57"
    };
    return colourMap[name] || name.toLowerCase();
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
                COLOUR DISTRIBUTION
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
                                dataKey="colour"
                                angle={-45}
                                textAnchor='end'
                                interval={0}
                                tick={{ fontSize: 11}}/>
                                <YAxis />
                                <Tooltip 
                                cursor={{ fill: 'transparent' }} />
                                <Bar dataKey="percentage" radius={[4,4,0,0]}>
                                    {data.map((entry,index) => (
                                        <Cell key={`cell-bar-${index}`} fill={getBarColour(entry)}/>
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
                                    nameKey="colour"
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={70}
                                    outerRadius={110}
                                    paddingAngle={3}
                                    label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}`}>

                                        {data.map((entry,index) => (
                                            <Cell key={`cell-pie-${index}`} 
                                            fill={getBarColour(entry)}/>
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
