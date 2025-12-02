import { NavLink, Link } from "react-router-dom"
import addBtn from "../assets/add-btn.png"
import settingsBtn from "../assets/settings icon.png"
import { useState } from "react"

function Sidebar() {

const [showSettings, setShowSettings] = useState(false)

const handleShowSettings = () => {
    setShowSettings(!showSettings)
}

    return (
        <div
            className="sidebar-shadow pb-10 flex flex-col justify-between text-white fixed top-[20px] left-0 h-full w-[120px] bg-[#403F3F] pt-[40px] text-[24px]">

            <ul
                style={{
                    listStyle: "none", fontSize: "16px"
                }}
                className="flex flex-col items-start justify-end px-3 poppins-regular">
                <li>
                    <NavLink
                        className={({ isActive }) => isActive ? "nav-link active-link border-b border-[#868686] w-full" : "nav-link border-b border-[#868686] w-full"} to={"/logs"}>
                        Logs
                    </NavLink>
                </li>
                <li>
                    <NavLink className={({ isActive }) => isActive ? "nav-link active-link border-b border-[#868686] w-full" : "nav-link border-b border-[#868686] w-full"} to={"/dashboard"}>Dashboard</NavLink>
                </li>
            </ul>

            <div className="flex justify-between align-center px-3">
                <button onClick={handleShowSettings}><img src={settingsBtn} alt="" /></button>
                <Link to={"/logs/create"}><img src={addBtn} alt="" /></Link>
            </div>

        </div>
    )
}

export default Sidebar