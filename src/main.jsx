import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AuthWrapper } from "./contexts/auth.context"
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { ToastWrapper } from './contexts/toast.context'

createRoot(document.getElementById('root')).render(

  <BrowserRouter>
    <AuthWrapper>
    <ToastWrapper>
      <App />
    </ToastWrapper>
    </AuthWrapper>
  </BrowserRouter>


)
