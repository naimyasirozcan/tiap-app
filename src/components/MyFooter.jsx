import CompanyLogo from "../assets/nyoworks-logo.png"
import LightLogo from "../assets/tiap-nav-logo-light.png"

function MyFooter() {
  return (
    <div className="flex w-full h-[20px] bg-[#403f3f] fixed bottom-0 left-0 items-center justify-end z-40 px-3">
      <div className="flex items-center gap-2">
        <a href="https://github.com/naimozcan/tiap-server">
          <img className="h-[14px]" src={LightLogo} alt="TIAP" />
        </a>
        <a href="https://linkedin.com/in/naimozcan">
          <img className="h-[18px]" src={CompanyLogo} alt="NY Works" />
        </a>
      </div>
    </div>
  )
}

export default MyFooter