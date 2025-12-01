import { NavLink } from "react-router-dom"

function Sidebar() {
    return (
        <div style={{
            position: "fixed",
            top: "34px",
            left: 0,
            height: "100%",
            width: "160px",
            background: "#403F3F",
            paddingTop: "40px",
            fontSize: "24px",
        }}
            className="sidebar-shadow d-flex flex-column justify-content-between text-white d-none">

            <ul
                style={{
                    listStyle: "none", fontSize: "16px"
                }}
                className="d-flex flex-column align-items-start justify-content-end px-3 poppins-regular">
                <li style={{borderBottom: "1px solid #868686", width:"100%"}}><NavLink className={({ isActive }) => isActive ? "nav-link active-link" : "nav-link"} to={"/logs"}>Logs</NavLink></li>
                <li style={{borderBottom: "1px solid #868686", width:"100%"}}><NavLink className={({ isActive }) => isActive ? "nav-link active-link" : "nav-link"} to={"/dashboard"}>Dashboard</NavLink></li>
            </ul>

            <div className="container-fluid d-flex align-items-center justify-content-between ">
                
            </div>

        </div>
    )
}

export default Sidebar