import { useContext } from "react"

import InternalServerError from "./pages/errors/InternalServerError"
import Unauthorized from "./pages/errors/Unauthorized"
import NotFound from "./pages/errors/NotFound"
import logoText from "./assets/tiap-text.png"
import MyNavbar from "./components/MyNavbar"
import Sidebar from "./components/Sidebar"
import MyFooter from "./components/MyFooter"
import { Route, Routes } from "react-router-dom"
import logoIcon from "./assets/tiap-icon-light.png"
import CreateExceptionLog from "./pages/CreateExceptionLog"
import ExceptionLogs from "./pages/ExceptionLogs"
import ExceptionDetails from "./pages/ExceptionDetails"
import EditException from "./pages/EditException"
import CreateRootCause from "./pages/CreateRootCause"
import RootCauses from "./pages/RootCauses"
import RootCauseDetails from "./pages/RootCauseDetails"
import Login from "./pages/auth/Login"
import Signup from "./pages/auth/Signup"
import { AuthContext } from "./contexts/auth.context"
import Profile from "./pages/Profile"
import RouteProtection from "./pages/RouteProtection"
import MyToast from "./components/MyToast"
import { ToastContext } from "./contexts/toast.context"
import Dashboard from "./pages/Dashboard"
import EditRootCause from "./pages/EditRootCause"

function App() {

  const { isLoggedIn } = useContext(AuthContext)
  const { toasts } = useContext(ToastContext)

  return (
    <>
      <div id="app-screen" className="w-full h-screen bg-[#403f3f36]" >

        <MyNavbar />

        <div className="p-3 z-50 fixed top-[24px] right-[10px]">
          {toasts && toasts.map((eachToast, index) => {
            return <MyToast key={index} type={eachToast.type} message={eachToast.message} />
          })}
        </div>

        {isLoggedIn && <Sidebar />}

        <div 
          id="main-content" 
          className={isLoggedIn ? "pt-[24px] pb-[24px] pl-[120px] pr-0 h-full w-full overflow-auto" : "pt-[24px] pb-[24px] h-full w-full overflow-auto"}
          style={{ 
            minHeight: 'calc(100vh - 44px)',
            maxHeight: 'calc(100vh - 44px)'
          }}
        >
          <Routes>
            <Route path={"/login"} element={<Login />} />
            <Route path={"/signup"} element={<Signup />} />
            <Route path={"/profile"} element={<RouteProtection><Profile /></RouteProtection>} />

            <Route path={"/dashboard"} element={<RouteProtection><Dashboard /></RouteProtection>} />

            <Route path={"/logs"} element={<RouteProtection><ExceptionLogs /></RouteProtection>} />
            <Route path={"/logs/:_id"} element={<RouteProtection><ExceptionDetails /></RouteProtection>} />
            <Route path={"/logs/:_id/edit"} element={<RouteProtection><EditException /></RouteProtection>} />
            <Route path={"/logs/create"} element={<RouteProtection><CreateExceptionLog /></RouteProtection>} />

            <Route path={"/root-causes"} element={<RouteProtection><RootCauses /></RouteProtection>} />
            <Route path={"/root-causes/:_id"} element={<RouteProtection><RootCauseDetails /></RouteProtection>} />
            <Route path={"/root-causes/create"} element={<RouteProtection><CreateRootCause /></RouteProtection>} />
            <Route path={"/root-causes/:_id/edit"} element={<RouteProtection><EditRootCause /></RouteProtection>} />

            <Route path={"/500"} element={<InternalServerError />} />
            <Route path={"*"} element={<NotFound />} />
            <Route path={"/unauthorized"} element={<Unauthorized />} />
          </Routes>
        </div>

        <MyFooter />

      </div>

      {/* *** Only Desktop Warning *** */}
      <div id="only-mobile" className="h-screen w-full flex-col bg-gray-900 text-zinc-100 flex items-center justify-center p-20">
        <img src={logoIcon} alt="" />
        <h1 className="text-[30px]">Ooops!</h1>
        <p className="text-[17px] text-center">Unfortunately, Tiap is a desktop-first application... <br /> For the best experience, we are keeping you in the desktop version!</p>

        <a className="mt-5" href="https://github.com/naimyasirozcan/tiap-app" target="_blank">
          <span><img className="h-7" src={logoText} alt="" /></span>
        </a>
      </div>
    </>
  )
}

export default App