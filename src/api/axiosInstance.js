import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:5296/api",
    headers: {
        'Content-Type': 'application/json',
        'Accept': '*/*'
    }
});

axiosInstance.interceptors.response.use(
    (response) =>{
        return response
    }, 
    (error) =>{
        if(error.response && (error.response.status === 401 || error.response.status === 500)){
            console.log("Token expired or unauthorized!");
            alert("Token expired or unauthorized!");
            localStorage.removeItem("token");
            localStorage.removeItem("role");
            window.location.href = '/';
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;