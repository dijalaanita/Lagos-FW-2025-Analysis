import BrandAnalysis from "./pages/BrandAnalysis"
import NavBar from "./components/NavBar"
import Overview from "./pages/Overview"
import { Routes, Route } from "react-router-dom"
// import login from './components/login'
// import { isAuthenticated, logout } from "./services/auth"

export default function App() {
  // const [isLoggedin, setIsLoggedIn] = useState(isAuthenticated());

  // const handleLogout = async () => {
  //   logout();
  //   setIsLoggedIn(false);
  // };
  // if (!isLoggedin){
  //   return <login loginSuccess={() => setIsLoggedIn(true)}/>;
  // }

  return (
    <div style={{  fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
}}>
      <NavBar />
    
    <div style={{ 
  padding: "10px", 
  maxWidth: "1200px", 
  margin: "0 auto", 
  fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
  // backgroundColor: "#f9f9f9",
  minHeight: "100vh"
}}>
  <Routes>
    <Route path="/" element={<Overview />} />

    <Route path="/brand-analysis" element={<BrandAnalysis />} />
  </Routes>
  {/* <Overview />
  <BrandAnalysis /> */}
</div>
</div>
  )
}