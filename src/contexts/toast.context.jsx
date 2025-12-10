import { createContext, useState } from "react"

const ToastContext = createContext()

function ToastWrapper({ children }) {

    const [toasts, setToasts] = useState([])

    const handleToastClose = (index) => {
        const clone = [...toasts]
        clone.splice(index, 1)
        setToasts(clone)
    }

    function createToast(type, message) {
        
        const newToast = {
            type: type,
            message: message
        }

        const clone = [...toasts]
        
        clone.push(newToast)

        setToasts(clone)
    }

    const passedContext = {
        toasts,
        setToasts,
        handleToastClose,
        createToast
    }

    return (
        <ToastContext.Provider value={passedContext}>
            {children}
        </ToastContext.Provider>
    )
}

export { ToastContext, ToastWrapper }