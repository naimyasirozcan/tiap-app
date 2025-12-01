import { Link } from "react-router-dom"

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
      className="d-flex align-items-center gap-3 pe-2">
        <li><Link to={"/about"}>About Us</Link></li>
        <li><Link to={"/about"}>About Us</Link></li>
      </ul>

    </div>
  )
}

export default MyFooter
