import { Link } from "react-router-dom"

function NotFound() {
  return (
     <div className="min-h-screen w-full flex items-center justify-center">
      <div className="w-full lg:px-[400px]">
        <h1 className="text-[50px] text-black mb-4"> 404, not found.</h1>
        <h5 className="text-[25px] text-black font-bold">We can’t find what you looking for.  </h5>
        <p className="text-[px] text-zinc-900 font-normal mb-4">Please check your address bar to be sure you’re trying to access an existing page.</p>
        <span className="text-[11px]">You may want to move:</span>
        <div className="flex gap-4 items-center">
          <button id="sign-up-btn" className="rounded-lg h-9 w-[120px]" ><Link to={"/logs"} className="no-underline">Logs</Link></button>
          <button id="sign-up-btn" className="rounded-lg h-9 w-[120px]" ><Link to={"/dashboard"} className="no-underline">Dashboard</Link></button>
        </div>


      </div>
    </div>
  )
}

export default NotFound
 