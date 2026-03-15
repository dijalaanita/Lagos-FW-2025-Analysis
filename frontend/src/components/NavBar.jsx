import { Link } from "react-router-dom"

export default function NavBar({ onLogout }){

    return(
        <div style={{
            padding: "20px 40px",
            background: "#111",
            color: "white",
            display: "flex",
            gap: "20px",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            boxSizing: "border-box"
        }}>
            <div style={{ display: "flex", gap: "20px"}}>
                <Link to="/" style={{color: "white", textDecoration: "none", fontWeight: "bold"}}>
                Overview
                </Link>

                <Link to="/brand-analysis" style={{color: "white", textDecoration: "none", fontWeight: "bold"}}>
                Brand Analysis
                </Link>
            </div>

            <button
                onClick={onLogout}
                style={{
                    background: "transparent",
                    color: "white",
                    border: "1px solid white",
                    padding: "5px 15px",
                    cursor: "pointer",
                    borderRadius: "4px",
                    fontSize: "14px",
                    fontWeight: "bold"
                }}
            >LOGOUT</button>



        </div>
    )

}