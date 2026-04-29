import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:5296/api",
    headers: {
        'Content-Type': 'application/json',
        'Accept': '*/*'
    }
});

export default axiosInstance;