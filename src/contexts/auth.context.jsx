import Loading from "@/pages/Loading"
import axios from "axios"
import { createContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

const AuthContext = createContext()

function AuthWrapper({ children }) {

    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [loggedUserInfo, setLoggedUserInfo] = useState(null)
    const [isValidatingUser, setIsValidatingUser] = useState(true)
    const [isAdmin, setIsAdmin] = useState(false)
    const [isSuperAdmin, setIsSuperAdmin] = useState(false)
    const navigate = useNavigate()

    async function authenticateUser() {

        setIsValidatingUser(true)

        try {
            const authToken = localStorage.getItem("authToken")

            if (!authToken) {
                setIsLoggedIn(false)
                setLoggedUserInfo(null)
                setIsValidatingUser(false)
                setIsAdmin(false)
                setIsSuperAdmin(false)
                navigate("/login")
                return
            }

            const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/auth/verify`, {
                headers: {
                    authorization: `Bearer ${authToken}`
                }
            }) 

            localStorage.setItem("loggedUserInfo", JSON.stringify(response.data))

            if(response.data.role === "admin" || response.data.role === "superAdmin"){
                setIsAdmin(true)
            } else if (response.data.role === "superAdmin"){
                setIsSuperAdmin(true)
            }

            setIsLoggedIn(true)
            setLoggedUserInfo(response.data)
            setIsValidatingUser(false)
            
        } catch (error) {

            setIsLoggedIn(false)
            setLoggedUserInfo(null)
            setIsValidatingUser(false)
            console.log(error)
            navigate("/login")
        }
    }

    useEffect(() => {
        authenticateUser()
    }, [])

    const passedContext = {
        isLoggedIn,
        loggedUserInfo,
        setIsLoggedIn,
        authenticateUser,
        isAdmin,
        isSuperAdmin
    }

    if (isValidatingUser) {
        return <Loading />
    }

    return (
        <AuthContext.Provider value={passedContext}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthContext, AuthWrapper }