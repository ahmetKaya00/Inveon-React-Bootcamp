import axios from "axios";



const apiClient = axios.create({
    baseURL: "https://jsonplaceholder.typicode.com",
    headers: {
        "Content-Type": "application/json",
    },
});

apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error("API Hatası",error);
        return Promise.reject(error);
    }
);

export default apiClient;