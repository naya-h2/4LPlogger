import axios from "axios";

const api = axios.create({
  baseURL: "https://api-plogger.cnu.team/",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
