import axios from "axios";

const axiosInstance = axios.create({
  baseURL : "https://trademate-backend-oqw3.onrender.com",  //backend  API url
  withCredentials: true, // Send cookies with requests
});

export default axiosInstance;