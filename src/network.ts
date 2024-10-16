import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: `http://localhost:3000`,
    withCredentials: false
});

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) =>
    Promise.reject(
        (error.response && error.response.data) || error
    )
)

export default axiosInstance;