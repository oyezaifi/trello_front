import axios from "axios";
const API = axios.create({
  baseURL: "https://reveify-mernapp.onrender.com/api",
  // baseURL: "http://localhost:5000/api", // url to Run on LocalHost
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export default API;