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
    <div className="flex flex-col justify-between text-white fixed top-[24px] bottom-[20px] left-0 w-[120px] bg-[#403F3F] pt-8 pb-4 z-40">
      <ul className="flex flex-col items-start px-3 poppins-regular text-base list-none m-0">
        <li className="w-full">
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "block py-2 border-b border-[#868686] text-yellow-400"
                : "block py-2 border-b border-[#868686] hover:text-yellow-400 transition-colors"
            }
            to={"/logs"}>
            Logs
          </NavLink>
        </li>
        <li className="w-full">
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "block py-2 border-b border-[#868686] text-yellow-400"
                : "block py-2 border-b border-[#868686] hover:text-yellow-400 transition-colors"
            }
            to={"/dashboard"}>
            Dashboard
          </NavLink>
        </li>
      </ul>

      <div className="flex flex-col items-center" ref={settingsRef}>
        {showSettings && (
          <div className="fixed bottom-16 left-2 bg-zinc-800 w-40 p-3 rounded-lg flex flex-col gap-2 shadow-lg">
            <Link 
              to={"/root-causes"} 
              onClick={handleShowSettings} 
              className="text-xs flex items-center gap-2 hover:text-yellow-400 transition-colors"
            >
              <img className="h-4" src={listIconRootCauseList} alt="" />
              Root Causes
            </Link>
            <Link 
              to={"/root-causes/create"} 
              onClick={handleShowSettings} 
              className="text-xs flex items-center gap-2 hover:text-yellow-400 transition-colors"
            >
              <img className="h-3" src={addBtnIcon} alt="" />
              New Root Cause
            </Link>
          </div>
        )}
        <div className="flex w-full justify-around items-center px-3">
          <button onClick={handleShowSettings} className="hover:opacity-80 transition-opacity">
            <img className="h-6" src={settingsBtnIcon} alt="settings" />
          </button>
          <Link to={"/logs/create"} className="hover:opacity-80 transition-opacity">
            <img className="h-6" src={addBtnIcon} alt="create exception" />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Sidebar