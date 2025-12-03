import { AuthContext } from '../contexts/auth.context'
import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'

function RouteProtection({ children }) {

    const { isLoggedIn, isValidatingUser } = useContext(AuthContext)

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