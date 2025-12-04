import { NavLink, Link } from "react-router-dom"
import addBtnIcon from "../assets/add-btn.png"
import settingsBtnIcon from "../assets/settings icon.png"
import { useState, useEffect, useRef } from "react"
import listIconRootCauseList from "../assets/rootcauses-list-icon.png"

function Sidebar() {
  const [showSettings, setShowSettings] = useState(false)
  const settingsRef = useRef(null)

  const handleShowSettings = () => {
    setShowSettings(!showSettings)
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (settingsRef.current && !settingsRef.current.contains(event.target)) {
        setShowSettings(false)
      }
    }

    if (showSettings) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [showSettings])

  return (
    <div className="sidebar-shadow pb-10 flex flex-col justify-between text-white fixed top-[20px] left-0 h-full w-[120px] bg-[#403F3F] pt-[40px] text-[24px] z-40">
      <ul style={{ listStyle: "none", fontSize: "16px" }} className="flex flex-col items-start justify-end px-3 poppins-regular">
        <li>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "nav-link active-link border-b border-[#868686] w-full"
                : "nav-link border-b border-[#868686] w-full"
            }
            to={"/logs"}>
            Logs
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "nav-link active-link border-b border-[#868686] w-full"
                : "nav-link border-b border-[#868686] w-full"
            }
            to={"/dashboard"}>Dashboard</NavLink>
        </li>
      </ul>
      <div className="flex flex-col  items-center" ref={settingsRef}>
        {showSettings && (
          <div className="fixed bottom-14 left-8 bg-zinc-800 h-40 w-40 mb-3 p-3 rounded-lg flex flex-col gap-1">
            <Link to={"/root-causes"} onClick={handleShowSettings} className="text-[12px] flex items-center gap-1"> <img className="inline h-4" src={listIconRootCauseList} alt="" /> Root Causes</Link>
            <Link to={"/root-causes/create"} onClick={handleShowSettings} className="text-[12px] flex items-center gap-1"> <img className="inline h-3 pl-1" src={addBtnIcon} alt="" /> New Root Cause </Link>
          </div>
        )}
        <div className="flex w-full justify-between align-center px-3">
          <button onClick={handleShowSettings}>
            <img src={settingsBtnIcon} alt="" />
          </button>
          <Link to={"/logs/create"}>
            <img src={addBtnIcon} alt="create a new exception" />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Sidebar