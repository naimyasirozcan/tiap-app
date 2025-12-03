import axios from "axios"

const service = axios.create({
    baseURL: `${import.meta.env.VITE_SERVER_URL}/api`,
})

service.interceptors.request.use((req) => {
    const authToken = localStorage.getItem("authToken")
    
    authToken ? req.headers.authorization = `Bearer ${authToken}` : null

    return req
})

export default service