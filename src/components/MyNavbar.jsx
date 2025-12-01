import { Nav, Navbar } from "react-bootstrap"
import LightLogo from "../assets/tiap-nav-logo-light.png"
import { Link } from "react-router-dom"

function MyNavbar() {
  return (

    <div style={
      {
        height: "34px",
        width: "100%",
        backgroundColor: "#403f3f",
        position: "fixed",
        top: 0,
        left: 0,
      }
    }
      className="bottom-shadow ps-3 d-flex flex-row align-items-center justify-content-between">
      <img style={{height: "24px"}} src={LightLogo} alt="" />

      <ul style={
        {
          listStyle: "none",
          marginBottom: 0,
          color: "#fff"
        }
      }
      className="d-flex align-items-center gap-3 pe-2 poppins-light">
         <li><Link to={"/about"}>About Us</Link></li>
        <li><Link to={"/"}>Login</Link></li>
      </ul>

    </div>
  )
}

export default MyNavbar
