import { AuthContext } from '@/contexts/auth.context'
import React, { useContext } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

function RouteProtection({ children }) {

    const { isLoggedIn, isValidatingUser } = useContext(AuthContext)
    const navigate = useNavigate()

    if(isValidatingUser){
        return
    }

    return (
        <>
        {isLoggedIn ? children : <Navigate to="/unauthorized" />}
        </>
    )
}

export default RouteProtection