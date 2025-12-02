import { Link } from "react-router-dom"


function Unauthorized() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center">
      <div className="w-full lg:px-[400px]">
        <h1 className="text-[50px] text-black mb-4"> 401, unauthorized.</h1>
        <h5 className="text-[25px] text-black font-bold"> You have no permission to see this page.</h5>
        <p className="text-[px] text-zinc-900 font-normal mb-4">Please be sure you are logged in. If you are logged in and can’t see the page, please talk with your supervisor to get access.</p>
        <span className="text-[11px]">You may want to move:</span>
        <div className="flex gap-4 items-center">
          <button id="sign-up-btn" className="bottom-shadow rounded-lg h-9 w-[120px]" ><Link to={"/signup"} className="no-underline">Sign Up</Link></button>
          <button id="sign-up-btn" className="bottom-shadow rounded-lg h-9 w-[120px]" ><Link to={"/login"} className="no-underline">Login</Link></button>
        </div>


      </div>
    </div>
  )
}

export default Unauthorized
