// import { useState } from "react";
// import { login, signup } from "../services/auth";

// export default function login({ loginSuccess}){
//     const [isSigned, setIsSigned] = useState(false);
//     const [form, setForm] = useState({ username: "", password:""});

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try{
//             if (isSigned){
//                 await signup(form.username, form.password);
//                 alert("ACCOUNT CREATED! LOGIN NOW!");
//                 setIsSigned(false);
//             }
//             else {
//                 await login(form.username, form.password);
//                 loginSuccess();
//             }
//         }
//         catch(error){
//             LERT("authentication failed! check credentials...")
//         }
//     };

//     return (
//         <div style={{ maxWidth: "400px", margin: "100px auto", textAlign: "center", padding: "20px", border: "1px solid #ddd", borderRadius: "8px" }}>
//             <h2>{isSignup ? "Create Account" : "Login"}</h2>
//             <form onSubmit={handleSubmit}>
//                 <input 
//                     type="text" placeholder="Username" 
//                     onChange={(e) => setForm({...form, username: e.target.value})}
//                     style={{ display: "block", width: "100%", margin: "10px 0", padding: "8px" }}
//                 />
//                 <input 
//                     type="password" placeholder="Password" 
//                     onChange={(e) => setForm({...form, password: e.target.value})}
//                     style={{ display: "block", width: "100%", margin: "10px 0", padding: "8px" }}
//                 />
//                 <button type="submit" style={{ width: "100%", padding: "10px", background: "#333", color: "#fff", border: "none" }}>
//                     {isSignup ? "Sign Up" : "Login"}
//                 </button>
//             </form>
//             <p onClick={() => setIsSignup(!isSignup)} style={{ cursor: "pointer", marginTop: "15px", textDecoration: "underline" }}>
//                 {isSignup ? "Already have an account? Login" : "Need an account? Sign Up"}
//             </p>
//         </div>
//     );
// }