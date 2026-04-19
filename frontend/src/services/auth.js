import axios from "axios";

const API_BASE = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

/**
 * Register a new user with a role.
 * @param {string} username
 * @param {string} password
 * @param {"designer"|"student"|"buyer"} role
 */
export const signup = async (username, password, role) => {
  const response = await API_BASE.post("/auth/signup", { username, password, role });
  return response.data;
};

/**
 * Log in and store the token + role in localStorage.
 */
export const login = async (username, password) => {
  const response = await API_BASE.post("/auth/login", { username, password });
  if (response.data.access_token) {
    localStorage.setItem("user_token", response.data.access_token);
    localStorage.setItem("user_role", response.data.role);
    localStorage.setItem("username", response.data.username);
  }
  return response.data;
};

/**
 * Log out — clear all stored session data.
 */
export const logout = () => {
  localStorage.removeItem("user_token");
  localStorage.removeItem("user_role");
  localStorage.removeItem("username");
};

/**
 * Returns true if a token exists in localStorage.
 * NOTE: synchronous — no async needed.
 */
export const isAuthenticated = () => {
  return !!localStorage.getItem("user_token");
};

/**
 * Returns the stored role: "designer" | "student" | "buyer" | null
 */
export const getRole = () => {
  return localStorage.getItem("user_role");
};

/**
 * Returns the stored username or null.
 */
export const getUsername = () => {
  return localStorage.getItem("username");
};