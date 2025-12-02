import Loading from "@/pages/Loading"
import axios from "axios"
import { createContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

const AuthContext = createContext()

function AuthWrapper({ children }) {

    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [loggedUserId, setLoggedUserId] = useState(null)
    const [isValidatingUser, setIsValidatingUser] = useState(true)
    const navigate = useNavigate()

    async function authenticateUser() {

        setIsValidatingUser(true)

        try {
            const authToken = localStorage.getItem("authToken")

            if (!authToken) {
                setIsLoggedIn(false)
                setLoggedUserId(null)
                setIsValidatingUser(false)
                navigate("/login")
                return
            }

            const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/auth/verify`, {
                headers: {
                    authorization: `Bearer ${authToken}`
                }
            })

            setIsLoggedIn(true)
            setLoggedUserId(response.data._id)
            setIsValidatingUser(false)
            
        } catch (error) {

            setIsLoggedIn(false)
            setLoggedUserId(null)
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
        loggedUserId,
        setIsLoggedIn,
        authenticateUser
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