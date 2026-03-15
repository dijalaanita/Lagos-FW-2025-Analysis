// import axios from "axios"

// const API_BASE = axios.create({
//   baseURL: "http://127.0.0.1:8000",
// })

// export const signup = async (username, password) =>{
//     const response = await API_BASE.get(`${API_BASE}/signup`, { username, password })
//     return response.data
// };

// export const login = async (username, password) =>{
//     const response = await API_BASE.get(`${API_BASE}/login`, { username, password })
//     if (response.data.access_token){
//         localStorage.setItem("user_token", response.data.access_token);

//     }
//     return response.data
// };

// export const logout = async () => {
//     localStorage.removeItem("user_token");
// };

// export const isAuthenticated = async () => {
//     return !!localStorage.getItem("user_token")
// }