import LightLogo from "../assets/tiap-nav-logo-light.png"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { AuthContext } from "@/contexts/auth.context"
import { useContext } from "react"

function MyNavbar() {

  const { isLoggedIn, authenticateUser } = useContext(AuthContext)
  const navigate = useNavigate()
  const location = useLocation()

  const handleLogout = async () => {
    localStorage.removeItem("authToken")
    localStorage.removeItem("loggerUserInfo")
    await authenticateUser()
    navigate("/login")
    console.log(`Employee logged out from TIAP succesfully.`)
  }

  return (
    <div className="flex flex-row items-center justify-between px-3 h-[24px] w-full bg-[#403f3f] fixed top-0 left-0 z-40">
      <img style={{ height: "18px" }} src={LightLogo} alt="" />

      <ul className="flex items-center gap-3 poppins-light cursor-pointer text-white text-sm list-none m-0">
        {isLoggedIn ? (
          <>
            <li><Link to={"/profile"}>Profile</Link></li>
            <li><a onClick={handleLogout}>Log Out</a></li>
          </>
        ) : location.pathname === "/signup" ? (
          <li><Link to={"/login"}>Login</Link></li>
        ) : location.pathname === "/login" ? (
          <li><Link to={"/signup"}>Signup</Link></li>
        ) : null}
      </ul>
    </div>
  )
}

export default MyNavbar