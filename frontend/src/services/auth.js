import axios from "axios"

const API_BASE = axios.create({
  baseURL: "http://127.0.0.1:8000",
})
/**
 * 
 * @param {string} username 
 * @param {string} password 
 * @param {string} email
 * @param {string} full_name
 * @param {"designer" | "student" | "buyer"} role
 * @returns 
 */

export const signup = async (username, password, email, full_name, role) =>{
    const response = await API_BASE.post("/auth/signup", { username, password, email, full_name, role })
    return response.data
};
// login and store the token in localStorage for future authenticated requests

export const login = async (username, password) =>{
    const response = await API_BASE.post("/auth/login", { username, password })
    if (response.data.access_token){
        localStorage.setItem("user_token", response.data.access_token);
        localStorage.setItem("user_role", response.data.role);
        localStorage.setItem("username", response.data.username);

    }
    return response.data
};
// logout by removing the token from localStorage
export const logout = async () => {
    localStorage.removeItem("user_token");
    localStorage.removeItem("user_role");
    localStorage.removeItem("username");
};

// return true if the user is authenticated (i.e., has a token in localStorage), false otherwise
export const isAuthenticated = async () => {
    return !!localStorage.getItem("user_token")
};

// return stored role
export const getUserRole = async () => {
    return localStorage.getItem("user_role")
};

// return stored username
export const getUsername = async () => {
    return localStorage.getItem("username")
};