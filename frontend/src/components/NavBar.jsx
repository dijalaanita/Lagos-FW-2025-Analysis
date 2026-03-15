import { Link } from "react-router-dom"

export default function NavBar(){

    return(
        <div style={{
            padding: "20px",
            background: "#111",
            color: "white",
            display: "flex",
            gap: "20px"
        }}>
            <Link to="/" style={{color: "white", textDecoration: "none"}}>
            Overview
            </Link>

            <Link to="/brand-analysis" style={{color: "white", textDecoration: "none"}}>
            Brand Analysis
            </Link>



        </div>
    )

}