import axios from "axios"
import { useContext, useEffect, useState } from "react"
import Loading from "./pages/Loading"
import InternalServerError from "./pages/errors/InternalServerError"
import Unauthorized from "./pages/errors/Unauthorized"
import MyNavbar from "./components/MyNavbar"
import Sidebar from "./components/Sidebar"
import MyFooter from "./components/MyFooter"
import { Route, Routes } from "react-router-dom"
import CreateExceptionLog from "./pages/CreateExceptionLog"
import ExceptionDetails from "./pages/ExceptionDetails"
import ExceptionLogs from "./pages/ExceptionLogs"
import RootCauses from "./pages/RootCauses"
import RootCauseDetails from "./pages/RootCauseDetails"
import Login from "./pages/auth/Login"
import Signup from "./pages/auth/Signup"
import NotFound from "./pages/errors/NotFound"
import { AuthContext } from "./contexts/auth.context"
import Profile from "./pages/Profile"
import OrderDetails from "./pages/OrderDetails"
import Orders from "./pages/Orders"
import RouteProtection from "./pages/RouteProtection"
import MyToast from "./components/MyToast"
import { ToastContext } from "./contexts/toast.context"

function App() {

  const { isLoggedIn } = useContext(AuthContext)
  const { toasts } = useContext(ToastContext)
    
  return (
    <div className="w-full min-h-screen" style={{ background: "linear-gradient(0deg,rgba(0, 0, 0, 0.43) 25%, rgba(0, 0, 0, 0) 100%)" }}>

      <MyNavbar />

       <div className="p-3 z-12 fixed top-[60px] right-[10px]">

        {toasts && toasts.map((eachToast, index) => {
          return <MyToast key={index} type={eachToast.type} message={eachToast.message}/>
        })}


      </div>

      {isLoggedIn && <Sidebar />}

      <div id="main-content" className={isLoggedIn ? "h-auto w-full pl-[120px] py-[20px]" : "h-auto w-full"}>

        <Routes>
          <Route path={"/login"} element={<Login />}/>
          <Route path={"/signup"} element={<Signup />}/>
          <Route path={"/profile"} element={<RouteProtection><Profile /></RouteProtection>} />

          <Route path={"/logs"} element={<RouteProtection><ExceptionLogs /></RouteProtection>} />
          <Route path={"/logs/:id"} element={<RouteProtection><ExceptionDetails /></RouteProtection>} />
          <Route path={"/logs/create"} element={<RouteProtection><CreateExceptionLog /></RouteProtection>} />

          <Route path={"/root-causes"} element={<RouteProtection><RootCauses /></RouteProtection>} />
          <Route path={"/root-causes/:id"} element={<RouteProtection><RootCauseDetails /></RouteProtection>} />

          <Route path={"/orders"} element={<RouteProtection><Orders /></RouteProtection>} />
          <Route path={"/order/:id"} element={<RouteProtection><OrderDetails /></RouteProtection>} />

          <Route path={"/500"} element={<InternalServerError />} />
          <Route path={"/404"} element={<NotFound />} />
          <Route path={"/unauthorized"} element={<Unauthorized />} />
        </Routes>
      </div>

      <MyFooter />

    </div>
  )
}

export default App