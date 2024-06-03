import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  config.headers.setAuthorization(`Bearer ${localStorage.getItem("token")}`);
  return config;
});

export default api;
