import axios from "axios"

const API_BASE = axios.create({
  baseURL: "http://127.0.0.1:8000",
})

export const getBrandColours = async (brand) => {
    const response = await API_BASE.get(`/colours/brand/${brand}`)
    return response.data;
};

export const getBrands = async () => {
  const response = await API_BASE.get("/brands");
  return response.data;
}

export const getOverviewColours = async () => {
  const response = await API_BASE.get("/analysis/overview/colours")
  return response.data;
}

export const getBrandImages = async (brand) => {
  const response = await API_BASE.get(`/brands/${brand}/images`)
  return response.data;
}
