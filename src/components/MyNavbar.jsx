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
    navigate("/login")
    await authenticateUser()
    console.log(`Employee logged out from TIAP succesfully.`)
    return
  }

  return (

    <div
      className="bottom-shadow flex flex-row items-center justify-between pl-3 h-[20px] w-full bg-[#403f3f] fixed top-0 left-0 ">
      <img style={{ height: "20px" }} src={LightLogo} alt="" />

      <ul style={
        {
          listStyle: "none",
          marginBottom: 0,
          color: "#fff"
        }
      }
        className="flex items-center gap-3 pr-2 poppins-light cursor-pointer">
        {isLoggedIn ?
          <>
            <li><Link to={"/profile"}>Profile</Link></li>
            <li> <a onClick={handleLogout}> Log Out </a></li>
          </> :
          location.pathname === "/signup" ?
            <li><Link to={"/login"}>Login</Link></li> :
            location.pathname === "/login" ?
              <li><Link to={"/signup"}>Signup</Link></li> :
              null
        }
      </ul>

    </div>
  )
}

export default MyNavbar
