import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3002",
  withCredentials: true, // Send cookies with requests
});

export default axiosInstance;