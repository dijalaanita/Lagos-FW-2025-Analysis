import BrandAnalysis from "./pages/BrandAnalysis"
import NavBar from "./components/NavBar"
import Overview from "./pages/Overview"
import { Routes, Route, Navigate } from "react-router-dom"
import Login from "./components/login";
import { isAuthenticated, logout } from "./services/auth"
import { useState } from "react";

export default function App() {
  const [isLoggedin, setIsLoggedIn] = useState(isAuthenticated());

  const handleLogout = async () => {
    logout();
    setIsLoggedIn(false);
  };
  // if not logged in, show the login screen only
  if (!isLoggedin){
    return <Login loginSuccess={() => setIsLoggedIn(true)}/>;
  }

  return (
    <div style={{  fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
}}>
      <NavBar onLogout={handleLogout}/>
    
    <div className="content-container"
    style={{ 
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
    <Route path="*" element={<Navigate to="/"/>} />
  </Routes>
  {/* <Overview />
  <BrandAnalysis /> */}
</div>
</div>
  )
}