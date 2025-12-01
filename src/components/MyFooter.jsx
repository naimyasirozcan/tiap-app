import { Link } from "react-router-dom"
import CompanyLogo from "../assets/nyoworks-logo.png"
import LightLogo from "../assets/tiap-nav-logo-light.png"

function MyFooter() {
  return (
    <div style={
      {
        height: "34px",
        width: "100%",
        backgroundColor: "#403f3f",
        position: "fixed",
        bottom: 0,
        left: 0,
      }
    }
      className="d-flex flex-row align-items-center justify-content-end pe-3">


      <ul style={
        {
          listStyle: "none",
          marginBottom: 0
        }
      }
      className="d-flex align-items-end justify-content-end gap-1 pe-2">
       <div className="d-flex align-items-center gap-1">
        <a href="https://github.com/naimyasirozcan/tiap-app"><img style={{height: "18px"}} src={LightLogo} /></a>
        <span style={{fontSize: "8px"}} className="poppins-light text-white">by</span>
        <a href="https://linkedin.com/in/naimyasirozcan"> <img style={{height: "24px"}} src={CompanyLogo} /></a>
       </div>
      </ul>

    </div>
  )
}

export default MyFooter
